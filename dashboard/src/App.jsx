/**
 * Main App Component
 * 
 * This is the root component of our application.
 * It sets up routing and the material-ui theme.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ViewBooks from './pages/Viewbooks';
import AddBooks from './pages/Addbooks';
import theme from './theme';

/**
 * App Component - The main application component
 * 
 * Sets up the theme provider and routing for the application
 */
function App() {
  return (
    // Apply the Material-UI theme to all components
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalizes browser styles */}
      <CssBaseline />
      
      {/* Router enables navigation between pages */}
      <Router>
        <Routes>
          {/* Route for the home page (ViewBooks) */}
          <Route path="/" element={<ViewBooks />} />
          
          {/* Route for adding new books */}
          <Route path="/addbooks" element={<AddBooks />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
