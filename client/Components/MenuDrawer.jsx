import React from 'react';

import Drawer from '@mui/material/Drawer';
import MapIcon from '@mui/icons-material/Map';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const MenuDrawer = ({toggleDrawer, drawerState}) => {
  return (
    <Drawer
      open={drawerState}
      onClose={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <RestaurantIcon/>
          </ListItemIcon>
          <ListItemText primary='Recipes' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MapIcon/>
          </ListItemIcon>
          <ListItemText primary='Grocery Store Map' />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuDrawer;