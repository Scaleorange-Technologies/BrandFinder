// // server.js (Express.js backend)
// const express = require('express');
// const neo4j = require('neo4j-driver');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// // Enable CORS for frontend requests
// app.use(cors());
// app.use(express.json());

// // Initialize Neo4j connection
// const driver = neo4j.driver(
//   'bolt://localhost:7687', 
//   neo4j.auth.basic('neo4j', '12345678') // Replace with your Neo4j credentials
// );

// // Search endpoint for products
// app.get('/api/search/product/:name', async (req, res) => {
//   const session = driver.session({ database: 'products' });
//   const productName = req.params.name;
  
//   try {
//     // Query to find the product and all its related data
//     const result = await session.run(`
//       MATCH (p:Product)
//       WHERE p.name CONTAINS $productName
//       OPTIONAL MATCH (p)-[:BRANDED_AS]->(b:Brand)
//       OPTIONAL MATCH (b)-[:OWNED_BY]->(c:Company)
//       OPTIONAL MATCH (p)-[:ENDORSED_BY]->(e:Endorser)
//       OPTIONAL MATCH (c)-[:HAS_DIRECTOR]->(d:Director)
//       OPTIONAL MATCH (c)-[:HAS_SHAREHOLDER]->(s:Shareholder)
//       RETURN p, b, c, e, d, s
//     `, { productName });

//     if (result.records.length === 0) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Process the results into a structured format
//     const productData = {};
    
//     result.records.forEach(record => {
//       const product = record.get('p');
//       const brand = record.get('b');
//       const company = record.get('c');
//       const endorser = record.get('e');
//       const director = record.get('d');
//       const shareholder = record.get('s');
      
//       // Initialize the product data if not already done
//       if (!productData[product.properties.name]) {
//         productData[product.properties.name] = {
//           name: product.properties.name,
//           brand: null,
//           company: null,
//           endorsers: [],
//           directors: [],
//           shareholders: []
//         };
//       }

//       // Add brand if available
//       if (brand && !productData[product.properties.name].brand) {
//         productData[product.properties.name].brand = brand.properties.name;
//       }

//       // Add company if available
//       if (company && !productData[product.properties.name].company) {
//         productData[product.properties.name].company = company.properties.name;
//       }

//       // Add endorser if available and not already added
//       if (endorser && !productData[product.properties.name].endorsers.includes(endorser.properties.name)) {
//         productData[product.properties.name].endorsers.push(endorser.properties.name);
//       }

//       // Add director if available and not already added
//       if (director && !productData[product.properties.name].directors.includes(director.properties.name)) {
//         productData[product.properties.name].directors.push(director.properties.name);
//       }

//       // Add shareholder if available and not already added
//       if (shareholder && !productData[product.properties.name].shareholders.includes(shareholder.properties.name)) {
//         productData[product.properties.name].shareholders.push(shareholder.properties.name);
//       }
//     });

//     res.json(Object.values(productData));
//   } catch (error) {
//     console.error('Error searching for product:', error);
//     res.status(500).json({ message: 'Error searching for product', error: error.message });
//   } finally {
//     await session.close();
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Backend server running on port ${port}`);
// });














// const express = require('express');
// const neo4j = require('neo4j-driver');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// // Enable CORS for frontend requests
// app.use(cors());
// app.use(express.json());

// // Initialize Neo4j connection
// const driver = neo4j.driver(
//   'bolt://localhost:7687', 
//   neo4j.auth.basic('neo4j', '12345678') // Replace with your Neo4j credentials
// );

// // Generic search function for any entity type
// const searchEntity = async (session, entityType, searchTerm) => {
//     console.log(`Searching for ${entityType} with term:${searchTerm}`);
//   try {
//     const result = await session.run(`
//       MATCH (e:${entityType})
//       WHERE e.name CONTAINS $searchTerm
      
//       // Find connected products
//       OPTIONAL MATCH path = (p:Product)-[*1..2]-(e)
//       WITH e, p, relationships(path) as rels
      
//       // Get all related data for each product
//       WITH e, collect(DISTINCT p) as products
      
//       UNWIND products as product
//       OPTIONAL MATCH (product)-[:BRANDED_AS]->(b:Brand)
//       OPTIONAL MATCH (b)-[:OWNED_BY]->(c:Company)
//       OPTIONAL MATCH (product)-[:ENDORSED_BY]->(endorser:Endorser)
//       OPTIONAL MATCH (c)-[:HAS_DIRECTOR]->(d:Director)
//       OPTIONAL MATCH (c)-[:HAS_SHAREHOLDER]->(s:Shareholder)
      
//       // Return entity and all product-related data
//       RETURN e, product, b, c, endorser, d, s
//     `, { searchTerm });

// console.log(`result`, result)
    
//     if (result.records.length === 0) {
//       return [];
//     }

//     // Process the results into a structured format
//     const entityData = { 
//       entity: {
//         type: entityType,
//         name: result.records[0].get('e').properties.name
//       },
//       products: {}
//     };
    
//     result.records.forEach(record => {
//       const product = record.get('product');
//       if (!product) return; // Skip if no product connected
      
//       const brand = record.get('b');
//       const company = record.get('c');
//       const endorser = record.get('endorser');
//       const director = record.get('d');
//       const shareholder = record.get('s');
      
//       // Initialize the product data if not already done
//       if (product && !entityData.products[product.properties.name]) {
//         entityData.products[product.properties.name] = {
//           name: product.properties.name,
//           brand: null,
//           company: null,
//           endorsers: [],
//           directors: [],
//           shareholders: []
//         };
//       }

//       // Only process if we have a valid product
//       if (product) {
//         const productObj = entityData.products[product.properties.name];
        
//         // Add brand if available
//         if (brand && !productObj.brand) {
//           productObj.brand = brand.properties.name;
//         }

//         // Add company if available
//         if (company && !productObj.company) {
//           productObj.company = company.properties.name;
//         }

//         // Add endorser if available and not already added
//         if (endorser && !productObj.endorsers.includes(endorser.properties.name)) {
//           productObj.endorsers.push(endorser.properties.name);
//         }

//         // Add director if available and not already added
//         if (director && !productObj.directors.includes(director.properties.name)) {
//           productObj.directors.push(director.properties.name);
//         }

