//Import dependencies
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../store/users-slice';
import React, {useState} from 'react';

import MenuDrawer from './MenuDrawer.jsx';
//Import Components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AddRecipe from './AddRecipe.jsx';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

//React Component
const Header = () => {
  const [drawerState, setDrawerState] = useState(false);
  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };

  return (
    <AppBar position="static"
      sx={{ position: 'fixed', zIndex: 10 }}
    >
      <MenuDrawer {...{toggleDrawer, drawerState}}/>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
           Nutrition<b>.IX</b>
        </Typography>
        <AddRecipe/>
        {/* <Switch onClick={colorMode.toggleColorMode}/> */}
        <Switch onClick={() => dispatch(changeTheme())}/>
        <Button color="inherit"
          onClick={()=>{
            fetch('/user/logout');
            return window.location.assign('/');
          }}
        >Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;