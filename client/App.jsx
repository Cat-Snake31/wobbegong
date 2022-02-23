//import dependencies
import React, {useState, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';


//import components
import Header from './Components/Header.jsx';
import RecipeContainer from './Components/RecipeContainer.jsx';
import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const mode = useSelector((state) => state.users.darkModePref);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }), [mode],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column'>
        <Header />
        <RecipeContainer />
      </Grid>
    </ThemeProvider>
  );};

export default App;
