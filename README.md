# BrandFinder 

A comprehensive brand discovery and relationship mapping system that combines  **graph database**, and **fuzzy search** capabilities to identify products, brands, companies, endorsers, directors, and shareholders from product images.

##  Features

- ** Image Recognition**: Upload product images to automatically detect brands using OCR and AI
- ** Intelligent Search**: Fuzzy search across products, brands, companies, endorsers, directors, and shareholders
- ** Relationship Mapping**: Visualize complex relationships between entities using Neo4j graph database
- ** Fast Search**: Elasticsearch integration for lightning-fast fuzzy matching
- ** Interactive UI**: Beautiful React-based frontend with graph visualizations
- ** AI-Powered**: Uses Google Gemini AI for brand detection and correction

##  Architecture

### Tech Stack

**Frontend:**
- React 19.1.0
- D3.js for data visualization
- React Force Graph for 2D/3D graph rendering
- Framer Motion for animations
- Axios for API calls
- Lucide React for icons

**Backend:**
- Node.js with Express 5.1.0
- Neo4j (Graph Database) for relationship mapping
- Elasticsearch 8.10.1 for fuzzy search
- Python with EasyOCR for text extraction
- Google Gemini AI for brand recognition

## 📁 Project Structure

```
BrandFinder/
├── Backend/
│   ├── index.js              # Express server with API endpoints
│   ├── image_caption.py      # OCR and AI brand detection
│   ├── package.json          # Backend dependencies
│   └── uploads/              # Temporary image storage
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main application component
│   │   ├── LandingPage.js   # Landing page component
│   │   ├── AppWrapper.js    # App wrapper component
│   │   └── index.js         # React entry point
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
└── README.md
```

##  Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- Neo4j Database (running on `bolt://localhost:7687`)
- Elasticsearch (running on `https://localhost:9200`)
- Google Gemini API Key

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Scaleorange-Technologies/BrandFinder.git
cd BrandFinder
```

#### 2. Backend Setup

```bash
cd Backend
npm install
```

**Install Python dependencies:**

```bash
pip install easyocr google-generativeai
```

**Configure environment variables:**

Update the following in `Backend/index.js`:
- Neo4j credentials (default: `neo4j/password`)
- Elasticsearch credentials

Update `Backend/image_caption.py`:
- Set your Google Gemini API key

#### 3. Frontend Setup

```bash
cd frontend
npm install
```

### Database Setup

#### Neo4j Setup

Run the following Cypher queries in Neo4j to create the example data:

```cypher
// Create Products
CREATE (:Product {name: "Pepsi"});
CREATE (:Product {name: "Mountain Dew"});
CREATE (:Product {name: "Lay's"});
CREATE (:Product {name: "7Up"});
CREATE (:Product {name: "Doritos"});

// Create Brands
CREATE (:Brand {name: "Pepsi"});
CREATE (:Brand {name: "Lay's"});
CREATE (:Brand {name: "7Up"});
CREATE (:Brand {name: "Doritos"});

// Create Companies
CREATE (:Company {name: "PepsiCo"});
CREATE (:Company {name: "Frito-Lay"});
CREATE (:Company {name: "BlackRock"});

// Create Endorsers
CREATE (:Endorser {name: "Virat Kohli"});
CREATE (:Endorser {name: "MS Dhoni"});
CREATE (:Endorser {name: "Ranveer Singh"});

// Create Directors
CREATE (:Director {name: "Ramon Laguarta"});
CREATE (:Director {name: "Hugh Johnston"});

// Create Shareholders
CREATE (:Shareholder {name: "BlackRock"});
CREATE (:Shareholder {name: "Vanguard Group"});

// Create Relationships - Product → Brand
MATCH (p:Product {name: "Pepsi"}), (b:Brand {name: "Pepsi"}) CREATE (p)-[:BRANDED_AS]->(b);
MATCH (p:Product {name: "Mountain Dew"}), (b:Brand {name: "Pepsi"}) CREATE (p)-[:BRANDED_AS]->(b);
MATCH (p:Product {name: "Lay's"}), (b:Brand {name: "Lay's"}) CREATE (p)-[:BRANDED_AS]->(b);
MATCH (p:Product {name: "7Up"}), (b:Brand {name: "7Up"}) CREATE (p)-[:BRANDED_AS]->(b);
MATCH (p:Product {name: "Doritos"}), (b:Brand {name: "Doritos"}) CREATE (p)-[:BRANDED_AS]->(b);

// Brand → Company
MATCH (b:Brand {name: "Pepsi"}), (c:Company {name: "PepsiCo"}) CREATE (b)-[:OWNED_BY]->(c);
MATCH (b:Brand {name: "7Up"}), (c:Company {name: "PepsiCo"}) CREATE (b)-[:OWNED_BY]->(c);
MATCH (b:Brand {name: "Lay's"}), (c:Company {name: "Frito-Lay"}) CREATE (b)-[:OWNED_BY]->(c);
MATCH (b:Brand {name: "Doritos"}), (c:Company {name: "Frito-Lay"}) CREATE (b)-[:OWNED_BY]->(c);

// Product → Endorsers
MATCH (p:Product {name: "Pepsi"}), (e:Endorser {name: "Virat Kohli"}) CREATE (p)-[:ENDORSED_BY]->(e);
MATCH (p:Product {name: "Pepsi"}), (e:Endorser {name: "MS Dhoni"}) CREATE (p)-[:ENDORSED_BY]->(e);
MATCH (p:Product {name: "Mountain Dew"}), (e:Endorser {name: "Ranveer Singh"}) CREATE (p)-[:ENDORSED_BY]->(e);
MATCH (p:Product {name: "Lay's"}), (e:Endorser {name: "Virat Kohli"}) CREATE (p)-[:ENDORSED_BY]->(e);

