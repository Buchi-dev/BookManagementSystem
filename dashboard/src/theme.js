/**
 * Application Theme Configuration
 * 
 * This file defines the global theme used throughout the application.
 * It includes colors, typography, and component styles.
 */

import { createTheme } from '@mui/material';

// Main colors used in the application
const colors = {
  primary: '#d14959',     // Reddish color - main brand color
  primaryDark: '#c13949', // Darker version for hover states
  secondary: '#333333',   // Dark gray - secondary color
  background: '#f8f8f8',  // Light gray - background color
  textPrimary: '#000000', // Black - primary text color
  textSecondary: '#666666', // Gray - secondary text color
  border: '#ddd',         // Light gray - border color
};

// Create and export the theme
const theme = createTheme({
  // Color palette
  palette: {
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
      paper: '#ffffff',
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  
  // Typography settings
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  
  // Component-specific style overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.border,
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: colors.primary,
          },
        },
      },
    },
  },
});

export default theme;
export { colors }; 