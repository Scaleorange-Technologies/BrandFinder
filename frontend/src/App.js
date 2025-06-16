
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Search, Network, X } from 'lucide-react';
// import * as d3 from 'd3';
// const styles = {
//   app: {
//     backgroundColor: '#f5f5f7',
//     minHeight: '100vh',
//     fontFamily: 'Arial, sans-serif'
//   },
//   header: {
//     background:'black',
//     // background: 'linear-gradient(135deg, #1a51b5 0%, #2c7be5 100%)',
//     color: 'white',
//     padding: '1.5rem 1rem',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
//   },
//   headerContainer: {
//     maxWidth: '1200px',
//     margin: '0 auto'
//   },
//   headerTitle: {
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     margin: '0 0 0.5rem 0',
//     textAlign: 'center',

//   },
//   headerSubtitle: {
//     opacity: '0.8',
//     margin: 0,
//     textAlign: 'center',

//   },
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '2rem 1rem'
//   },
//   searchBox: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     padding: '1.5rem',
//     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//     marginBottom: '2rem',
//     border: '1px solid black', // adds the border

//   },
//   searchForm: {
//     display: 'flex',
//     alignItems: 'center',

//   },
//   searchInputContainer: {
//     position: 'relative',
//     flexGrow: 1,

//   },
//   searchIconContainer: {
//     position: 'absolute',
//     top: '50%',
//     left: '12px',
//     transform: 'translateY(-50%)',
//     pointerEvents: 'none'
//   },
//   searchIcon: {
//     color: '#9ca3af'
//   },
//   searchInput: {
//     width: '97%',
//     // padding: '0.75rem 1rem 0.75rem 2.5rem',
//     padding: '0.75rem 0.5rem 0.65rem 2.0rem',

//     border: '1px solid #d1d5db',
//     borderRadius: '8px 0 0 8px',
//     fontSize: '1rem',
//     outline: 'none',
//     transition: 'border-color 0.2s, box-shadow 0.2s'
//   },
//   searchInputFocus: {
//     // borderColor: '#3b82f6',
//     // boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.25)'
//   },
//   searchButton: {
//     backgroundColor: 'black',
//     // backgroundColor: '#2563eb',
//     color: 'white',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '0 8px 8px 0',
//     border: 'none',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     transition: 'background-color 0.2s',
//     minWidth: '100px',
//   },
//   searchButtonHover: {
//     backgroundColor: 'black'
//   },
//   searchButtonDisabled: {
//     backgroundColor: '#93c5fd',
//     cursor: 'not-allowed'
//   },
//   errorMessage: {
//     backgroundColor: '#fee2e2',
//     borderLeft: '4px solid #ef4444',
//     color: '#b91c1c',
//     padding: '1rem',
//     marginBottom: '1.5rem',
//     borderRadius: '4px',
//     boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//     display: 'flex',
//     alignItems: 'center'
//   },
//   errorIcon: {
//     marginRight: '0.5rem'
//   },
//   viewToggle: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginBottom: '1.5rem'
//   },
//   viewToggleContainer: {
//     backgroundColor: 'white',
//     borderRadius: '32px',
//     padding: '0.25rem',
//     display: 'inline-flex',
//     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//   },
//   viewToggleButton: {
//     padding: '0.5rem 1rem',
//     borderRadius: '32px',
//     display: 'flex',
//     alignItems: 'center',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '0.875rem',
//     transition: 'background-color 0.2s, color 0.2s'
//   },
//   viewToggleButtonActive: {
//     // backgroundColor: '#3b82f6',
//     backgroundColor:' black',
//     color: 'white'
//   },
//   viewToggleButtonInactive: {
//     backgroundColor: 'white',
//     color: '#374151'
//   },
//   viewToggleButtonInactiveHover: {
//     backgroundColor: '#f3f4f6'
//   },
//   viewToggleIcon: {
//     marginRight: '0.25rem'
//   },
//   // graphContainer: {
//   //   backgroundColor: 'white',
//   //   borderRadius: '8px',
//   //   padding: '1.5rem',
//   //   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//   //   marginBottom: '2rem'
//   // },

