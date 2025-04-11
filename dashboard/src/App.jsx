import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ViewBooks from './pages/Viewbooks';
import AddBooks from './pages/Addbooks';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#d14959',
    },
    secondary: {
      main: '#333333',
    },
    background: {
      default: '#f8f8f8',
    },
    text: {
      primary: '#000000',
    },
  },
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ViewBooks />} />
          <Route path="/addbooks" element={<AddBooks />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
