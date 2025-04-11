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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // References
  const apiUrl = useRef('http://localhost:1337/books');
  
  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);
  
  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl.current);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure books is always an array
      if (Array.isArray(data)) {
        setBooks(data);
      } else if (data && typeof data === 'object') {
        // If the response is an object but not an array, check if it has books property
        if (Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          // If it's an object without books property, convert to array if possible
          setBooks([]);
        }
      } else {
        // Default to empty array for any other case
        setBooks([]);
      }
      
      setError(null);
    } catch (err) {
      // Detect network errors specifically
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please make sure the server is running.');
      } else {
        setError('Error fetching books: ' + err.message);
      }
      console.error('Error fetching books:', err);
      // Ensure books is an empty array on error
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="error" />
          </Box>
        ) : books.length === 0 ? (
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
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="library books table">
              <TableHead sx={{ bgcolor: '#f1f1f1' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Book ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Publication Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(books) && books.length > 0 ? (
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