//   graphContainer: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     padding: '1.5rem',
//     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//     marginBottom: '2rem',
//     minHeight: '600px',   // initial min height, adjust as needed
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   graphTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     marginBottom: '1rem',
//     textAlign: 'center',
//     color: '#1f2937'
//   },
//   legend: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '1rem',
//     justifyContent: 'center',
//     marginBottom: '1.5rem'
//   },
//   legendItem: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   legendDot: {
//     width: '0.75rem',
//     height: '0.75rem',
//     borderRadius: '50%',
//     marginRight: '0.5rem'
//   },
//   legendText: {
//     fontSize: '0.875rem'
//   },
//   graphCanvas: {
//     width: '100%',
//     height: 'auto',  // allow height to grow with SVG or content
//     minHeight: '600px',  // ensure some initial height
//   },
//   // graphCanvas: {
//   //   width: '100%',
//   //   height: '30rem',
//   //   border: '1px solid #e5e7eb',
//   //   borderRadius: '4px'
//   // },
//   graphTip: {
//     fontSize: '0.875rem',
//     color: '#6b7280',
//     marginTop: '0.5rem',
//     textAlign: 'center'
//   },
//   productDetails: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     padding: '1.5rem',
//     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//     marginBottom: '2rem'
//   },
//   productTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     marginBottom: '1rem',
//     color: '#2563eb'
//   },
//   productDetailsGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr',
//     gap: '1.5rem'
//   },
//   productDetailsGridLg: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '1.5rem'
//   },
//   productInfoBox: {
//     padding: '1.5rem',
//     borderRadius: '8px',
//     boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
//   },
//   productInfoBasic: {
//     backgroundColor: '#eff6ff'
//   },
//   productInfoEndorsers: {
//     backgroundColor: '#f9fafb'
//   },
//   productInfoLeadership: {
//     backgroundColor: '#fff7ed'
//   },
//   productInfoTitle: {
//     fontSize: '1.125rem',
//     fontWeight: '600',
//     marginBottom: '0.75rem'
//   },
//   productInfoTitleBlue: {
//     color: '#1d4ed8'
//   },
//   productInfoTitleGray: {
//     color: '#374151'
//   },
//   productInfoTitleOrange: {
//     color: '#c2410c'
//   },
//   productInfoRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     borderBottom: '1px solid #e5e7eb',
//     paddingBottom: '0.5rem',
//     marginBottom: '0.5rem'
//   },
//   productInfoLabel: {
//     fontWeight: '500'
//   },
//   productInfoValue: {
//     color: '#374151'
//   },
//   productInfoList: {
//     margin: '0',
//     padding: '0',
//     listStyle: 'none',
//     marginTop: '0.5rem'
//   },
//   productInfoListItem: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '0.5rem'
//   },
//   productInfoListDot: {
//     width: '0.5rem',
//     height: '0.5rem',
//     borderRadius: '50%',
//     marginRight: '0.5rem'
//   },
//   dotGray: {
//     backgroundColor: '#9ca3af'
//   },
//   dotPurple: {
//     backgroundColor: '#8b5cf6'
//   },
//   dotRed: {
//     backgroundColor: '#ef4444'
//   },
//   productInfoSection: {
//     marginBottom: '1rem'
//   },
//   productInfoSectionTitle: {
//     fontWeight: '500',
//     marginBottom: '0.5rem'
//   },
//   italic: {
//     fontStyle: 'italic',
//     color: '#6b7280'
//   },
//   searchResultsContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1.5rem'
//   },
//   searchResultsTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     marginBottom: '1rem'
//   },
//   searchResultCard: {
//     backgroundColor: 'white',
//     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     border: '1px solid #e5e7eb'
//   },
//   searchResultCardHeader: {
//     backgroundColor: '#2563eb',
//     color: 'white',
//     padding: '1rem'
//   },
//   searchResultCardTitle: {
//     fontSize: '1.25rem',
//     fontWeight: 'bold',
//     margin: '0'
//   },
//   searchResultCardBody: {
//     padding: '1.5rem'
//   },
//   searchResultCardGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr',
//     gap: '1.5rem'
//   },
//   searchResultCardGridMd: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)',
//     gap: '1.5rem'
//   },
//   searchResultInfoBox: {
//     padding: '1rem',
//     borderRadius: '8px'
//   },
//   searchResultBasic: {
//     backgroundColor: '#eff6ff'
//   },
//   searchResultEndorsers: {
//     backgroundColor: '#f9fafb'
//   },
//   searchResultDirectors: {
//     backgroundColor: '#f5f3ff'
//   },
//   searchResultShareholders: {
//     backgroundColor: '#fef2f2'
//   },
//   searchResultBoxTitle: {
//     fontWeight: '600',
//     marginBottom: '0.5rem'
//   },
//   searchResultBoxTitleBlue: {
//     color: '#1d4ed8'
//   },
//   searchResultBoxTitleGray: {
//     color: '#374151'
//   },
//   searchResultBoxTitlePurple: {
//     color: '#7c3aed'
//   },
//   searchResultBoxTitleRed: {
//     color: '#dc2626'
//   },
//   searchResultLabel: {
//     fontWeight: '500',
//     marginRight: '0.25rem'
//   },
//   searchResultList: {
//     listStyle: 'disc',
//     paddingLeft: '1.5rem',
//     margin: '0'
//   },
//   noResults: {
//     textAlign: 'center',
//     padding: '3rem 0'
//   },
//   noResultsIcon: {
//     display: 'inline-block',
//     padding: '1.5rem',
//     backgroundColor: 'white',
//     borderRadius: '50%',
//     marginBottom: '1rem'
//   },
//   noResultsTitle: {
//     fontSize: '1.25rem',
//     fontWeight: '500',
//     color: '#1f2937',
//     marginBottom: '0.5rem'
//   },
//   noResultsText: {
//     color: '#4b5563'
//   },
//   footer: {
//     backgroundColor: '#1f2937',
//     color: 'white',
//     padding: '1.5rem 1rem',
//     marginTop: '3rem',
//     textAlign: 'center'
//   },
//   footerContainer: {
//     maxWidth: '1200px',
//     margin: '0 auto'
//   },
//   tooltip: {
//     position: 'absolute',
//     padding: '0.5rem',
//     backgroundColor: '#1f2937',
//     color: 'white',
//     fontSize: '0.875rem',
//     borderRadius: '4px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     pointerEvents: 'none',
//     display: 'none'
//   },
//   entitySelectorContainer: {
//     position: 'relative',
//     minWidth: '120px',
//     marginRight: '10px',
//   },
//   entitySelector: {
//     appearance: 'none',
//     backgroundColor: '#f3f4f6',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     color: '#374151',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//     height: '42px',
//     outline: 'none',
//     paddingLeft: '12px',
//     paddingRight: '32px',
//     transition: 'all 0.2s ease',
//     width: '100%',
//   },

//   searchInfo: {
//     color: '#6b7280',
//     fontSize: '14px',
//     marginBottom: '16px',
//     padding: '0 8px',
//   },
//   tooltip: {
//     position: 'absolute',
//     padding: '8px 12px',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     color: '#fff',
//     fontSize: '12px',
//     borderRadius: '4px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//     pointerEvents: 'none',
//     display: 'none'
//   },
//   listViewContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     padding: '2rem',
//   },
//   listViewWrapper: {
//     maxWidth: '800px',
//     width: '100%',
//   },
//   listViewTitle: {
//     fontSize: '2rem',
//     fontWeight: '600',
//     marginBottom: '1.5rem',
//     textAlign: 'center',
//     color: '#1f2937',
//   },
//   listView: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   },
//   listItem: {
//     border: '1px solid #e5e7eb',
//     borderRadius: '0.5rem',
//     padding: '1.5rem',
//     marginBottom: '1rem',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
//     transition: 'transform 0.2s, box-shadow 0.2s',
//     backgroundColor: '#ffffff',
//     cursor: 'pointer',
//   },
//   listItemHover: {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//   },
//   listItemTitle: {
//     fontSize: '1.25rem',
//     fontWeight: '600',
//     marginBottom: '0.75rem',
//     color: '#111827',
//   },
//   label: {
//     fontWeight: '500',
//     color: '#374151',
//     marginRight: '0.25rem',
//   },
// };

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [viewMode, setViewMode] = useState('graph');
//   const [inputFocused, setInputFocused] = useState(false);
//   const [buttonHovered, setButtonHovered] = useState(false);
//   const [entityType, setEntityType] = useState('product');
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [entityData, setEntityData] = useState(null);

