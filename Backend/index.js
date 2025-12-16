const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: 'http://164.52.213.200:9200',  
  tls: {
    rejectUnauthorized: false 
  }
});


const app = express();
const port = 3013;

app.use(cors({
  origin: '*' ,
    credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type', 'token']
 }));
app.use(express.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
      // Create unique filename with timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
      // Check if file is an image
      if (file.mimetype.startsWith('image/')) {
          cb(null, true);
      } else {
          cb(new Error('Only image files are allowed!'), false);
      }
  }
});

const driver = neo4j.driver(
  'bolt://164.52.213.200:7687',
  neo4j.auth.basic('neo4j', 'neo4j2025')
);


const analyzeImageWithPython = (imagePath) => {
  return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['image_caption.py', imagePath]);
      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
          output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
          errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
          if (code !== 0) {
              reject(new Error(`Python script failed: ${errorOutput}`));
          } else {
              resolve(output);
          }
      });

      pythonProcess.on('error', (error) => {
          reject(new Error(`Failed to start Python process: ${error.message}`));
      });
  });
};



// Function to parse Python output and extract only corrected brand details
const parseAnalysisOutput = (pythonOutput) => {
  const lines = pythonOutput.split('\n');
  let brands = [];
  
  let isCorrectedBrandSection = false;
  
  for (let line of lines) {
      line = line.trim();
      
      // Look for the corrected brand section
      if (line.includes('🏷️ Corrected Brand (after process):')) {
          isCorrectedBrandSection = true;
          continue;
      }
      
      // Reset flag when we encounter a new section
      if (line.startsWith('🧾') || line.startsWith('📷') || line.startsWith('🛒')) {
          isCorrectedBrandSection = false;
      }
      
      // Extract brand from corrected brand section
      if (isCorrectedBrandSection && line.startsWith('Brand:')) {
          const brandName = line.replace('Brand:', '').trim();
          if (brandName && brandName !== 'Not detected' && brandName !== 'Error' && !brands.includes(brandName)) {
              brands.push(brandName);
          }
          isCorrectedBrandSection = false; // Stop after finding the corrected brand
      }
  }
  
  return { brands };
};

const searchProduct = async (session, name) => {
  console.log("name", name)
  const result = await session.run(
    `
      MATCH (p:Product)
      WHERE toLower(p.name) CONTAINS toLower($name)
      OPTIONAL MATCH (p)-[:BRANDED_AS]->(b:Brand)
      OPTIONAL MATCH (b)-[:OWNED_BY]->(c:Company)
      OPTIONAL MATCH (p)-[:ENDORSED_BY]->(e:Endorser)
      OPTIONAL MATCH (c)-[:HAS_DIRECTOR]->(d:Director)
      OPTIONAL MATCH (c)-[:HAS_SHAREHOLDER]->(s:Shareholder)
      RETURN p, b, c, e, d, s
      `,
    { name }
  );
  console.log("result", result)
  if (result.records.length === 0) return [];

  const productData = {};

  result.records.forEach((record) => {
    const product = record.get('p');
    const brand = record.get('b');
    const company = record.get('c');
    const endorser = record.get('e');
    const director = record.get('d');
    const shareholder = record.get('s');

    if (!productData[product.properties.name]) {
      productData[product.properties.name] = {
        name: product.properties.name,
        brand: null,
        company: null,
        endorsers: [],
        directors: [],
        shareholders: []
      };
    }

    if (brand && !productData[product.properties.name].brand) {
      productData[product.properties.name].brand = brand.properties.name;
    }

    if (company && !productData[product.properties.name].company) {
      productData[product.properties.name].company = company.properties.name;
    }

    if (endorser && !productData[product.properties.name].endorsers.includes(endorser.properties.name)) {
      productData[product.properties.name].endorsers.push(endorser.properties.name);
    }

    if (director && !productData[product.properties.name].directors.includes(director.properties.name)) {
      productData[product.properties.name].directors.push(director.properties.name);
    }

    if (shareholder && !productData[product.properties.name].shareholders.includes(shareholder.properties.name)) {
      productData[product.properties.name].shareholders.push(shareholder.properties.name);
    }
  });

  return Object.values(productData);
};


