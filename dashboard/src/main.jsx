/**
 * Main entry point for the React application
 * 
 * This file initializes the React application and mounts it to the DOM.
 * It's the starting point that loads when the application runs.
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Import global CSS
import App from './App.jsx'  // Import the main App component

// Create a React root container at the 'root' element in index.html
// This is where our entire application will be mounted
createRoot(document.getElementById('root')).render(
  // React.StrictMode helps catch bugs by doing extra checks during development
  <React.StrictMode>
    <App />  {/* Render our main App component */}
  </React.StrictMode>,
)
