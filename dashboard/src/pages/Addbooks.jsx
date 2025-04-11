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
  Stack
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddBooks() {
  const [bookData, setBookData] = useState({
    bookId: '',
    title: '',
    author: '',
    publicationYear: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);
  const apiUrl = useRef('http://localhost:1337/books');

  // Check if server is available
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:1337');
        if (!response.ok) {
          setErrorMessage('Server is not responding correctly. Check server status.');
        }
      } catch {
        setErrorMessage('Cannot connect to server. Please make sure the server is running.');
      }
    };
    
    checkServer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      const response = await fetch(apiUrl.current, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {   
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to add book: ${response.status}`);
        } catch {     
          throw new Error(`Server error (${response.status}). Make sure the server is running.`);
        }
      }
      
      await response.json(); // Process response but don't store it
      
      setSuccessMessage('Book added successfully!');
      
      setBookData({
        bookId: '',
        title: '',
        author: '',
        publicationYear: ''
      });
      
      if (formRef.current) {
        const firstInput = formRef.current.querySelector('input');
        if (firstInput) firstInput.focus();
      }
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setErrorMessage('Cannot connect to server. Please make sure the server is running.');
      } else {
        setErrorMessage(err.message);
      }
      console.error('Error adding book:', err);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
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
          Add New Book
        </Typography>
        
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
        
        {errorMessage && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setErrorMessage('')}
          >
            {errorMessage}
          </Alert>
        )}
        
        <Paper 
          component="form" 
          onSubmit={handleSubmit} 
          ref={formRef}
          elevation={2}
          sx={{ 
            p: 4, 
            borderRadius: 2,
            bgcolor: 'white',
          }}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              id="bookId"
              name="bookId"
              label="Book ID"
              variant="outlined"
              value={bookData.bookId}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d14959',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d14959',
                  },
                  '& input': {
                    color: '#000000',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#d14959',
                },
              }}
            />
            
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              value={bookData.title}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d14959',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d14959',
                  },
                  '& input': {
                    color: '#000000',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#d14959',
                },
              }}
            />
            
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Author"
              variant="outlined"
              value={bookData.author}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d14959',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d14959',
                  },
                  '& input': {
                    color: '#000000',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#d14959',
                },
              }}
            />
            
            <TextField
              fullWidth
              id="publicationYear"
              name="publicationYear"
              label="Publication Year"
              type="number"
              variant="outlined"
              value={bookData.publicationYear}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d14959',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d14959',
                  },
                  '& input': {
                    color: '#000000',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#d14959',
                },
              }}
            />
            
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddCircleIcon />}
              sx={{
                bgcolor: '#d14959',
                color: 'white',
                fontSize: '1rem',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#b83c4b',
                },
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