//   const graphRef = useRef(null);
//   const simulationRef = useRef(null);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleEntityTypeChange = (e) => {
//     setEntityType(e.target.value);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (!searchTerm.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Use the entity type to determine which API endpoint to call
//       const response = await axios.get(`http://localhost:3001/api/search/${entityType}/${searchTerm}`);

//       // Store the complete response data
//       setEntityData(response.data);

//       // Process different response formats based on entity type
//       if (entityType === 'product') {
//         // Products endpoint directly returns an array of products
//         setSearchResults(response.data);
//         if (response.data.length > 0) {
//           setSelectedProduct(response.data[0]);
//         }
//       }
     

//       else if (entityType === 'brand') {
//         const brandResults = Array.isArray(response.data) ? response.data : [response.data];
      
//         const processedProducts = brandResults.flatMap(brandData => {
//           const { brand, company, products, endorsers, directors, shareholders } = brandData;
      
//           return products.map(product => ({
//             ...product,
//             brand: brand.name,
//             company: company ? company.name : null,
//             endorsers: endorsers?.map(e => e.name) || [],
//             directors: directors?.map(d => d.name) || [],
//             shareholders: shareholders?.map(s => s.name) || []
//           }));
//         });
      
//         setSearchResults(processedProducts);
//         if (processedProducts.length > 0) {
//           setSelectedProduct(processedProducts[0]);
//         }
//       }
      
//       else if (entityType === 'company') {
//         // Company endpoint returns an array of objects
//         const companyArray = response.data;
//         console.log("Company Array:", companyArray);
//         const allProcessedProducts = companyArray.flatMap(companyData =>
//           transformCompanyDataToProducts(companyData)
//         );
//         setSearchResults(allProcessedProducts);
//         if (allProcessedProducts.length > 0) {
//           setSelectedProduct(allProcessedProducts[0]);
//         }

//       } 
//       else if (entityType === 'endorser') {
//         const endorserResults = Array.isArray(response.data) ? response.data : [response.data];
      
//         const processedProducts = endorserResults.flatMap(e => {
//           return e.products.map(p => ({
//             ...p,
//             endorsers: [e.endorser.name],
//             directors: [],
//             shareholders: []
//           }));
//         });
      
//         setSearchResults(processedProducts);
//         if (processedProducts.length > 0) {
//           setSelectedProduct(processedProducts[0]);
//         }
//       }
      
  
//       else if (entityType === 'director') {
//         const directorResults = Array.isArray(response.data) ? response.data : [response.data];
        
//         // `transformDirectorDataToProducts` needs to work with array of directors now
//         // So map over each director object in array and flatten results
//         const processedProducts = directorResults.flatMap(directorData =>
//           transformDirectorDataToProducts(directorData)
//         );
        
//         setSearchResults(processedProducts);
//         if (processedProducts.length > 0) {
//           setSelectedProduct(processedProducts[0]);
//         }
//       }
      
//        else if (entityType === 'shareholder') {
//         // Shareholder endpoint returns { shareholder, companies }
//         const { companies } = response.data;
//         const processedProducts = transformShareholderDataToProducts(response.data);
//         setSearchResults(processedProducts);
//         console.log("hiii",processedProducts)
//         if (processedProducts.length > 0) {
//           setSelectedProduct(processedProducts[0]);
//         }
//       }
//     } catch (err) {
//       console.error(`Error searching for ${entityType}:`, err);
//       setError(err.response?.data?.message || `Error searching for ${entityType}`);
//       setSearchResults([]);
//       setEntityData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to create complete product data from brand response

//   const createProductFromResponse = (product, brandData) => {
//     return {
//       name: product.name,
//       brand: brandData.brand.name,
//       company: brandData.company ? brandData.company.name : null,
//       endorsers: [],
//       directors: [],
//       shareholders: []
//     };
//   };

//   const transformCompanyDataToProducts = (companyData) => {
//     const { company, brands, directors, shareholders } = companyData;

//     // If no brands, create a placeholder product with the company data
//     if (!brands || brands.length === 0) {
//       return [{
//         name: `${company.name}`,
//         brand: null,
//         company: company.name,
//         endorsers: [],
//         directors: directors.map(d => d.name) || [],
//         shareholders: shareholders.map(s => s.name) || []
//       }];
//     }

//     // Otherwise, create product entries for each brand
//     return brands.map(brand => ({
//       name: `${brand.name}`,
//       brand: brand.name,
//       company: company.name,
//       endorsers: [],
//       directors: directors.map(d => d.name) || [],
//       shareholders: shareholders.map(s => s.name) || []
//     }));
//   };


//   const transformDirectorDataToProducts = (directorData) => {
//     console.log('Director Data:', directorData);
//     const { director, companies } = directorData;

//     if (!companies || companies.length === 0) {
//       return [];
//     }

//     // Create product entries for each company the director is associated with
//     return companies.map(company => ({
//       name: `${company.name}`,
//       brand: null,
//       company: company.name,
//       type: 'company', // Add type identifier to mark this as a company
//       endorsers: [],
//       directors: [director.name],
//       shareholders: []
//     }));
//   };
//   const transformShareholderDataToProducts = (shareholderData) => {
//     const { shareholder, companies } = shareholderData;

//     if (!companies || companies.length === 0) {
//       return [];
//     }

//     // Create product entries for each company the shareholder is associated with
//     return companies.map(company => ({
//       brand: null,
//       company: company.name,
//       endorsers: [],
//       directors: [],
//       shareholders: [shareholder.name]
//     }));
//   };