//         // Add shareholder if available and not already added
//         if (shareholder && !productObj.shareholders.includes(shareholder.properties.name)) {
//           productObj.shareholders.push(shareholder.properties.name);
//         }
//       }
//     });

//     return { 
//       entity: entityData.entity,
//       products: Object.values(entityData.products)
//     };
//   } catch (error) {
//     console.error(`Error searching for ${entityType}:`, error);
//     throw error;
//   }
// };

// // Search endpoint for products (existing endpoint)
// app.get('/api/search/product/:name', async (req, res) => {
//   const session = driver.session({ database: 'products' });
//   const productName = req.params.name;
  
//   try {
//     // Query to find the product and all its related data
//     const result = await session.run(`
//       MATCH (p:Product)
//       WHERE p.name CONTAINS $productName
//       OPTIONAL MATCH (p)-[:BRANDED_AS]->(b:Brand)
//       OPTIONAL MATCH (b)-[:OWNED_BY]->(c:Company)
//       OPTIONAL MATCH (p)-[:ENDORSED_BY]->(e:Endorser)
//       OPTIONAL MATCH (c)-[:HAS_DIRECTOR]->(d:Director)
//       OPTIONAL MATCH (c)-[:HAS_SHAREHOLDER]->(s:Shareholder)
//       RETURN p, b, c, e, d, s
//     `, { productName });

//     if (result.records.length === 0) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Process the results into a structured format
//     const productData = {};
    
//     result.records.forEach(record => {
//       const product = record.get('p');
//       const brand = record.get('b');
//       const company = record.get('c');
//       const endorser = record.get('e');
//       const director = record.get('d');
//       const shareholder = record.get('s');
      
//       // Initialize the product data if not already done
//       if (!productData[product.properties.name]) {
//         productData[product.properties.name] = {
//           name: product.properties.name,
//           brand: null,
//           company: null,
//           endorsers: [],
//           directors: [],
//           shareholders: []
//         };
//       }

//       // Add brand if available
//       if (brand && !productData[product.properties.name].brand) {
//         productData[product.properties.name].brand = brand.properties.name;
//       }

//       // Add company if available
//       if (company && !productData[product.properties.name].company) {
//         productData[product.properties.name].company = company.properties.name;
//       }

//       // Add endorser if available and not already added
//       if (endorser && !productData[product.properties.name].endorsers.includes(endorser.properties.name)) {
//         productData[product.properties.name].endorsers.push(endorser.properties.name);
//       }

//       // Add director if available and not already added
//       if (director && !productData[product.properties.name].directors.includes(director.properties.name)) {
//         productData[product.properties.name].directors.push(director.properties.name);
//       }

//       // Add shareholder if available and not already added
//       if (shareholder && !productData[product.properties.name].shareholders.includes(shareholder.properties.name)) {
//         productData[product.properties.name].shareholders.push(shareholder.properties.name);
//       }
//     });

//     res.json(Object.values(productData));
//   } catch (error) {
//     console.error('Error searching for product:', error);
//     res.status(500).json({ message: 'Error searching for product', error: error.message });
//   } finally {
//     await session.close();
//   }
// });

// // NEW: Search endpoint for Brand
// app.get('/api/search/brand/:name', async (req, res) => {
//   const session = driver.session({ database: 'products' });
//   const searchTerm = req.params.name;
  
//   try {
//     const result = await searchEntity(session, 'Brand', searchTerm);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching for brand', error: error.message });
//   } finally {
//     await session.close();
//   }
// });

// // NEW: Search endpoint for Company
// app.get('/api/search/company/:name', async (req, res) => {
//   const session = driver.session({ database: 'products' });
//   const searchTerm = req.params.name;
  
//   try {
//     const result = await searchEntity(session, 'Company', searchTerm);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching for company', error: error.message });
//   } finally {
//     await session.close();
//   }
// });

// // NEW: Search endpoint for Endorser
// app.get('/api/search/endorser/:name', async (req, res) => {
//   const session = driver.session({ database: 'products' });
//   const searchTerm = req.params.name;
  
//   try {
//     const result = await searchEntity(session, 'Endorser', searchTerm);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching for endorser', error: error.message });
//   } finally {
//     await session.close();
//   }
// });

// // NEW: Search endpoint for Director
// app.get('/api/search/director/:name', async (req, res) => {
//   const session = driver.session({ database: 'products' });
//   const searchTerm = req.params.name;
  
//   try {
//     const result = await searchEntity(session, 'Director', searchTerm);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching for director', error: error.message });
//   } finally {
//     await session.close();
//   }
// });

// // NEW: Search endpoint for Shareholder
// app.get('/api/search/shareholder/:name', async (req, res) => {
//   const session = driver.session({ database: 'products' });
//   const searchTerm = req.params.name;
  
