import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#d14959' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left section - Logo and Title */}
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
                color: '#000000',
                textDecoration: 'none',
              }}
            >
              Your Local Library
            </Typography>
          </Box>

          {/* Middle section - Home button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ 
                my: 2, 
                color: '#000000',
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
          </Box>

          {/* Right section - Add Books button */}
          <Box>
            <Button
              component={RouterLink}
              to="/addbooks"
              sx={{ 
                my: 2, 
                color: '#000000',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
              startIcon={<AddIcon />}
            >
              Add Books
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