const fuzzySearchProductNames = async (name) => {
  const result = await esClient.search({
    index: 'products',
    body: {
      query: {
        match: {
          name: {
            query: name,
            fuzziness: 'AUTO'
          }
        }
      }
    }
    
  });

  const matchedNames = result.hits.hits.map(hit => hit._source.name);
  return matchedNames;
};


const searchBrand = async (session, name) => {
  const result = await session.run(
    `
      MATCH (b:Brand)
     WHERE toLower(b.name) CONTAINS toLower($name)
      OPTIONAL MATCH (b)-[:OWNED_BY]->(c:Company)
      OPTIONAL MATCH (b)<-[:BRANDED_AS]-(p:Product)
      OPTIONAL MATCH (p)-[:ENDORSED_BY]->(e:Endorser)
      OPTIONAL MATCH (c)-[:HAS_DIRECTOR]->(d:Director)
      OPTIONAL MATCH (c)-[:HAS_SHAREHOLDER]->(s:Shareholder)
      RETURN b, c, collect(DISTINCT p) AS products, collect(DISTINCT e) AS endorsers,
             collect(DISTINCT d) AS directors, collect(DISTINCT s) AS shareholders
      `,
    { name }
  );

  if (result.records.length === 0) return null;

  const record = result.records[0];
  const brand = record.get('b').properties;
  const company = record.get('c') ? record.get('c').properties : null;
  const products = record.get('products').map(p => p.properties);
  const endorsers = record.get('endorsers').filter(e => e).map(e => e.properties);
  const directors = record.get('directors').filter(d => d).map(d => d.properties);
  const shareholders = record.get('shareholders').filter(s => s).map(s => s.properties);

  return {
    brand,
    company,
    products,
    endorsers,
    directors,
    shareholders
  };
};

const searchBrandFuzzy = async (name) => {
  const result = await esClient.search({
    index: 'products',
    body: {
      query: {
        fuzzy: {
          brand: {
            value: name,
            fuzziness: "AUTO"
          }
        }
      }
    }
  });

  if (result.hits.total.value === 0) return [];

  // Extract unique brand names from results
  const brands = new Set();
  result.hits.hits.forEach(hit => {
    if (hit._source.brand) brands.add(hit._source.brand);
  });

  return Array.from(brands);
}


const searchCompany = async (session, name) => {
  const result = await session.run(
    `
    MATCH (c:Company)
    WHERE toLower(c.name) CONTAINS toLower($name)
    OPTIONAL MATCH (b:Brand)-[:OWNED_BY]->(c)
    OPTIONAL MATCH (c)-[:HAS_DIRECTOR]->(d:Director)
    OPTIONAL MATCH (c)-[:HAS_SHAREHOLDER]->(s:Shareholder)
    RETURN c, collect(DISTINCT b) AS brands, collect(DISTINCT d) AS directors, collect(DISTINCT s) AS shareholders
    `,
    { name }
  );

  if (result.records.length === 0) return null;

  const record = result.records[0];
  const company = record.get('c').properties;
  const brands = record.get('brands').map(b => b.properties);
  const directors = record.get('directors').map(d => d.properties);
  const shareholders = record.get('shareholders').map(s => s.properties);

  return {
    company,
    brands,
    directors,
    shareholders
  };
};

const fuzzySearchCompanyNames = async (name) => {
  const result = await esClient.search({
    index: 'products',
    body: {
      query: {
        fuzzy: {
          company: {
            value: name,
            fuzziness: "AUTO"
          }
        }
      }
    }
  });

  if (result.hits.total.value === 0) return [];

  // Extract unique company names from results
  const companies = new Set();
  result.hits.hits.forEach(hit => {
    if (hit._source.company) companies.add(hit._source.company);
  });

  return Array.from(companies);
};