//   try {
//     const result = await searchEntity(session, 'Shareholder', searchTerm);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching for shareholder', error: error.message });
//   } finally {
//     await session.close();
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Backend server running on port ${port}`);
// });





import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Network, X } from 'lucide-react';
import * as d3 from 'd3';

// Custom CSS styles
const styles = {
  app: {
    backgroundColor: '#f5f5f7',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background: 'linear-gradient(135deg, #1a51b5 0%, #2c7be5 100%)',
    color: 'white',
    padding: '1.5rem 1rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    textAlign: 'center',

  },
  headerSubtitle: {
    opacity: '0.8',
    margin: 0,
    textAlign: 'center',

  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInputContainer: {
    position: 'relative',
    flexGrow: 1
  },
  searchIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  },
  searchIcon: {
    color: '#9ca3af'
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px 0 0 8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  searchInputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.25)'
  },
    searchButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0 8px 8px 0',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.2s',
      minWidth: '100px',
    },
  searchButtonHover: {
    backgroundColor: '#1d4ed8'
  },
  searchButtonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    borderLeft: '4px solid #ef4444',
    color: '#b91c1c',
    padding: '1rem',
    marginBottom: '1.5rem',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center'
  },
  errorIcon: {
    marginRight: '0.5rem'
  },
  viewToggle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  viewToggleContainer: {
    backgroundColor: 'white',
    borderRadius: '32px',
    padding: '0.25rem',
    display: 'inline-flex',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  viewToggleButton: {
    padding: '0.5rem 1rem',
    borderRadius: '32px',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s, color 0.2s'
  },
  viewToggleButtonActive: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  viewToggleButtonInactive: {
    backgroundColor: 'white',
    color: '#374151'
  },
  viewToggleButtonInactiveHover: {
    backgroundColor: '#f3f4f6'
  },
  viewToggleIcon: {
    marginRight: '0.25rem'
  },
  graphContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  },
  graphTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#1f2937'
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center'
  },
  legendDot: {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    marginRight: '0.5rem'
  },
  legendText: {
    fontSize: '0.875rem'
  },
  graphCanvas: {
    width: '100%',
    height: '30rem',
    border: '1px solid #e5e7eb',
    borderRadius: '4px'
  },
  graphTip: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.5rem',
    textAlign: 'center'
  },
  productDetails: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  },
  productTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#2563eb'
  },
  productDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  },
  productDetailsGridLg: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem'
  },
  productInfoBox: {
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  productInfoBasic: {
    backgroundColor: '#eff6ff'
  },
  productInfoEndorsers: {
    backgroundColor: '#f9fafb'
  },
  productInfoLeadership: {
    backgroundColor: '#fff7ed'
  },
  productInfoTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.75rem'
  },
  productInfoTitleBlue: {
    color: '#1d4ed8'
  },
  productInfoTitleGray: {
    color: '#374151'
  },
  productInfoTitleOrange: {
    color: '#c2410c'
  },
  productInfoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem'
  },
  productInfoLabel: {
    fontWeight: '500'
  },
  productInfoValue: {
    color: '#374151'
  },
  productInfoList: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
    marginTop: '0.5rem'
  },
  productInfoListItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  productInfoListDot: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50%',
    marginRight: '0.5rem'
  },
  dotGray: {
    backgroundColor: '#9ca3af'
  },
  dotPurple: {
    backgroundColor: '#8b5cf6'
  },
  dotRed: {
    backgroundColor: '#ef4444'
  },
  productInfoSection: {
    marginBottom: '1rem'
  },
  productInfoSectionTitle: {
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  italic: {
    fontStyle: 'italic',
    color: '#6b7280'
  },
  searchResultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  searchResultsTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  searchResultCard: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb'
  },
  searchResultCardHeader: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '1rem'
  },
  searchResultCardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    margin: '0'
  },
  searchResultCardBody: {
    padding: '1.5rem'
  },
  searchResultCardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  },
  searchResultCardGridMd: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem'
  },
  searchResultInfoBox: {
    padding: '1rem',
    borderRadius: '8px'
  },
  searchResultBasic: {
    backgroundColor: '#eff6ff'
  },
  searchResultEndorsers: {
    backgroundColor: '#f9fafb'
  },
  searchResultDirectors: {
    backgroundColor: '#f5f3ff'
  },
  searchResultShareholders: {
    backgroundColor: '#fef2f2'
  },
  searchResultBoxTitle: {
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  searchResultBoxTitleBlue: {
    color: '#1d4ed8'
  },
  searchResultBoxTitleGray: {
    color: '#374151'
  },
  searchResultBoxTitlePurple: {
    color: '#7c3aed'
  },
  searchResultBoxTitleRed: {
    color: '#dc2626'
  },
  searchResultLabel: {
    fontWeight: '500',
    marginRight: '0.25rem'
  },
  searchResultList: {
    listStyle: 'disc',
    paddingLeft: '1.5rem',
    margin: '0'
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem 0'
  },
  noResultsIcon: {
    display: 'inline-block',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '50%',
    marginBottom: '1rem'
  },
  noResultsTitle: {
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  noResultsText: {
    color: '#4b5563'
  },
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '1.5rem 1rem',
    marginTop: '3rem',
    textAlign: 'center'
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  tooltip: {
    position: 'absolute',
    padding: '0.5rem',
    backgroundColor: '#1f2937',
    color: 'white',
    fontSize: '0.875rem',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    pointerEvents: 'none',
    display: 'none'
  },
  entitySelectorContainer: {
    position: 'relative',
    minWidth: '120px',
    marginRight: '10px',
  },
    entitySelector: {
    appearance: 'none',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    color: '#374151',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    height: '42px',
    outline: 'none',
    paddingLeft: '12px',
    paddingRight: '32px',
    transition: 'all 0.2s ease',
    width: '100%',
  },
  
  searchInfo: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '16px',
    padding: '0 8px',
  },
  
  
  tooltip: {
    position: 'absolute',
    padding: '8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    fontSize: '12px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    pointerEvents: 'none',
    display: 'none'
  },
  listViewContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
  },
  listViewWrapper: {
    maxWidth: '800px',
    width: '100%',
  },
  listViewTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#1f2937',
  },
  listView: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  listItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  listItemTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#111827',
  },
  label: {
    fontWeight: '500',
    color: '#374151',
    marginRight: '0.25rem',
  },
};

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'cards'
//   const [inputFocused, setInputFocused] = useState(false);
//   const [buttonHovered, setButtonHovered] = useState(false);
  
//   const graphRef = useRef(null);
//   const simulationRef = useRef(null);
  
//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Perform search when form is submitted
//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!searchTerm.trim()) return;
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await axios.get(`http://localhost:3001/api/search/product/${searchTerm}`);
//       setSearchResults(response.data);
//       if (response.data.length > 0) {
//         setSelectedProduct(response.data[0]);
//       }
//     } catch (err) {
//       console.error('Error searching for product:', err);
//       setError(err.response?.data?.message || 'Error searching for product');
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Convert product data to graph format
//   const createGraphData = (products) => {
//     const nodes = [];
//     const links = [];
//     const nodeSet = new Set();
    
//     products.forEach(product => {
//       // Add product node
//       if (!nodeSet.has(product.name)) {
//         nodes.push({ id: product.name, label: product.name, group: 'product' });
//         nodeSet.add(product.name);
//       }
      
