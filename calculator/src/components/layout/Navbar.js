import React, { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <a href="/"><h1>Calculator</h1></a>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