//   const createGraphData = (products) => {
//     const nodes = [];
//     const links = [];
//     const nodeSet = new Set();
  
//     products.forEach(product => {
//       const productGroup = product.type || 'product';
  
//       // Only add product node if it's actually a product and has a name
//       if (productGroup === 'product' && product.name) {
//         if (!nodeSet.has(product.name)) {
//           nodes.push({ id: product.name, label: product.name, group: productGroup });
//           nodeSet.add(product.name);
//         }
//       }
  
//       // Add brand node and link
//       if (product.brand) {
//         if (!nodeSet.has(product.brand)) {
//           nodes.push({ id: product.brand, label: product.brand, group: 'brand' });
//           nodeSet.add(product.brand);
//         }
        
//         // Only create brand-to-product link if we have an actual product with name
//         if (productGroup === 'product' && product.name) {
//           links.push({ source: product.name, target: product.brand, type: 'BRANDED_AS' });
//         }
//       }
  
//       // Add company node
//       if (product.company) {
//         if (!nodeSet.has(product.company)) {
//           nodes.push({ id: product.company, label: product.company, group: 'company' });
//           nodeSet.add(product.company);
//         }
        
//         // Create appropriate links based on what exists
//         if (product.brand && productGroup === 'product' && product.name) {
//           links.push({ source: product.brand, target: product.company, type: 'OWNED_BY' });
//         } else if (productGroup === 'product' && product.name && product.name !== product.company) {
//           links.push({ source: product.name, target: product.company, type: 'MADE_BY' });
//         }
//       }
  
//       // Add endorser nodes and links
//       if (product.endorsers && product.endorsers.length > 0) {
//         product.endorsers.forEach(endorser => {
//           if (!nodeSet.has(endorser)) {
//             nodes.push({ id: endorser, label: endorser, group: 'endorser' });
//             nodeSet.add(endorser);
//           }
          
//           // Connect to product if it exists, otherwise to company
//           const sourceNode = (productGroup === 'product' && product.name) ? product.name : product.company;
//           if (sourceNode) {
//             links.push({ source: sourceNode, target: endorser, type: 'ENDORSED_BY' });
//           }
//         });
//       }
  
//       // Add director nodes and links
//       if (product.directors && product.directors.length > 0) {
//         product.directors.forEach(director => {
//           if (!nodeSet.has(director)) {
//             nodes.push({ id: director, label: director, group: 'director' });
//             nodeSet.add(director);
//           }
          
//           // Directors connect to companies
//           if (product.company) {
//             links.push({ source: product.company, target: director, type: 'HAS_DIRECTOR' });
//           }
//         });
//       }
  
//       // Add shareholder nodes and links
//       if (product.shareholders && product.shareholders.length > 0) {
//         product.shareholders.forEach(shareholder => {
//           if (!nodeSet.has(shareholder)) {
//             nodes.push({ id: shareholder, label: shareholder, group: 'shareholder' });
//             nodeSet.add(shareholder);
//           }
          
//           // Shareholders connect to companies
//           if (product.company) {
//             links.push({ source: product.company, target: shareholder, type: 'HAS_SHAREHOLDER' });
//           }
//         });
//       }
//     });
  
//     return { nodes, links };
//   };
//   useEffect(() => {
//     if (!searchResults.length || !graphRef.current || viewMode !== 'graph') return;
  
//     d3.select(graphRef.current).selectAll("*").remove();
  
//     const data = createGraphData(searchResults);
  
//     const width = graphRef.current.clientWidth;
//     // const height = 600;
//    const height=Math.max(600, data.nodes.length * 60);
//     const color = d3.scaleOrdinal()
//       .domain(['product', 'brand', 'company', 'endorser', 'director', 'shareholder'])
//       .range(['#4299e1', '#48bb78', '#ed8936', '#a0aec0', '#9f7aea', '#f56565']);
  
//     const svg = d3.select(graphRef.current)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height);
  
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
  
//     // Define fixed vertical positions for each group (rows)
//     const groups = ['product', 'brand', 'company', 'endorser', 'director', 'shareholder'];
//     const rowHeight = 80;
//     const groupYPositions = {};
//     groups.forEach((group, i) => {
//       groupYPositions[group] = 50 + i * rowHeight;
//     });
  
//     // Force simulation
//     const simulation = d3.forceSimulation(data.nodes)
//       .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
//       .force("charge", d3.forceManyBody().strength(-600))
//       .force("collide", d3.forceCollide().radius(d => 20 + d.label.length * 4))
//       .force("center", d3.forceCenter(width / 2, height / 2))
//       // Fix vertical position of each node to its group row
//       .force("y", d3.forceY().y(d => groupYPositions[d.group] || height / 2).strength(1))
//       // Allow horizontal movement freely to avoid overlap, but with gentle centering
//       .force("x", d3.forceX(width / 2).strength(0.1));
  
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
//           .html(`<strong>${d.label}</strong><br/><span style="font-size: 12px">${d.group}</span>`)
//           .style("left", (event.pageX + 10) + "px")
//           .style("top", (event.pageY - 28) + "px");
//       })
//       .on("mouseout", () => {
//         tooltip.style("opacity", 0).style("display", "none");
//       })
//       .on("click", (_, d) => {
//         const product = searchResults.find(p =>
//           p.name === d.label ||
//           p.brand === d.label ||
//           p.company === d.label ||
//           (p.endorsers && p.endorsers.includes(d.label)) ||
//           (p.directors && p.directors.includes(d.label)) ||
//           (p.shareholders && p.shareholders.includes(d.label))
//         );
  
//         if (product) {
//           setSelectedProduct(product);
//         }
//       });
  
//     // Create labels below nodes
//     const text = svg.append("g")
//       .selectAll("text")
//       .data(data.nodes)
//       .enter()
//       .append("text")
//       .text(d => d.label)
//       .attr("font-size", 10)
//       .attr("text-anchor", "middle")
//       .attr("dy", 25);
  