//       // Add brand node and link
//       if (product.brand) {
//         if (!nodeSet.has(product.brand)) {
//           nodes.push({ id: product.brand, label: product.brand, group: 'brand' });
//           nodeSet.add(product.brand);
//         }
//         links.push({ source: product.name, target: product.brand, type: 'BRANDED_AS' });
//       }
      
//       // Add company node and link
//       if (product.company) {
//         if (!nodeSet.has(product.company)) {
//           nodes.push({ id: product.company, label: product.company, group: 'company' });
//           nodeSet.add(product.company);
//         }
//         if (product.brand) {
//           links.push({ source: product.brand, target: product.company, type: 'OWNED_BY' });
//         }
//       }
      
//       // Add endorser nodes and links
//       product.endorsers.forEach(endorser => {
//         if (!nodeSet.has(endorser)) {
//           nodes.push({ id: endorser, label: endorser, group: 'endorser' });
//           nodeSet.add(endorser);
//         }
//         links.push({ source: product.name, target: endorser, type: 'ENDORSED_BY' });
//       });
      
//       // Add director nodes and links
//       product.directors.forEach(director => {
//         if (!nodeSet.has(director)) {
//           nodes.push({ id: director, label: director, group: 'director' });
//           nodeSet.add(director);
//         }
//         if (product.company) {
//           links.push({ source: product.company, target: director, type: 'HAS_DIRECTOR' });
//         }
//       });
      
//       // Add shareholder nodes and links
//       product.shareholders.forEach(shareholder => {
//         if (!nodeSet.has(shareholder)) {
//           nodes.push({ id: shareholder, label: shareholder, group: 'shareholder' });
//           nodeSet.add(shareholder);
//         }
//         if (product.company) {
//           links.push({ source: product.company, target: shareholder, type: 'HAS_SHAREHOLDER' });
//         }
//       });
//     });
    
//     return { nodes, links };
//   };
  
//   // Create D3 graph visualization
//   useEffect(() => {
//     if (!searchResults.length || !graphRef.current || viewMode !== 'graph') return;
    
//     // Clear previous graph
//     d3.select(graphRef.current).selectAll("*").remove();
    
//     const data = createGraphData(searchResults);
    
//     const width = graphRef.current.clientWidth;
//     const height = 600;
    
//     // Define color scheme for node types
//     const color = d3.scaleOrdinal()
//       .domain(['product', 'brand', 'company', 'endorser', 'director', 'shareholder'])
//       .range(['#4299e1', '#48bb78', '#ed8936', '#a0aec0', '#9f7aea', '#f56565']);
    
//     // Create SVG
//     const svg = d3.select(graphRef.current)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height);
    
//     // Create tooltip div
//     const tooltip = d3.select("body")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("position", styles.tooltip.position)
//       .style("padding", styles.tooltip.padding)
//       .style("backgroundColor", styles.tooltip.backgroundColor)
//       .style("color", styles.tooltip.color)
//       .style("fontSize", styles.tooltip.fontSize)
//       .style("borderRadius", styles.tooltip.borderRadius)
//       .style("boxShadow", styles.tooltip.boxShadow)
//       .style("pointerEvents", styles.tooltip.pointerEvents)
//       .style("display", styles.tooltip.display);
    
//     // Create force simulation
//     const simulation = d3.forceSimulation(data.nodes)
//       .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
//       .force("charge", d3.forceManyBody().strength(-800))
//       .force("center", d3.forceCenter(width / 2, height / 2))
//       .force("x", d3.forceX(width / 2).strength(0.1))
//       .force("y", d3.forceY(height / 2).strength(0.1));
    
//     // Create links
//     const link = svg.append("g")
//       .selectAll("line")
//       .data(data.links)
//       .enter()
//       .append("line")
//       .attr("stroke", "#999")
//       .attr("stroke-opacity", 0.6)
//       .attr("stroke-width", 2);
    
//     // Create nodes
//     const node = svg.append("g")
//       .selectAll("circle")
//       .data(data.nodes)
//       .enter()
//       .append("circle")
//       .attr("r", d => d.group === 'product' ? 15 : 10)
//       .attr("fill", d => color(d.group))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2)
//       .on("mouseover", (event, d) => {
//         tooltip
//           .style("display", "block")
//           .style("opacity", 0.9)
//           .html(`
//             <strong>${d.label}</strong><br/>
//             <span style="font-size: 12px">${d.group}</span>
//           `)
//           .style("left", (event.pageX + 10) + "px")
//           .style("top", (event.pageY - 28) + "px");
//       })
//       .on("mouseout", () => {
//         tooltip
//           .style("opacity", 0)
//           .style("display", "none");
//       })
//       .on("click", (_, d) => {
//         const product = searchResults.find(p => 
//           p.name === d.label || 
//           p.brand === d.label || 
//           p.company === d.label ||
//           p.endorsers.includes(d.label) ||
//           p.directors.includes(d.label) ||
//           p.shareholders.includes(d.label)
//         );
        
//         if (product) {
//           setSelectedProduct(product);
//         }
//       })
//       .call(d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended));
    
//     // Add node labels
//     const text = svg.append("g")
//       .selectAll("text")
//       .data(data.nodes)
//       .enter()
//       .append("text")
//       .text(d => d.label)
//       .attr("font-size", 10)
//       .attr("dx", 15)
//       .attr("dy", 4);
    
//     // Update positions on simulation tick
//     simulation.on("tick", () => {
//       link
//         .attr("x1", d => d.source.x)
//         .attr("y1", d => d.source.y)
//         .attr("x2", d => d.target.x)
//         .attr("y2", d => d.target.y);
      
//       node
//         .attr("cx", d => d.x = Math.max(15, Math.min(width - 15, d.x)))
//         .attr("cy", d => d.y = Math.max(15, Math.min(height - 15, d.y)));
      
//       text
//         .attr("x", d => d.x)
//         .attr("y", d => d.y);
//     });
    
//     // Drag functions
//     function dragstarted(event, d) {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     }
    
//     function dragged(event, d) {
//       d.fx = event.x;
//       d.fy = event.y;
//     }
    
//     function dragended(event, d) {
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     }
    
//     // Save simulation to ref
//     simulationRef.current = simulation;
    
//     // Cleanup
//     return () => {
//       if (simulationRef.current) {
//         simulationRef.current.stop();
//       }
//       d3.select("body").selectAll("div.tooltip").remove();
//     };
//   }, [searchResults, viewMode]);
  