// Company → Director
MATCH (c:Company {name: "PepsiCo"}), (d:Director {name: "Ramon Laguarta"}) CREATE (c)-[:HAS_DIRECTOR]->(d);
MATCH (c:Company {name: "Frito-Lay"}), (d:Director {name: "Hugh Johnston"}) CREATE (c)-[:HAS_DIRECTOR]->(d);

// Company → Shareholders
MATCH (c:Company {name: "PepsiCo"}), (s:Shareholder {name: "BlackRock"}) CREATE (c)-[:HAS_SHAREHOLDER]->(s);
MATCH (c:Company {name: "PepsiCo"}), (s:Shareholder {name: "Vanguard Group"}) CREATE (c)-[:HAS_SHAREHOLDER]->(s);
MATCH (c:Company {name: "Frito-Lay"}), (s:Shareholder {name: "BlackRock"}) CREATE (c)-[:HAS_SHAREHOLDER]->(s);
```

#### Elasticsearch Setup

Create the products index and add example data:

```bash
# Create index with mappings
curl -u elastic:'9Kap8pGV+8vJI+V1LJ4t' --insecure -X PUT "https://localhost:9200/products" -H 'Content-Type: application/json' -d '{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "brand": { "type": "text" },
      "company": { "type": "text" },
      "endorser": { "type": "text" },
      "director": { "type": "text" },
      "shareholder": { "type": "text" }
    }
  }
}'

# Add Pepsi
curl -u elastic:'9Kap8pGV+8vJI+V1LJ4t' --insecure -X POST "https://localhost:9200/products/_doc/1" -H 'Content-Type: application/json' -d '{
  "name": "Pepsi",
  "brand": "Pepsi",
  "company": "PepsiCo",
  "endorser": ["Virat Kohli","MS Dhoni"],
  "director": ["Ramon Laguarta"],
  "shareholder": ["BlackRock","Vanguard Group"]
}'

# Add Mountain Dew
curl -u elastic:'9Kap8pGV+8vJI+V1LJ4t' --insecure -X POST "https://localhost:9200/products/_doc/2" -H 'Content-Type: application/json' -d '{
  "name": "Mountain Dew",
  "brand": "Pepsi",
  "company": "PepsiCo",
  "endorser": ["Ranveer Singh"],
  "director": ["Ramon Laguarta"],
  "shareholder": ["BlackRock","Vanguard Group"]
}'

# Add Doritos
curl -u elastic:'9Kap8pGV+8vJI+V1LJ4t' --insecure -X POST "https://localhost:9200/products/_doc/3" -H 'Content-Type: application/json' -d '{
  "name": "Doritos",
  "brand": "Doritos",
  "company": "Frito-Lay",
  "endorser": [],
  "director": ["Hugh Johnston"],
  "shareholder": ["BlackRock"]
}'

# Add 7Up
curl -u elastic:'9Kap8pGV+8vJI+V1LJ4t' --insecure -X POST "https://localhost:9200/products/_doc/4" -H 'Content-Type: application/json' -d '{
  "name": "7Up",
  "brand": "7Up",
  "company": "PepsiCo",
  "endorser": [],
  "director": ["Ramon Laguarta"],
  "shareholder": ["BlackRock","Vanguard Group"]
}'

# Add Lay's
curl -u elastic:'9Kap8pGV+8vJI+V1LJ4t' --insecure -X POST "https://localhost:9200/products/_doc/5" -H 'Content-Type: application/json' -d '{
  "name": "Lay'\''s",
  "brand": "Lay'\''s",
  "company": "Frito-Lay",
  "endorser": ["Virat Kohli"],
  "director": ["Hugh Johnston"],
  "shareholder": ["BlackRock"]
}'
```

**Note:** Replace the Elasticsearch password (`9Kap8pGV+8vJI+V1LJ4t`) with your actual password.

##  Running the Application

### Start Backend Server

```bash
cd Backend
npm start
```

The backend server will run on `http://localhost:7000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

##  API Endpoints

### Image Analysis
- `POST /api/analyze-image` - Upload and analyze product image

### Search Endpoints
- `GET /api/search/product/:name` - Search for products
- `GET /api/search/brand/:name` - Search for brands
- `GET /api/search/company/:name` - Search for companies
- `GET /api/search/endorser/:name` - Search for endorsers
- `GET /api/search/director/:name` - Search for directors
- `GET /api/search/shareholder/:name` - Search for shareholders

All search endpoints support fuzzy matching for typo-tolerant searches.

##  Configuration

### Backend Configuration

**Neo4j Connection** (`Backend/index.js`):
```javascript
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'password')
);
```

**Elasticsearch Connection** (`Backend/index.js`):
```javascript
const esClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'YOUR_PASSWORD'
  },
  tls: {
    rejectUnauthorized: false
  }
});
```

**Google Gemini API** (`Backend/image_caption.py`):
```python
GEMINI_API_KEY = "YOUR_API_KEY"
```

### Frontend Configuration

Update the API base URL in `frontend/src/App.js` if needed:
```javascript
const API_BASE_URL = 'http://localhost:7000';
```

##  Features in Detail

### Image Recognition Pipeline

1. **OCR Extraction**: Uses EasyOCR to extract text from product images
2. **Product Classification**: Gemini AI classifies products into grocery categories
3. **Brand Detection**: AI identifies and corrects brand names
4. **Database Lookup**: Searches Neo4j and Elasticsearch for related information

### Search Capabilities

- **Fuzzy Matching**: Handles typos and variations in search queries
- **Multi-entity Search**: Search across products, brands, companies, and people
- **Relationship Discovery**: Automatically discovers connections between entities
- **Graph Visualization**: Visual representation of entity relationships