//     simulation.on("tick", () => {
//       // Keep nodes inside svg horizontally
//       data.nodes.forEach(d => {
//         d.x = Math.max(20, Math.min(width - 20, d.x));
//       });
  
//       link
//         .attr("x1", d => d.source.x)
//         .attr("y1", d => d.source.y)
//         .attr("x2", d => d.target.x)
//         .attr("y2", d => d.target.y);
  
//       node
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y);
  
//       text
//         .attr("x", d => d.x)
//         .attr("y", d => d.y);
//     });
  
//     simulation.tick(100);
  
//     simulationRef.current = simulation;
  
//     return () => {
//       if (simulationRef.current) simulationRef.current.stop();
//       d3.select("body").selectAll("div.tooltip").remove();
//     };
//   }, [searchResults, viewMode]);
  
  
  
//   const getSearchInfoText = () => {
//     if (searchResults.length === 0) return "";

//     const count = searchResults.length;
//     const resultText = count === 1 ? 'result' : 'results';

//     if (entityType === 'product') {
//       return `Showing ${count} ${resultText}`;
//     } else {
//       // Display the name from the entity data based on entity type
//       const entityName = entityData ? (
//         entityType === 'brand' ? entityData.brand?.name :
//           entityType === 'company' ? entityData.company?.name :
//             entityType === 'endorser' ? entityData.endorser?.name :
//               entityType === 'director' ? entityData.director?.name :
//                 entityType === 'shareholder' ? entityData.shareholder?.name :
//                   searchTerm
//       ) : searchTerm;

//       return `Showing ${count} ${resultText} connected to ${entityType}: ${entityName}`;
//     }
//   };

//   // Legend for graph node colors
//   const renderLegend = () => (
//     <div style={styles.legend}>
//       <div style={styles.legendItem}>
//         <div style={{ ...styles.legendDot, backgroundColor: '#4299e1' }}></div>
//         <span style={styles.legendText}>Product</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{ ...styles.legendDot, backgroundColor: '#48bb78' }}></div>
//         <span style={styles.legendText}>Brand</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{ ...styles.legendDot, backgroundColor: '#ed8936' }}></div>
//         <span style={styles.legendText}>Company</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{ ...styles.legendDot, backgroundColor: '#a0aec0' }}></div>
//         <span style={styles.legendText}>Endorser</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{ ...styles.legendDot, backgroundColor: '#9f7aea' }}></div>
//         <span style={styles.legendText}>Director</span>
//       </div>
//       <div style={styles.legendItem}>
//         <div style={{ ...styles.legendDot, backgroundColor: '#f56565' }}></div>
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
//         <div style={styles.searchBox}>
//           <form onSubmit={handleSearch} style={styles.searchForm}>
//             <div style={styles.entitySelectorContainer}>
//               <select
//                 value={entityType}
//                 onChange={handleEntityTypeChange}
//                 style={styles.entitySelector}
//               >
//                 <option value="product">Product</option>
//                 <option value="brand">Brand</option>
//                 <option value="company">Company</option>
//                 <option value="endorser">Endorser</option>
//                 <option value="director">Director</option>
//                 <option value="shareholder">Shareholder</option>
//               </select>
//             </div>

//             <div style={styles.searchInputContainer}>
//               <div style={styles.searchIconContainer}>
//                 <Search size={18} style={styles.searchIcon} />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder={`Search for a ${entityType}...`}
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

//         {/* Search Results Info - Updated to show correct entity info */}
//         {searchResults.length > 0 && (
//           <div style={styles.searchInfo}>
//             <p>{getSearchInfoText()}</p>
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
//                 List View
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

//         {/* Search Results - List View */}
//         {searchResults.length > 0 && viewMode === 'cards' && (
//           <div style={styles.listViewContainer}>
//             <div style={styles.listViewWrapper}>
//               <h2 style={styles.listViewTitle}>Search Results</h2>
//               <ul style={styles.listView}>
//                 {searchResults.map((product, index) => (
//                   <li
//                     key={index}
//                     style={{
//                       ...styles.listItem,
//                       ...(hoveredIndex === index ? styles.listItemHover : {})
//                     }}
//                     onMouseEnter={() => setHoveredIndex(index)}
//                     onMouseLeave={() => setHoveredIndex(null)}
//                   >
//                     <h3 style={styles.listItemTitle}>{product.name}</h3>
//                     <p><span style={styles.label}>Brand:</span> {product.brand || 'N/A'}</p>
//                     <p><span style={styles.label}>Company:</span> {product.company || 'N/A'}</p>
//                     <p><span style={styles.label}>Endorsers:</span> {product.endorsers?.join(', ') || 'None'}</p>
//                     <p><span style={styles.label}>Directors:</span> {product.directors?.join(', ') || 'None'}</p>
//                     <p><span style={styles.label}>Shareholders:</span> {product.shareholders?.join(', ') || 'None'}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* No Results */}
//         {!isLoading && searchTerm && !error && searchResults.length === 0 && (
//           <div style={styles.noResults}>
//             <div style={styles.noResultsIcon}>
//               <Search size={48} style={{ color: '#9ca3af' }} />
//             </div>
//             <h3 style={styles.noResultsTitle}>No results found</h3>
//             <p style={styles.noResultsText}>Try searching for a different {entityType}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;








//image upload strating






import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Network, X, Upload, Image as ImageIcon, Camera } from 'lucide-react';
import * as d3 from 'd3';

