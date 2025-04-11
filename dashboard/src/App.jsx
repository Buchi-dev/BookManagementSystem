/**
 * Main App Component
 * 
 * This is the root component of our application.
 * It sets up routing and the material-ui theme.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ViewBooks from './pages/Viewbooks';
import AddBooks from './pages/Addbooks';

// ===== THEME CONFIGURATION =====
/**
 * Create a custom theme for the application
 * This defines colors, typography, and component styles
 */
const theme = createTheme({
  // Color palette
  palette: {
    // Primary color - used for buttons, links, etc.
    primary: {
      main: '#d14959', // Reddish color
    },
    // Secondary color - used for secondary elements
    secondary: {
      main: '#333333', // Dark gray
    },
    // Background color for the app
    background: {
      default: '#f8f8f8', // Light gray background
    },
    // Text colors
    text: {
      primary: '#000000', // Black text
    },
  },
  // Typography settings
  typography: {
    fontFamily: '"Poppins", sans-serif', // Main font
    // Make headings bold
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    // Button text styles
    button: {
      textTransform: 'none', // Don't force uppercase for buttons
      fontWeight: 500,
    },
  },
  // Component-specific style overrides
  components: {
    // Button styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Slightly rounded buttons
        },
      },
    },
    // Paper/Card styles
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // More rounded cards
        },
      },
    },
  },
});

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