//   // Legend for graph node colors
//   const renderLegend = () => (
//     <div style={styles.legend}>
//       <div style={styles.legendItem}>
//         <div style={{...styles.legendDot, backgroundColor: '#4299e1'}}></div>
//         <span style={styles.legendText}>Product</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{...styles.legendDot, backgroundColor: '#48bb78'}}></div>
//         <span style={styles.legendText}>Brand</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{...styles.legendDot, backgroundColor: '#ed8936'}}></div>
//         <span style={styles.legendText}>Company</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{...styles.legendDot, backgroundColor: '#a0aec0'}}></div>
//         <span style={styles.legendText}>Endorser</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{...styles.legendDot, backgroundColor: '#9f7aea'}}></div>
//         <span style={styles.legendText}>Director</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{...styles.legendDot, backgroundColor: '#f56565'}}></div>
//         <span style={styles.legendText}>Shareholder</span>
//       </div>
//     </div>
//   );
  
//   return (
//     <div style={styles.app}>
//       {/* Header */}
//       <header style={styles.header}>
//         <div style={styles.headerContainer}>
//           <h1 style={styles.headerTitle}>Product Network Explorer</h1>
//           <p style={styles.headerSubtitle}>Discover the connections behind your favorite products</p>
//         </div>
//       </header>
      
//       <div style={styles.container}>
//         {/* Search Form */}
//         <div style={styles.searchBox}>
//           <form onSubmit={handleSearch} style={styles.searchForm}>
//             <div style={styles.searchInputContainer}>
//               <div style={styles.searchIconContainer}>
//                 <Search size={18} style={styles.searchIcon} />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search for a product..."
//                 style={{
//                   ...styles.searchInput,
//                   ...(inputFocused ? styles.searchInputFocus : {})
//                 }}
//                 onFocus={() => setInputFocused(true)}
//                 onBlur={() => setInputFocused(false)}
//               />
//             </div>
//             <button 
//               type="submit" 
//               style={{
//                 ...styles.searchButton,
//                 ...(buttonHovered && !isLoading ? styles.searchButtonHover : {}),
//                 ...(isLoading ? styles.searchButtonDisabled : {})
//               }}
//               disabled={isLoading}
//               onMouseEnter={() => setButtonHovered(true)}
//               onMouseLeave={() => setButtonHovered(false)}
//             >
//               {isLoading ? 'Searching...' : 'Search'}
//             </button>
//           </form>
//         </div>
        
//         {/* Error Message */}
//         {error && (
//           <div style={styles.errorMessage}>
//             <X size={20} style={styles.errorIcon} />
//             <p>{error}</p>
//           </div>
//         )}
        
//         {/* View Mode Toggle */}
//         {searchResults.length > 0 && (
//           <div style={styles.viewToggle}>
//             <div style={styles.viewToggleContainer}>
//               <button
//                 onClick={() => setViewMode('graph')}
//                 style={{
//                   ...styles.viewToggleButton,
//                   ...(viewMode === 'graph' ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive)
//                 }}
//               >
//                 <Network size={16} style={styles.viewToggleIcon} /> Graph View
//               </button>
//               <button
//                 onClick={() => setViewMode('cards')}
//                 style={{
//                   ...styles.viewToggleButton,
//                   ...(viewMode === 'cards' ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive)
//                 }}
//               >
//                 <svg style={styles.viewToggleIcon} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
//                 </svg>
//                 Card View
//               </button>
//             </div>
//           </div>
//         )}
        
//         {/* Search Results - Graph View */}
//         {searchResults.length > 0 && viewMode === 'graph' && (
//           <div style={styles.graphContainer}>
//             <h2 style={styles.graphTitle}>Network Visualization</h2>
//             {renderLegend()}
//             <div 
//               ref={graphRef} 
//               style={styles.graphCanvas}
//             ></div>
         
//           </div>
//         )}
//         {/* Product Details */}
//         {selectedProduct && (
//           <div style={styles.productDetails}>
//             <h2 style={styles.productTitle}>{selectedProduct.name}</h2>
            
//             <div style={window.innerWidth >= 1024 ? styles.productDetailsGridLg : styles.productDetailsGrid}>
//               {/* Basic Info */}
//               <div style={{...styles.productInfoBox, ...styles.productInfoBasic}}>
//                 <h3 style={{...styles.productInfoTitle, ...styles.productInfoTitleBlue}}>Basic Information</h3>
//                 <p style={styles.productInfoRow}>
//                   <span style={styles.productInfoLabel}>Brand:</span> 
//                   <span style={styles.productInfoValue}>{selectedProduct.brand || 'N/A'}</span>
//                 </p>
//                 <p style={{display: 'flex', justifyContent: 'space-between'}}>
//                   <span style={styles.productInfoLabel}>Company:</span> 
//                   <span style={styles.productInfoValue}>{selectedProduct.company || 'N/A'}</span>
//                 </p>
//               </div>
              
//             {/* Endorsers */}
//             <div style={{...styles.productInfoBox, ...styles.productInfoEndorsers}}>
//                 <h3 style={{...styles.productInfoTitle, ...styles.productInfoTitleGray}}>Endorsers</h3>
//                 {selectedProduct.endorsers.length > 0 ? (
//                   <ul style={styles.productInfoList}>
//                     {selectedProduct.endorsers.map((endorser, idx) => (
//                       <li key={idx} style={styles.productInfoListItem}>
//                         <span style={{...styles.productInfoListDot, ...styles.dotGray}}></span>
//                         {endorser}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p style={styles.italic}>No endorsers found</p>
//                 )}
//               </div>
              
//               {/* Directors & Shareholders */}
//               <div style={{...styles.productInfoBox, ...styles.productInfoLeadership}}>
//                 <h3 style={{...styles.productInfoTitle, ...styles.productInfoTitleOrange}}>Company Leadership</h3>
//                 <div style={styles.productInfoSection}>
//                   <h4 style={styles.productInfoSectionTitle}>Directors:</h4>
//                   {selectedProduct.directors.length > 0 ? (
//                     <ul style={styles.productInfoList}>
//                       {selectedProduct.directors.map((director, idx) => (
//                         <li key={idx} style={styles.productInfoListItem}>
//                           <span style={{...styles.productInfoListDot, ...styles.dotPurple}}></span>
//                           {director}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p style={styles.italic}>No directors found</p>
//                   )}
                  
//                   <h4 style={styles.productInfoSectionTitle}>Shareholders:</h4>
//                   {selectedProduct.shareholders.length > 0 ? (
//                     <ul style={styles.productInfoList}>
//                       {selectedProduct.shareholders.map((shareholder, idx) => (
//                         <li key={idx} style={styles.productInfoListItem}>
//                           <span style={{...styles.productInfoListDot, ...styles.dotRed}}></span>
//                           {shareholder}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p style={styles.italic}>No shareholders found</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Search Results - Card View */}
//         {searchResults.length > 0 && viewMode === 'cards' && (
//           <div style={styles.searchResultsContainer}>
//             <h2 style={styles.searchResultsTitle}>Search Results</h2>
//             {searchResults.map((product, index) => (
//               <div key={index} style={styles.searchResultCard}>
//                 <div style={styles.searchResultCardHeader}>
//                   <h3 style={styles.searchResultCardTitle}>{product.name}</h3>
//                 </div>
                
//                 <div style={styles.searchResultCardBody}>
//                   <div style={window.innerWidth >= 768 ? styles.searchResultCardGridMd : styles.searchResultCardGrid}>
//                     {/* Brand and Company */}
//                     <div style={{...styles.searchResultInfoBox, ...styles.searchResultBasic}}>
//                       <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitleBlue}}>Basic Information</h4>
//                       <p style={{marginBottom: '0.5rem'}}><span style={styles.searchResultLabel}>Brand:</span> {product.brand || 'N/A'}</p>
//                       <p><span style={styles.searchResultLabel}>Company:</span> {product.company || 'N/A'}</p>
//                     </div>
                    
//                     {/* Endorsers */}
//                     <div style={{...styles.searchResultInfoBox, ...styles.searchResultEndorsers}}>
//                       <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitleGray}}>Endorsers</h4>
//                       {product.endorsers.length > 0 ? (
//                         <ul style={styles.searchResultList}>
//                           {product.endorsers.map((endorser, idx) => (
//                             <li key={idx}>{endorser}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p style={styles.italic}>No endorsers found</p>
//                       )}
//                     </div>
                    
//                     {/* Directors */}
//                     <div style={{...styles.searchResultInfoBox, ...styles.searchResultDirectors}}>
//                       <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitlePurple}}>Directors</h4>
//                       {product.directors.length > 0 ? (
//                         <ul style={styles.searchResultList}>
//                           {product.directors.map((director, idx) => (
//                             <li key={idx}>{director}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p style={styles.italic}>No directors found</p>
//                       )}
//                     </div>
                    
//                     {/* Shareholders */}
//                     <div style={{...styles.searchResultInfoBox, ...styles.searchResultShareholders}}>
//                       <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitleRed}}>Shareholders</h4>
//                       {product.shareholders.length > 0 ? (
//                         <ul style={styles.searchResultList}>
//                           {product.shareholders.map((shareholder, idx) => (
//                             <li key={idx}>{shareholder}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p style={styles.italic}>No shareholders found</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
        
//         {/* No Results */}
//         {!isLoading && searchTerm && !error && searchResults.length === 0 && (
//           <div style={styles.noResults}>
//             <div style={styles.noResultsIcon}>
//               <Search size={48} style={{color: '#9ca3af'}} />
//             </div>
//             <h3 style={styles.noResultsTitle}>No results found</h3>
//             <p style={styles.noResultsText}>Try searching for a different product</p>
//           </div>
//         )}
//       </div>
      
//       {/* Footer */}
//       {/* <footer style={styles.footer}>
//         <div style={styles.footerContainer}>
//           <p>Product Network Explorer &copy; {new Date().getFullYear()}</p>
//         </div>
//       </footer> */}
//     </div>
//   );
// };