const styles = {
  app: {
    backgroundColor: '#f5f5f7',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background:'black',
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
    marginBottom: '2rem',
    border: '1px solid black',
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInputContainer: {
    position: 'relative',
    flexGrow: 1,
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
    width: '97%',
    padding: '0.75rem 0.5rem 0.65rem 1.3rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px 0 0 8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  searchInputFocus: {},
  searchButton: {
    backgroundColor: 'black',
    color: 'white',
    padding: '0.75rem 2.0rem',
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
    backgroundColor: 'black'
  },
  searchButtonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed'
  },
  
  // Image Upload Styles
  imageUploadSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    border: '1px solid #e5e7eb',
  },
  imageUploadTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1f2937',
    textAlign: 'center',
  },
  // imageUploadContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   gap: '3rem',
  // },
  imageUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3rem',
    width: '60%', // You can adjust this value as needed
    margin: '0 auto', // Center the container horizontally
  },
  
  imageDropZone: {
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#f9fafb',
  },
  imageDropZoneActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  imageDropZoneHover: {
    borderColor: '#6b7280',
    backgroundColor: '#f3f4f6',
  },
  uploadIconContainer: {
    marginBottom: '2rem',
  },
  
  uploadText: {
    color: '#374151',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  uploadSubtext: {
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  hiddenFileInput: {
    display: 'none',
  },
  imagePreviewContainer: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  imagePreview: {
    maxWidth: '300px',
    maxHeight: '200px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  imagePreviewActions: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  actionButton: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  analyzeButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  analyzeButtonHover: {
    backgroundColor: '#2563eb',
  },
  analyzeButtonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed',
  },
  removeButton: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  removeButtonHover: {
    backgroundColor: '#dc2626',
  },
  extractedDataContainer: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #0ea5e9',
    borderRadius: '8px',
    padding: '1rem',
    marginTop: '1rem',
  },
  extractedDataTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: '0.5rem',
  },
  extractedDataList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  extractedDataItem: {
    backgroundColor: 'white',
    border: '1px solid #e0f2fe',
    borderRadius: '6px',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extractedDataText: {
    color: '#374151',
    fontSize: '0.875rem',
  },
  searchExtractedButton: {
    backgroundColor: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  searchExtractedButtonHover: {
    backgroundColor: '#047857',
  },
  processingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '6px',
    marginTop: '1rem',
  },
  processingText: {
    color: '#92400e',
    fontSize: '0.875rem',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid #f59e0b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
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
    backgroundColor:' black',
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
    marginBottom: '2rem',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
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
    height: 'auto',
    minHeight: '600px',
  },
  graphTip: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.5rem',
    textAlign: 'center'
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
};

// Add CSS keyframes for spinner animation
const spinnerKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('graph');
  const [inputFocused, setInputFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [entityType, setEntityType] = useState('product');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [entityData, setEntityData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const graphRef = useRef(null);
  const simulationRef = useRef(null);
  const fileInputRef = useRef(null);

  // Add the spinner CSS to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = spinnerKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEntityTypeChange = (e) => {
    setEntityType(e.target.value);
    // Reset search state when entity type changes
    if (!['product', 'brand'].includes(e.target.value)) {
      setSearchResults([]);
      setEntityData(null);
      setSelectedProduct(null);
      setHasSearched(false);
    }
  };

  // Image upload handlers
  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setExtractedData([]);
      setError(null);
    } else {
      setError('Please upload a valid image file (PNG, JPG, GIF, etc.)');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setExtractedData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

 



  const analyzeImage = async () => {
    if (!uploadedImage) return;
  
    setIsAnalyzing(true);
    setError(null);
  
    try {
      const formData = new FormData();
      formData.append('image', uploadedImage);
      
      const response = await axios.post('http://localhost:7000/api/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        // Use correctedBrands (this should work with your response)
        const brands = response.data.correctedBrands || [];
        setExtractedData(brands);
        
        // Set the first brand as search term and automatically search
        if (brands.length > 0) {
          const firstBrand = brands[0]; // This will be "head&shoulders"
          setSearchTerm(firstBrand);
          setEntityType('product');
          
          // Automatically trigger search without showing extracted data
          await handleSearchWithTerm(firstBrand, 'product');
        } else {
          setError('Product not detected in the image. Please try with a different image.');
        }
      } else {
        setError('Failed to analyze image. Please try again.');
      }
  
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError(err.response?.data?.error || 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };


  const searchExtractedItem = (item) => {
    setSearchTerm(item);
    setEntityType('product'); // Default to product for extracted items
    // Trigger search
    handleSearchWithTerm(item, 'product');
  };

  const handleSearchWithTerm = async (term, type = entityType) => {
    if (!term.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true); // Mark that a search has been performed

    try {
      const response = await axios.get(`http://localhost:7000/api/search/${type}/${term}`);
      setEntityData(response.data);

      if (type === 'product') {
        setSearchResults(response.data);
        if (response.data.length > 0) {
          setSelectedProduct(response.data[0]);
        }
      } else if (type === 'brand') {
        const brandResults = Array.isArray(response.data) ? response.data : [response.data];
        const processedProducts = brandResults.flatMap(brandData => {
          const { brand, company, products, endorsers, directors, shareholders } = brandData;
          return products.map(product => ({
            ...product,
            brand: brand.name,
            company: company ? company.name : null,
            endorsers: endorsers?.map(e => e.name) || [],
            directors: directors?.map(d => d.name) || [],
            shareholders: shareholders?.map(s => s.name) || []
          }));
        });
        setSearchResults(processedProducts);
        if (processedProducts.length > 0) {
          setSelectedProduct(processedProducts[0]);
        }
      } else if (type === 'company') {
        const companyArray = response.data;
        const allProcessedProducts = companyArray.flatMap(companyData =>
          transformCompanyDataToProducts(companyData)
        );
        setSearchResults(allProcessedProducts);
        if (allProcessedProducts.length > 0) {
          setSelectedProduct(allProcessedProducts[0]);
        }
      } else if (type === 'endorser') {
        const endorserResults = Array.isArray(response.data) ? response.data : [response.data];
        const processedProducts = endorserResults.flatMap(e => {
          return e.products.map(p => ({
            ...p,
            endorsers: [e.endorser.name],
            directors: [],
            shareholders: []
          }));
        });
        setSearchResults(processedProducts);
        if (processedProducts.length > 0) {
          setSelectedProduct(processedProducts[0]);
        }
      } else if (type === 'director') {
        const directorResults = Array.isArray(response.data) ? response.data : [response.data];
        const processedProducts = directorResults.flatMap(directorData =>
          transformDirectorDataToProducts(directorData)
        );
        setSearchResults(processedProducts);
        if (processedProducts.length > 0) {
          setSelectedProduct(processedProducts[0]);
        }
      } 
        else if (type === 'shareholder') {
          // response.data is an array of shareholder objects
          const shareholderResults = Array.isArray(response.data) ? response.data : [response.data];
          const processedProducts = shareholderResults.flatMap(shareholderData =>
            transformShareholderDataToProducts(shareholderData)
          );
          setSearchResults(processedProducts);
          if (processedProducts.length > 0) {
            setSelectedProduct(processedProducts[0]);
          }
        }
    } catch (err) {
      console.error(`Error searching for ${type}:`, err);
      setError(err.response?.data?.message || `Error searching for ${type}`);
      setSearchResults([]);
      setEntityData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await handleSearchWithTerm(searchTerm, entityType);
  };

  // Helper functions (keeping existing ones)
  const createProductFromResponse = (product, brandData) => {
    return {
      name: product.name,
      brand: brandData.brand.name,
      company: brandData.company ? brandData.company.name : null,
      endorsers: [],
      directors: [],
      shareholders: []
    };
  };

  const transformCompanyDataToProducts = (companyData) => {
    const { company, brands, directors, shareholders } = companyData;

    if (!brands || brands.length === 0) {
      return [{
        name: `${company.name}`,
        brand: null,
        company: company.name,
        endorsers: [],
        directors: directors.map(d => d.name) || [],
        shareholders: shareholders.map(s => s.name) || []
      }];
    }

    return brands.map(brand => ({
      name: `${brand.name}`,
      brand: brand.name,
      company: company.name,
      endorsers: [],
      directors: directors.map(d => d.name) || [],
      shareholders: shareholders.map(s => s.name) || []
    }));
  };

  const transformDirectorDataToProducts = (directorData) => {
    const { director, companies } = directorData;

    if (!companies || companies.length === 0) {
      return [];
    }

    return companies.map(company => ({
      name: `${company.name}`,
      brand: null,
      company: company.name,
      type: 'company',
      endorsers: [],
      directors: [director.name],
      shareholders: []
    }));
  };

  // const transformShareholderDataToProducts = (shareholderData) => {
  //   const { shareholder, companies } = shareholderData;

  //   if (!companies || companies.length === 0) {
  //     return [];
  //   }

  //   return companies.map(company => ({
  //     brand: null,
  //     company: company.name,
  //     endorsers: [],
  //     directors: [],
  //     shareholders: [shareholder.name]
  //   }));
  // };

  const transformShareholderDataToProducts = (shareholderData) => {
    const { shareholder, companies } = shareholderData;
  
    if (!companies || companies.length === 0) {
      return [];
    }
  
    return companies.map(company => ({
      name: company.name, // Add the name property
      brand: company.brand || null, // Include brand if available
      company: company.name,
      endorsers: [],
      directors: [],
      shareholders: [shareholder.name]
    }));
  };



  const createGraphData = (products) => {
    const nodes = [];
    const links = [];
    const nodeSet = new Set();
  
    products.forEach(product => {
      const productGroup = product.type || 'product';
  
      if (productGroup === 'product' && product.name) {
        if (!nodeSet.has(product.name)) {
          nodes.push({ id: product.name, label: product.name, group: productGroup });
          nodeSet.add(product.name);
        }
      }
  
      if (product.brand) {
        if (!nodeSet.has(product.brand)) {
          nodes.push({ id: product.brand, label: product.brand, group: 'brand' });
          nodeSet.add(product.brand);
        }
        
        if (productGroup === 'product' && product.name) {
          links.push({ source: product.name, target: product.brand, type: 'BRANDED_AS' });
        }
      }
  
      if (product.company) {
        if (!nodeSet.has(product.company)) {
          nodes.push({ id: product.company, label: product.company, group: 'company' });
          nodeSet.add(product.company);
        }
        if (product.brand && productGroup === 'product' && product.name) {
          links.push({ source: product.brand, target: product.company, type: 'OWNED_BY' });
        } else if (productGroup === 'product' && product.name && product.name !== product.company) {
          links.push({ source: product.name, target: product.company, type: 'MADE_BY' });
        }
      }
  
      if (product.endorsers && product.endorsers.length > 0) {
        product.endorsers.forEach(endorser => {
          if (!nodeSet.has(endorser)) {
            nodes.push({ id: endorser, label: endorser, group: 'endorser' });
            nodeSet.add(endorser);
          }
          
          const sourceNode = (productGroup === 'product' && product.name) ? product.name : product.company;
          if (sourceNode) {
            links.push({ source: sourceNode, target: endorser, type: 'ENDORSED_BY' });
          }
        });
      }
  
      if (product.directors && product.directors.length > 0) {
        product.directors.forEach(director => {
          if (!nodeSet.has(director)) {
            nodes.push({ id: director, label: director, group: 'director' });
            nodeSet.add(director);
          }
          
          if (product.company) {
            links.push({ source: product.company, target: director, type: 'HAS_DIRECTOR' });
          }
        });
      }
  
      if (product.shareholders && product.shareholders.length > 0) {
        product.shareholders.forEach(shareholder => {
          if (!nodeSet.has(shareholder)) {
            nodes.push({ id: shareholder, label: shareholder, group: 'shareholder' });
            nodeSet.add(shareholder);
          }
          
          if (product.company) {
            links.push({ source: product.company, target: shareholder, type: 'HAS_SHAREHOLDER' });
          }
        });
      }
    });
  
    return { nodes, links };
  };

  // Graph visualization effect (keeping existing one)
  useEffect(() => {
    if (!searchResults.length || !graphRef.current || viewMode !== 'graph') return;
  
    d3.select(graphRef.current).selectAll("*").remove();
  
    const data = createGraphData(searchResults);
  
    const width = graphRef.current.clientWidth;
    const height = Math.max(600, data.nodes.length * 60);
    const color = d3.scaleOrdinal()
      .domain(['product', 'brand', 'company', 'endorser', 'director', 'shareholder'])
      .range(['#4299e1', '#48bb78', '#ed8936', '#a0aec0', '#9f7aea', '#f56565']);
  
    const svg = d3.select(graphRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
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
  
    // Define fixed vertical positions for each group (rows)
    const groups = ['product', 'brand', 'company', 'endorser', 'director', 'shareholder'];
    const rowHeight = 80;
    const groupYPositions = {};
    groups.forEach((group, i) => {
      groupYPositions[group] = 50 + i * rowHeight;
    });
    // Force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-600))
      .force("collide", d3.forceCollide().radius(d => 20 + d.label.length * 4))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("y", d3.forceY().y(d => groupYPositions[d.group] || height / 2).strength(1))
      .force("x", d3.forceX(width / 2).strength(0.1));
  
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
          .html(`<strong>${d.label}</strong><br/><span style="font-size: 12px">${d.group}</span>`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0).style("display", "none");
      })
      .on("click", (_, d) => {
        const product = searchResults.find(p =>
          p.name === d.label ||
          p.brand === d.label ||
          p.company === d.label ||
          (p.endorsers && p.endorsers.includes(d.label)) ||
          (p.directors && p.directors.includes(d.label)) ||
          (p.shareholders && p.shareholders.includes(d.label))
        );
  
        if (product) {
          setSelectedProduct(product);
        }
      });
  
    // Create labels below nodes
    const text = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text(d => d.label)
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("dy", 25);
  
    simulation.on("tick", () => {
      data.nodes.forEach(d => {
        d.x = Math.max(20, Math.min(width - 20, d.x));
      });
  
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
  
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  
      text
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
  
    simulation.tick(100);
  
    simulationRef.current = simulation;
  
    return () => {
      if (simulationRef.current) simulationRef.current.stop();
      d3.select("body").selectAll("div.tooltip").remove();
    };
  }, [searchResults, viewMode]);
  
  const getSearchInfoText = () => {
    if (searchResults.length === 0) return "";

    const count = searchResults.length;
    const resultText = count === 1 ? 'result' : 'results';

    if (entityType === 'product') {
      return `Showing ${count} ${resultText}`;
    } else {
      const entityName = entityData ? (
        entityType === 'brand' ? entityData.brand?.name :
          entityType === 'company' ? entityData.company?.name :
            entityType === 'endorser' ? entityData.endorser?.name :
              entityType === 'director' ? entityData.director?.name :
                entityType === 'shareholder' ? entityData.shareholder?.name :
                  searchTerm
      ) : searchTerm;

      return `Showing ${count} ${resultText} connected to ${entityType}: ${entityName}`;
    }
  };

  // Function to check if image upload should be shown
  const shouldShowImageUpload = () => {
    return ['product', 'brand'].includes(entityType) && !hasSearched;
  };
  const renderLegend = () => (
    <div style={styles.legend}>
      <div style={styles.legendItem}>
        <div style={{ ...styles.legendDot, backgroundColor: '#4299e1' }}></div>
        <span style={styles.legendText}>Product</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{ ...styles.legendDot, backgroundColor: '#48bb78' }}></div>
        <span style={styles.legendText}>Brand</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{ ...styles.legendDot, backgroundColor: '#ed8936' }}></div>
        <span style={styles.legendText}>Company</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{ ...styles.legendDot, backgroundColor: '#a0aec0' }}></div>
        <span style={styles.legendText}>Endorser</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{ ...styles.legendDot, backgroundColor: '#9f7aea' }}></div>
        <span style={styles.legendText}>Director</span>
      </div>
      <div style={styles.legendItem}>
        <div style={{ ...styles.legendDot, backgroundColor: '#f56565' }}></div>
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
      

        {/* Search Box */}
        <div style={styles.searchBox}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
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
                {/* <Search size={18} style={styles.searchIcon} /> */}
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={`Search for a ${entityType}`}
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

          {/* Image Upload Section - Only show for product/brand and before search */}
          {shouldShowImageUpload() && (
          <div style={styles.imageUploadSection}>
          <h2 style={styles.imageUploadTitle}>
            <ImageIcon size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Upload Product Image
          </h2>
          
          <div style={styles.imageUploadContainer}>
            {!imagePreview ? (
              <div
                style={{
                  ...styles.imageDropZone,
                  ...(isDragOver ? styles.imageDropZoneActive : {}),
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div style={styles.uploadIconContainer}>
                  <Upload size={48} color="#6b7280" />
                </div>
                <p style={styles.uploadText}>
                  Drag and drop an image here, or click to browse
                </p>
                <p style={styles.uploadSubtext}>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div style={styles.imagePreviewContainer}>
                <img
                  src={imagePreview}
                  alt="Uploaded product"
                  style={styles.imagePreview}
                />
                <div style={styles.imagePreviewActions}>
                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    style={{
                      ...styles.actionButton,
                      ...styles.analyzeButton,
                      ...(isAnalyzing ? styles.analyzeButtonDisabled : {})
                    }}
                  >
                    {isAnalyzing ? (
                      <>
                        <div style={styles.spinner}></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera size={16} style={{ marginRight: '0.5rem' }} />
                        Analyze Image
                      </>
                    )}
                  </button>
                  <button
                    onClick={removeImage}
                    style={{
                      ...styles.actionButton,
                      ...styles.removeButton
                    }}
                  >
                    <X size={16} style={{ marginRight: '0.5rem' }} />
                    Remove
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              style={styles.hiddenFileInput}
            />
          </div>

          {/* Processing Indicator */}
          {isAnalyzing && (
            <div style={styles.processingIndicator}>
              <div style={styles.spinner}></div>
              <span style={styles.processingText}>
                Analyzing image for product information...
              </span>
            </div>
          )}


        </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage}>
            <X size={20} style={styles.errorIcon} />
            <p>{error}</p>
          </div>
        )}

        {/* Search Results Info */}
        {searchResults.length > 0 && (
          <div style={styles.searchInfo}>
            <p>{getSearchInfoText()}</p>
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

        {/* Search Results - List View */}
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
              <Search size={48} style={{ color: '#9ca3af' }} />
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