const searchEndorser = async (session, name) => {
  const result = await session.run(
    `
      MATCH (e:Endorser)
      WHERE toLower(e.name) CONTAINS toLower($name)
      OPTIONAL MATCH (p:Product)-[:ENDORSED_BY]->(e)
      OPTIONAL MATCH (p)-[:BRANDED_AS]->(b:Brand)
      WITH e, p, b
      ORDER BY p.name
      RETURN e, 
             collect(DISTINCT {
               product: p,
               brand: b
             }) AS productsWithBrands
      `,
    { name }
  );

  if (result.records.length === 0) return null;

  const record = result.records[0];
  const endorser = record.get('e').properties;

  const products = record.get('productsWithBrands')
    .filter(pb => pb.product) // Ensure product exists
    .map(pb => ({
      ...pb.product.properties,
      brand: pb.brand ? pb.brand.properties.name : null
    }));

  return {
    endorser,
    products
  };
};


const fuzzySearchEndorsers = async (endorserName) => {
  try {
    const response = await esClient.search({
      index: 'products',
      body: {
        size: 100, // Get actual documents
        query: {
          bool: {
            should: [
              {
                match: {
                  endorser: {
                    query: endorserName,
                    fuzziness: 'AUTO'
                  }
                }
              },
              {
                wildcard: {
                  endorser: `*${endorserName.toLowerCase()}*`
                }
              }
            ]
          }
        },
        _source: ['endorser'] // Only return endorser field
      }
    });

    console.log('Simple search response:', JSON.stringify(response, null, 2));

    const responseBody = response.body || response;
    const hits = responseBody.hits && responseBody.hits.hits ? responseBody.hits.hits : [];
    
    // Extract unique endorser names
    const endorsersSet = new Set();
    hits.forEach(hit => {
      const endorsers = hit._source.endorser || [];
      endorsers.forEach(endorser => {
        if (endorser.toLowerCase().includes(endorserName.toLowerCase())) {
          endorsersSet.add(endorser);
        }
      });
    });

    return Array.from(endorsersSet);
    
  } catch (error) {
    console.error('Simple fuzzy search error:', error);
    throw new Error(`Simple fuzzy search failed: ${error.message}`);
  }
};

const searchDirector = async (session, name) => {
  const result = await session.run(
    `
    MATCH (d:Director)
      WHERE toLower(d.name) CONTAINS toLower($name)
    OPTIONAL MATCH (c:Company)-[:HAS_DIRECTOR]->(d)
    RETURN d, collect(c) AS companies
    `,
    { name }
  );

  if (result.records.length === 0) return null;

  const record = result.records[0];
  console.log("record", record)
  const director = record.get('d').properties;
  const companies = record.get('companies').map(c => c.properties);

  return {
    director,
    companies
  };
};