const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'cards'
  const [inputFocused, setInputFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [entityType, setEntityType] = useState('product'); // New state for entity type selection
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const graphRef = useRef(null);
  const simulationRef = useRef(null);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle entity type selection change
  const handleEntityTypeChange = (e) => {
    setEntityType(e.target.value);
  };

  // Perform search when form is submitted
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the entity type to determine which API endpoint to call
      const response = await axios.get(`http://localhost:3001/api/search/${entityType}/${searchTerm}`);
      
      // Handle different response formats based on entity type
      if (entityType === 'product') {
        setSearchResults(response.data);
        if (response.data.length > 0) {
          setSelectedProduct(response.data[0]);
        }
      } else {
        // For other entity types, the response is structured differently
        // with entity and products properties
        if (response.data && response.data.products) {
          setSearchResults(response.data.products);
          if (response.data.products.length > 0) {
            setSelectedProduct(response.data.products[0]);
          }
        } else {
          setSearchResults([]);
        }
      }
    } catch (err) {
      console.error(`Error searching for ${entityType}:`, err);
      setError(err.response?.data?.message || `Error searching for ${entityType}`);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Convert product data to graph format
  const createGraphData = (products) => {
    const nodes = [];
    const links = [];
    const nodeSet = new Set();
    
    products.forEach(product => {
      // Add product node
      if (!nodeSet.has(product.name)) {
        nodes.push({ id: product.name, label: product.name, group: 'product' });
        nodeSet.add(product.name);
      }
      
      // Add brand node and link
      if (product.brand) {
        if (!nodeSet.has(product.brand)) {
          nodes.push({ id: product.brand, label: product.brand, group: 'brand' });
          nodeSet.add(product.brand);
        }
        links.push({ source: product.name, target: product.brand, type: 'BRANDED_AS' });
      }
      
      // Add company node and link
      if (product.company) {
        if (!nodeSet.has(product.company)) {
          nodes.push({ id: product.company, label: product.company, group: 'company' });
          nodeSet.add(product.company);
        }
        if (product.brand) {
          links.push({ source: product.brand, target: product.company, type: 'OWNED_BY' });
        }
      }
      
      // Add endorser nodes and links
      product.endorsers.forEach(endorser => {
        if (!nodeSet.has(endorser)) {
          nodes.push({ id: endorser, label: endorser, group: 'endorser' });
          nodeSet.add(endorser);
        }
        links.push({ source: product.name, target: endorser, type: 'ENDORSED_BY' });
      });
      
      // Add director nodes and links
      product.directors.forEach(director => {
        if (!nodeSet.has(director)) {
          nodes.push({ id: director, label: director, group: 'director' });
          nodeSet.add(director);
        }
        if (product.company) {
          links.push({ source: product.company, target: director, type: 'HAS_DIRECTOR' });
        }
      });
      
      // Add shareholder nodes and links
      product.shareholders.forEach(shareholder => {
        if (!nodeSet.has(shareholder)) {
          nodes.push({ id: shareholder, label: shareholder, group: 'shareholder' });
          nodeSet.add(shareholder);
        }
        if (product.company) {
          links.push({ source: product.company, target: shareholder, type: 'HAS_SHAREHOLDER' });
        }
      });
    });
    
    return { nodes, links };
  };
  
  // Create D3 graph visualization
  useEffect(() => {
    if (!searchResults.length || !graphRef.current || viewMode !== 'graph') return;
    
    // Clear previous graph
    d3.select(graphRef.current).selectAll("*").remove();
    
    const data = createGraphData(searchResults);
    
    const width = graphRef.current.clientWidth;
    const height = 600;
    
    // Define color scheme for node types
    const color = d3.scaleOrdinal()
      .domain(['product', 'brand', 'company', 'endorser', 'director', 'shareholder'])
      .range(['#4299e1', '#48bb78', '#ed8936', '#a0aec0', '#9f7aea', '#f56565']);
    
    // Create SVG
    const svg = d3.select(graphRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    // Create tooltip div
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", styles.tooltip.position)
      .style("padding", styles.tooltip.padding)
      .style("backgroundColor", styles.tooltip.backgroundColor)
      .style("color", styles.tooltip.color)
      .style("fontSize", styles.tooltip.fontSize)
      .style("borderRadius", styles.tooltip.borderRadius)
      .style("boxShadow", styles.tooltip.boxShadow)
      .style("pointerEvents", styles.tooltip.pointerEvents)
      .style("display", styles.tooltip.display);
    
    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));
    
    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);
    
    // Create nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", d => d.group === 'product' ? 15 : 10)
      .attr("fill", d => color(d.group))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .style("opacity", 0.9)
          .html(`
            <strong>${d.label}</strong><br/>
            <span style="font-size: 12px">${d.group}</span>
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        tooltip
          .style("opacity", 0)
          .style("display", "none");
      })
      .on("click", (_, d) => {
        const product = searchResults.find(p => 
          p.name === d.label || 
          p.brand === d.label || 
          p.company === d.label ||
          p.endorsers.includes(d.label) ||
          p.directors.includes(d.label) ||
          p.shareholders.includes(d.label)
        );
        
        if (product) {
          setSelectedProduct(product);
        }
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    
    // Add node labels
    const text = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text(d => d.label)
      .attr("font-size", 10)
      .attr("dx", 15)
      .attr("dy", 4);
    
    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      node
        .attr("cx", d => d.x = Math.max(15, Math.min(width - 15, d.x)))
        .attr("cy", d => d.y = Math.max(15, Math.min(height - 15, d.y)));
      
      text
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
    
    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Save simulation to ref
    simulationRef.current = simulation;
    
    // Cleanup
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      d3.select("body").selectAll("div.tooltip").remove();
    };
  }, [searchResults, viewMode]);
  
  // Legend for graph node colors
  const renderLegend = () => (
    <div style={styles.legend}>
      <div style={styles.legendItem}>
        <div style={{...styles.legendDot, backgroundColor: '#4299e1'}}></div>
        <span style={styles.legendText}>Product</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{...styles.legendDot, backgroundColor: '#48bb78'}}></div>
        <span style={styles.legendText}>Brand</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{...styles.legendDot, backgroundColor: '#ed8936'}}></div>
        <span style={styles.legendText}>Company</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{...styles.legendDot, backgroundColor: '#a0aec0'}}></div>
        <span style={styles.legendText}>Endorser</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{...styles.legendDot, backgroundColor: '#9f7aea'}}></div>
        <span style={styles.legendText}>Director</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{...styles.legendDot, backgroundColor: '#f56565'}}></div>
        <span style={styles.legendText}>Shareholder</span>
      </div>
    </div>
  );
  
  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.headerTitle}>Product Network Explorer</h1>
          <p style={styles.headerSubtitle}>Discover the connections behind your favorite products</p>
        </div>
      </header>
      
      <div style={styles.container}>
        {/* Search Form */}
        <div style={styles.searchBox}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            {/* New Entity Type Selector */}
            <div style={styles.entitySelectorContainer}>
              <select
                value={entityType}
                onChange={handleEntityTypeChange}
                style={styles.entitySelector}
              >
                <option value="product">Product</option>
                <option value="brand">Brand</option>
                <option value="company">Company</option>
                <option value="endorser">Endorser</option>
                <option value="director">Director</option>
                <option value="shareholder">Shareholder</option>
              </select>
            </div>
            
            <div style={styles.searchInputContainer}>
              <div style={styles.searchIconContainer}>
                <Search size={18} style={styles.searchIcon} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={`Search for a ${entityType}...`}
                style={{
                  ...styles.searchInput,
                  ...(inputFocused ? styles.searchInputFocus : {})
                }}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
            </div>
            <button 
              type="submit" 
              style={{
                ...styles.searchButton,
                ...(buttonHovered && !isLoading ? styles.searchButtonHover : {}),
                ...(isLoading ? styles.searchButtonDisabled : {})
              }}
              disabled={isLoading}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
        
        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage}>
            <X size={20} style={styles.errorIcon} />
            <p>{error}</p>
          </div>
        )}
        
        {/* Search Results Info - Show what entity type was searched */}
        {searchResults.length > 0 && (
          <div style={styles.searchInfo}>
            <p>
              Showing {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} 
              {entityType !== 'product' && ` connected to ${entityType}: `}
              {entityType !== 'product' && <strong>{searchTerm}</strong>}
            </p>
          </div>
        )}
        
        {/* View Mode Toggle */}
        {searchResults.length > 0 && (
          <div style={styles.viewToggle}>
            <div style={styles.viewToggleContainer}>
              <button
                onClick={() => setViewMode('graph')}
                style={{
                  ...styles.viewToggleButton,
                  ...(viewMode === 'graph' ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive)
                }}
              >
                <Network size={16} style={styles.viewToggleIcon} /> Graph View
              </button>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  ...styles.viewToggleButton,
                  ...(viewMode === 'cards' ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive)
                }}
              >
                <svg style={styles.viewToggleIcon} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                List View
              </button>
            </div>
          </div>
        )}
        
        {/* Search Results - Graph View */}
        {searchResults.length > 0 && viewMode === 'graph' && (
          <div style={styles.graphContainer}>
            <h2 style={styles.graphTitle}>Network Visualization</h2>
            {renderLegend()}
            <div 
              ref={graphRef} 
              style={styles.graphCanvas}
            ></div>
          </div>
        )}       
        {/* Search Results - Card View */}
        {/* {searchResults.length > 0 && viewMode === 'cards' && (
          <div style={styles.searchResultsContainer}>
            <h2 style={styles.searchResultsTitle}>Search Results</h2>
            {searchResults.map((product, index) => (
              <div key={index} style={styles.searchResultCard}>
                <div style={styles.searchResultCardHeader}>
                  <h3 style={styles.searchResultCardTitle}>{product.name}</h3>
                </div>
                
                <div style={styles.searchResultCardBody}>
                  <div style={window.innerWidth >= 768 ? styles.searchResultCardGridMd : styles.searchResultCardGrid}>
                    {/* Brand and Company */}
                    {/* <div style={{...styles.searchResultInfoBox, ...styles.searchResultBasic}}>
                      <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitleBlue}}>Basic Information</h4>
                      <p style={{marginBottom: '0.5rem'}}><span style={styles.searchResultLabel}>Brand:</span> {product.brand || 'N/A'}</p>
                      <p><span style={styles.searchResultLabel}>Company:</span> {product.company || 'N/A'}</p>
                    </div> */}
                    
                    {/* Endorsers */}
                    {/* <div style={{...styles.searchResultInfoBox, ...styles.searchResultEndorsers}}>
                      <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitleGray}}>Endorsers</h4>
                      {product.endorsers && product.endorsers.length > 0 ? (
                        <ul style={styles.searchResultList}>
                          {product.endorsers.map((endorser, idx) => (
                            <li key={idx}>{endorser}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={styles.italic}>No endorsers found</p>
                      )}
                    </div> */}
                    
                    {/* Directors */}
                    {/* <div style={{...styles.searchResultInfoBox, ...styles.searchResultDirectors}}>
                      <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitlePurple}}>Directors</h4>
                      {product.directors && product.directors.length > 0 ? (
                        <ul style={styles.searchResultList}>
                          {product.directors.map((director, idx) => (
                            <li key={idx}>{director}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={styles.italic}>No directors found</p>
                      )}
                    </div> */}
                    
                    {/* Shareholders */}
                    {/* <div style={{...styles.searchResultInfoBox, ...styles.searchResultShareholders}}>
                      <h4 style={{...styles.searchResultBoxTitle, ...styles.searchResultBoxTitleRed}}>Shareholders</h4>
                      {product.shareholders && product.shareholders.length > 0 ? (
                        <ul style={styles.searchResultList}>
                          {product.shareholders.map((shareholder, idx) => (
                            <li key={idx}>{shareholder}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={styles.italic}>No shareholders found</p>
                      )}
                    </div> */}
                   {/* </div>
                </div>
              </div>
            ))}
          </div> 
        )} 
         */}



{/* 
{searchResults.length > 0 && viewMode === 'cards' && (
  <div style={styles.listViewContainer}>
    <h2 style={styles.listViewTitle}>Search Results</h2>
    <ul style={styles.listView}>
      {searchResults.map((product, index) => (
        <li key={index} style={styles.listItem}>
          <h3 style={styles.listItemTitle}>{product.name}</h3>
          <p><span style={styles.label}>Brand:</span> {product.brand || 'N/A'}</p>
          <p><span style={styles.label}>Company:</span> {product.company || 'N/A'}</p>
          <p><span style={styles.label}>Endorsers:</span> {product.endorsers?.join(', ') || 'None'}</p>
          <p><span style={styles.label}>Directors:</span> {product.directors?.join(', ') || 'None'}</p>
          <p><span style={styles.label}>Shareholders:</span> {product.shareholders?.join(', ') || 'None'}</p>
        </li>
      ))}
    </ul>
  </div>
)} */}

{searchResults.length > 0 && viewMode === 'cards' && (
  <div style={styles.listViewContainer}>
    <div style={styles.listViewWrapper}>
      <h2 style={styles.listViewTitle}>Search Results</h2>
      <ul style={styles.listView}>
        {searchResults.map((product, index) => (
          <li
            key={index}
            style={{
              ...styles.listItem,
              ...(hoveredIndex === index ? styles.listItemHover : {})
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h3 style={styles.listItemTitle}>{product.name}</h3>
            <p><span style={styles.label}>Brand:</span> {product.brand || 'N/A'}</p>
            <p><span style={styles.label}>Company:</span> {product.company || 'N/A'}</p>
            <p><span style={styles.label}>Endorsers:</span> {product.endorsers?.join(', ') || 'None'}</p>
            <p><span style={styles.label}>Directors:</span> {product.directors?.join(', ') || 'None'}</p>
            <p><span style={styles.label}>Shareholders:</span> {product.shareholders?.join(', ') || 'None'}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

        {/* No Results */}
        {!isLoading && searchTerm && !error && searchResults.length === 0 && (
          <div style={styles.noResults}>
            <div style={styles.noResultsIcon}>
              <Search size={48} style={{color: '#9ca3af'}} />
            </div>
            <h3 style={styles.noResultsTitle}>No results found</h3>
            <p style={styles.noResultsText}>Try searching for a different {entityType}</p>
          </div>
        )}
      </div>
      

    </div>
  );
};





export default App;