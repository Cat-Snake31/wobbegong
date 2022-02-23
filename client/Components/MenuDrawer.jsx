import React from 'react';
import {useNavigate} from 'react-router-dom';


import Drawer from '@mui/material/Drawer';
import MapIcon from '@mui/icons-material/Map';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const MenuDrawer = ({toggleDrawer, drawerState}) => {
  const navigate = useNavigate();
  return (
    <Drawer
      open={drawerState}
      onClose={toggleDrawer(false)}
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem button
          onClick={() => navigate('/', {replace: true})}
        >
          <ListItemIcon>
            <RestaurantIcon/>
          </ListItemIcon>
          <ListItemText primary='Recipes' />
        </ListItem>
        <ListItem button
          onClick={() => navigate('/map', {replace: true})}
        >
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