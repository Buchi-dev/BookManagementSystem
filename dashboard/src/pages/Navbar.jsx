/**
 * Navbar Component
 * 
 * This component creates the navigation bar that appears at the top of each page.
 * It includes the app title and navigation links.
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useTheme
} from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  // Get theme for consistent styling
  const theme = useTheme();
  
  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left section - App Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalLibraryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Poppins',
                fontWeight: 700,
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              Your Local Library
            </Typography>
          </Box>

          {/* Middle section - Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {/* Home Button */}
            <Button
              component={RouterLink}
              to="/"
              sx={{ 
                my: 2, 
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            
            {/* Add Books Button */}
            <Button
              component={RouterLink}
              to="/addbooks"
              sx={{ 
                my: 2, 
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
              startIcon={<AddIcon />}
            >
              Add Book
            </Button>
          </Box>
          
          {/* Right section - empty for now, could add user profile or settings later */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '150px' }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