const fuzzySearchDirectors = async (name) => {
  const result = await esClient.search({
    index: 'products',
    body: {
      query: {
        bool: {
          should: [
            // Exact match (highest priority)
            {
              match: {
                director: {
                  query: name,
                  boost: 3
                }
              }
            },
            // Fuzzy match
            {
              fuzzy: {
                director: {
                  value: name,
                  fuzziness: "AUTO",
                  max_expansions: 50,
                  prefix_length: 0
                }
              }
            },
            // Wildcard search for partial matches
            {
              wildcard: {
                director: {
                  value: `*${name.toLowerCase()}*`,
                  boost: 2
                }
              }
            },
            // Match phrase prefix for "starts with" behavior
            {
              match_phrase_prefix: {
                director: {
                  query: name,
                }
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    }
  });

  console.log("Elasticsearch result:", JSON.stringify(result, null, 2));
  
  if (result.hits.total.value === 0) return [];

  // Extract unique director names from results
  const directors = new Set();
  result.hits.hits.forEach(hit => {
    if (hit._source.director) {
      directors.add(hit._source.director);
    }
  });

  console.log("Matched directors from ES:", Array.from(directors));
  return Array.from(directors);
};



const searchShareholder = async (session, name) => {
  const result = await session.run(
    `
    MATCH (s:Shareholder)
      WHERE toLower(s.name) CONTAINS toLower($name)
    OPTIONAL MATCH (c:Company)-[:HAS_SHAREHOLDER]->(s)
    RETURN s, collect(c) AS companies
    `,
    { name }
  );

  if (result.records.length === 0) return null;

  const record = result.records[0];
  const shareholder = record.get('s').properties;
  const companies = record.get('companies').map(c => c.properties);

  return {
    shareholder,
    companies
  };
};



const fuzzySearchShareholders = async (shareholderName) => {

    const response = await esClient.search({
      index: 'products',
      body: {
        size: 100, // Get actual documents
        query: {
          bool: {
            should: [
              {
                match: {
                  shareholder: {
                    query: shareholderName,
                    fuzziness: 'AUTO',
                    operator: 'or'
                  }
                }
              },
              {
                wildcard: {
                  "shareholder.keyword": `*${shareholderName.toLowerCase()}*`
                }
              },
              {
                wildcard: {
                  shareholder: `*${shareholderName.toLowerCase()}*`
                }
              },
              {
                term: {
                  shareholder: shareholderName.toLowerCase()
                }
              }
            ],
            minimum_should_match: 1
          }
        },
        _source: ['shareholder'] // Only return shareholder field
      }
    });

    console.log('Shareholder search response:', JSON.stringify(response, null, 2));

    const responseBody = response.body || response;
    const hits = responseBody.hits && responseBody.hits.hits ? responseBody.hits.hits : [];
    
    // Extract unique shareholder names
    const shareholdersSet = new Set();
    hits.forEach(hit => {
      const shareholders = hit._source.shareholder || [];
      shareholders.forEach(shareholder => {
        if (shareholder.toLowerCase().includes(shareholderName.toLowerCase())) {
          shareholdersSet.add(shareholder);
        }
      });
    });
  console.log(shareholdersSet)
    return Array.from(shareholdersSet);
};


app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'No image file provided' });
      }

      const imagePath = req.file.path;
      console.log(`Analyzing image: ${imagePath}`);

      // Run Python analysis
      const pythonOutput = await analyzeImageWithPython(imagePath);
      console.log('Python output:', pythonOutput);

      // Parse the output to extract only corrected brands
      const { brands } = parseAnalysisOutput(pythonOutput);

      // Clean up uploaded file
      fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting file:', err);
      });

      res.json({
          success: true,
          correctedBrands: brands,
          message: brands.length > 0 ? 'Brand detected successfully' : 'No brands detected',
          rawOutput: pythonOutput // Optional: include raw output for debugging
      });

  } catch (error) {
      console.error('Error analyzing image:', error);
      
      // Clean up file if it exists
      if (req.file && req.file.path) {
          fs.unlink(req.file.path, (err) => {
              if (err) console.error('Error deleting file:', err);
          });
      }

      res.status(500).json({
          error: 'Failed to analyze image',
          message: error.message
      });
  }
});

