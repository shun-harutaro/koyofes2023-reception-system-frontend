import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export const ButtonAppBar = (props) => {
    return(
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {props.title}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
    )
}