/**
 * AddBooks Component
 * 
 * This component provides a form to add new books to the library system.
 * It handles form input, validation, and API communication.
 */

import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
  Stack,
  useTheme
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddBooks() {
  // Get theme for consistent styling
  const theme = useTheme();
  
  // ===== STATE VARIABLES =====
  // Form data for the new book
  const [bookData, setBookData] = useState({
    bookId: '',
    title: '',
    author: '',
    publicationYear: ''
  });
  
  // Messages to display to the user
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // ===== REFS =====
  // Reference to the form element (for focusing inputs)
  const formRef = useRef(null);
  // API endpoint for adding books (using the new beginner-friendly endpoint)
  const apiUrl = useRef('http://localhost:1337/bookAdd');

  // ===== EFFECTS =====
  // Check if server is running when component loads
  useEffect(() => {
    const checkServer = async () => {
      try {
        // Try to connect to the server
        const response = await fetch('http://localhost:1337');
        if (!response.ok) {
          setErrorMessage('Server is not responding correctly. Check server status.');
        }
      } catch {
        // Handle connection errors
        setErrorMessage('Cannot connect to server. Please make sure the server is running.');
      }
    };
    
    // Run the server check
    checkServer();
  }, []); // Empty array means this only runs once when component mounts

  // ===== EVENT HANDLERS =====
  /**
   * Handle changes to any form input
   * @param {Object} e - The input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the form data state with the new value
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission to add a new book
   * @param {Object} e - The form submit event
   */
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    
    // Clear any existing messages
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // Send the book data to the server
      const response = await fetch(apiUrl.current, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      // Check if the request was successful
      if (!response.ok) {   
        try {
          // Try to get detailed error from response
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to add book: ${response.status}`);
        } catch {     
          // Fallback error message if can't parse response
          throw new Error(`Server error (${response.status}). Make sure the server is running.`);
        }
      }
      
      // Get the response data (we don't use it but need to await it)
      await response.json();
      
      // Show success message
      setSuccessMessage('Book added successfully!');
      
      // Reset the form to empty values
      setBookData({
        bookId: '',
        title: '',
        author: '',
        publicationYear: ''
      });
      
      // Focus the first input field for adding another book
      if (formRef.current) {
        const firstInput = formRef.current.querySelector('input');
        if (firstInput) firstInput.focus();
      }
      
      // Auto-hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      // Handle errors
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setErrorMessage('Cannot connect to server. Please make sure the server is running.');
      } else {
        setErrorMessage(err.message);
      }
      console.error('Error adding book:', err);
    }
  };

  // ===== COMPONENT RENDER =====
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* Navigation bar at the top */}
      <Navbar />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Page title */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold', 
            color: theme.palette.text.primary,
            pb: 1,
            borderBottom: `2px solid ${theme.palette.primary.main}`
          }}
        >
          Add New Book
        </Typography>
        
        {/* Success message popup */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" variant="filled">
            {successMessage}
          </Alert>
        </Snackbar>
        
        {/* Error message display */}
        {errorMessage && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setErrorMessage('')}
          >
            {errorMessage}
          </Alert>
        )}
        
        {/* Book entry form */}
        <Paper 
          component="form" 
          onSubmit={handleSubmit} 
          ref={formRef}
          elevation={2}
          sx={{ 
            p: 4, 
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Stack spacing={3}>
            {/* Book ID field */}
            <TextField
              fullWidth
              id="bookId"
              name="bookId"
              label="Book ID"
              variant="outlined"
              value={bookData.bookId}
              onChange={handleChange}
              required
            />
            
            {/* Book Title field */}
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              value={bookData.title}
              onChange={handleChange}
              required
            />
            
            {/* Book Author field */}
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Author"
              variant="outlined"
              value={bookData.author}
              onChange={handleChange}
              required
            />
            
            {/* Book Publication Year field */}
            <TextField
              fullWidth
              id="publicationYear"
              name="publicationYear"
              label="Publication Year"
              variant="outlined"
              type="number"
              value={bookData.publicationYear}
              onChange={handleChange}
              required
            />
            
            {/* Submit button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<AddCircleIcon />}
              sx={{
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              Add Book
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddBooks;