app.get('/api/search/product/:name', async (req, res) => {
  let session;
  try {
      session = driver.session();
    // session = driver.session({ database: 'products' });

  } catch (error) {
    session = driver.session();
  }

  const name = req.params.name;

  try {
    // 🔍 Step 1: Fuzzy search in Elasticsearch
    console.log("name", name)
    const matchedNames = await fuzzySearchProductNames(name);
    console.log("matchedNames", matchedNames)

    if (matchedNames.length === 0) {
      return res.status(404).json({ message: 'No matching products found' });
    }

    // 🧠 Step 2: Search in Neo4j using matched product names
    const data = [];
    for (const productName of matchedNames) {
      const result = await searchProduct(session, productName);
      data.push(...result);
    }
    console.log("data", data);
    console.log("data", JSON.stringify(data, null, 2));

    if (data.length === 0) {
      return res.status(404).json({ message: 'No product details found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error during fuzzy product search:', error);
    res.status(500).json({ message: 'Search failed', error: error.message });
  } finally {
    await session.close();
  }
});




app.get('/api/search/brand/:name', async (req, res) => {
  // const session = driver.session({ database: 'products' });
  const session=driver.session();


  const name = req.params.name;

  try {
    // Step 1: Fuzzy search brands in Elasticsearch
    const fuzzyBrands = await searchBrandFuzzy(name);
    console.log("fuzzyBrands", fuzzyBrands)
    if (fuzzyBrands.length === 0) {
      return res.status(404).json({ message: 'Brand not found ' });
    }

    // Step 2: Query Neo4j for each matched brand and collect results
    const results = [];

    for (const brandName of fuzzyBrands) {
      const data = await searchBrand(session, brandName);
      if (data) results.push(data);
    }
    console.log("results", results)
    if (results.length === 0) return res.status(404).json({ message: 'Brand not found ' });

    res.json(results);
  } catch (error) {
    console.error('Error searching brand:', error);
    res.status(500).json({ message: 'Error searching brand', error: error.message });
  } finally {
    await session.close();
  }
});



app.get('/api/search/company/:name', async (req, res) => {
  let session;
  try {
      session = driver.session();
    // session = driver.session({ database: 'products' });

  } catch (error) {
    session = driver.session();
  }

  const name = req.params.name;

  try {
    // 🔍 Step 1: Fuzzy search in Elasticsearch
    const matchedNames = await fuzzySearchCompanyNames(name);
    console.log("matchedNames", matchedNames)

    if (matchedNames.length === 0) {
      return res.status(404).json({ message: 'No matching companies found' });
    }

    // 🧠 Step 2: Search in Neo4j using matched product names
    const data = [];
    for (const productName of matchedNames) {
      const result = await searchCompany(session, productName);
      // data.push(...result);
      if (result) {
        data.push(result); // result is a single object, not an array
      }
    }
    console.log("data", data);
    if (data.length === 0) {
      return res.status(404).json({ message: 'No  details found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error during fuzzy product search:', error);
    res.status(500).json({ message: 'Search failed', error: error.message });
  } finally {
    await session.close();
  }
});




app.get('/api/search/endorser/:name', async (req, res) => {
  const name = req.params.name;
  let session;

  try {
    session = driver.session();

    // session = driver.session({ database: 'products' });
  } catch (err) {
    session = driver.session(); // fallback
  }

  try {
    // Step 1: Fuzzy search using Elasticsearch
    const matchedEndorsers = await fuzzySearchEndorsers(name);
    console.log("matchedEndorsers", matchedEndorsers)
    if (matchedEndorsers.length === 0) {
      return res.status(404).json({ message: 'No matching endorsers found' });
    }

    // Step 2: Get details from Neo4j
    const data = [];
    for (const endorserName of matchedEndorsers) {
      const details = await searchEndorser(session, endorserName);
      if (details) data.push(details);
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'No endorser details found ' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error during endorser search:', error);
    res.status(500).json({ message: 'Search failed', error: error.message });
  } finally {
    await session.close();
  }
});


app.get('/api/search/director/:name', async (req, res) => {
  // const session = driver.session({ database: 'products' });
  const session=driver.session();

  const name = req.params.name;
  console.log("name", name);
  try {
    // 1. Fuzzy search directors in ES
    const matchedDirectors = await fuzzySearchDirectors(name);
    if (matchedDirectors.length === 0) {
      return res.status(404).json({ message: 'No directors found' });
    }

    // 2. Query Neo4j for each matched director
    const results = [];
    for (const directorName of matchedDirectors) {
      const directorData = await searchDirector(session, directorName);
      if (directorData) results.push(directorData);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No director details found' });
    }

    res.json(results);
  } catch (error) {
    console.error('Error during director search:', error);
    res.status(500).json({ message: 'Director search failed', error: error.message });
  } finally {
    await session.close();
  }
});





app.get('/api/search/shareholder/:name', async (req, res) => {
  const name = req.params.name;
  let session;

  try {
    session = driver.session();

    // session = driver.session({ database: 'products' });
  } catch (err) {
    session = driver.session(); // fallback
  }

  try {
    // Step 1: Fuzzy search in Elasticsearch
    const matchedShareholders = await fuzzySearchShareholders(name);
    if (matchedShareholders.length === 0) {
      return res.status(404).json({ message: 'No matching shareholders found' });
    }
     console.log("matchedShareholders", matchedShareholders)
    // Step 2: Get details from Neo4j
    const data = [];
    for (const shareholderName of matchedShareholders) {
      const details = await searchShareholder(session, shareholderName);
      if (details) data.push(details);
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'No shareholder details found in Neo4j' });
    }

    res.json(data);
    console.log("data", data)
  } catch (error) {
    console.error('Error during shareholder search:', error);
    res.status(500).json({ message: 'Search failed', error: error.message });
  } finally {
    await session.close();
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


