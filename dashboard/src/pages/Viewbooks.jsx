/**
 * ViewBooks Component
 * 
 * This component displays a list of all books from the server.
 * It fetches data when loaded and shows it in a table.
 */

import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function ViewBooks() {
  // ===== STATE VARIABLES =====
  // Books data from the server
  const [books, setBooks] = useState([]);
  // Loading state to show spinner while fetching data
  const [loading, setLoading] = useState(true);
  // Error message if something goes wrong
  const [error, setError] = useState(null);
  
  // ===== CONSTANTS =====
  // API URL to fetch books from
  const apiUrl = useRef('http://localhost:1337/books');
  
  // ===== EFFECTS =====
  // This effect runs once when the component is first loaded
  useEffect(() => {
    // Load books from server when component mounts
    fetchBooks();
  }, []); // Empty dependency array means this runs once on mount
  
  // ===== FUNCTIONS =====
  /**
   * Fetches books from the API and updates state
   */
  const fetchBooks = async () => {
    try {
      // Set loading to true while we fetch data
      setLoading(true);
      
      // Fetch data from the API
      const response = await fetch(apiUrl.current);
      
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      
      // Make sure books data is always an array
      if (Array.isArray(data)) {
        // If data is already an array, use it directly
        setBooks(data);
      } else if (data && typeof data === 'object') {
        // If data is an object, check if it has a books property
        if (Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          // If no books property, use empty array
          setBooks([]);
        }
      } else {
        // Default to empty array for any other case
        setBooks([]);
      }
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      // Handle errors
      
      // Special handling for network errors
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please make sure the server is running.');
      } else {
        // General error message
        setError('Error fetching books: ' + err.message);
      }
      
      console.error('Error fetching books:', err);
      
      // Reset books to empty array on error
      setBooks([]);
    } finally {
      // Always stop loading when done, whether successful or not
      setLoading(false);
    }
  };

  // ===== COMPONENT RENDER =====
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      {/* Navigation bar at the top */}
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page title */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold', 
            color: '#000000',
            pb: 1,
            borderBottom: '2px solid #d14959'
          }}
        >
          Library Books
        </Typography>
        
        {/* Show error message if there was an error */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}
        
        {/* 
          Conditional rendering based on state:
          1. Show loading spinner if data is loading
          2. Show "no books" message if no books found
          3. Show table of books if books exist
        */}
        {loading ? (
          // LOADING STATE: Show spinner while loading
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="error" />
          </Box>
        ) : books.length === 0 ? (
          // EMPTY STATE: No books found
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              bgcolor: 'white',
              borderRadius: 2
            }}
          >
            <InfoIcon sx={{ fontSize: 48, color: '#d14959', mb: 2 }} />
            <Typography variant="h6">
              No books available. Add some books to get started!
            </Typography>
          </Paper>
        ) : (
          // DATA STATE: Books found, show in table
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="library books table">
              {/* Table header */}
              <TableHead sx={{ bgcolor: '#f1f1f1' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Book ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Publication Year</TableCell>
                </TableRow>
              </TableHead>
              
              {/* Table body with book data */}
              <TableBody>
                {Array.isArray(books) && books.length > 0 ? (
                  // Map each book to a table row
                  books.map(book => (
                    <TableRow 
                      key={book.bookId}
                      sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}
                    >
                      <TableCell>{book.bookId}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.publicationYear}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Fallback row if books array is empty
                  <TableRow>
                    <TableCell 
                      colSpan={4} 
                      align="center"
                      sx={{ py: 3, fontStyle: 'italic', color: '#666' }}
                    >
                      No books to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}

export default ViewBooks;
