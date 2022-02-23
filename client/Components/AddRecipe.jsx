import { Box } from '@mui/system';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recipeActions } from '../store/recipes-slice';
import { addRecipe, syncRecipes } from '../store/recipes-slice';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


const InputText = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: 'auto',
}));
//Import Components
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const AddRecipe = () => {

  const dispatch = useDispatch();
  const newRecipeName = useSelector((state) => state.recipes.newRecipeName);
  const newIngredientsList = useSelector((state) => state.recipes.newIngredientsList);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(addRecipe(body))
      .then(() => dispatch(recipeActions.clearSearchFields()))
      .then(() => dispatch(syncRecipes()));
  };

  const body = {
    name: newRecipeName,
    query: newIngredientsList,
  };

  return(
    <Box component="form" sx={{flexGrow: 1, display: 'flex', height: '2.5em'}}
      onSubmit={handleSubmit}
    >
      <InputText 
        onChange={(e) => dispatch(recipeActions.setRecipeName(e.target.value))}
      >
        <StyledInputBase
          value={newRecipeName}
          placeholder="Recipe Name"
        />
      </InputText>
      <InputText
        onChange={(e) => dispatch(recipeActions.setIngredientList(e.target.value))}
      >
        <StyledInputBase
          value={newIngredientsList}
          placeholder="Ingredients"
        />
      </InputText>
      {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}> */}
      <IconButton type='submit' size="large" color="inherit" >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AddRecipe;

/*
<Card variant='outlined' sx={{ p: 2}}>

  <FormControl sx={{width: '100%'}}>
    <Box container sx={{display: 'flex'}}>

      <Typography variant='h4'>add recipe here</Typography>
      <TextField
        required
        label="Name"
        // id="fullWidth"
        sx={{ mx: 2 }}
        value={newRecipeName}
        onChange={(e) => dispatch(recipeActions.setRecipeName(e.target.value))}
      />
      <Box sx={{ mr: 2, flexGrow: 1}}>
        <TextField
          // fullWidth 
          required
          label="Ingredients"
          // id="fullWidth" 
          sx={{ width: '100%' }}
          // flex={1}
          // multiline={true} 
          // rows={11}
          value={newIngredientsList}
          onChange={(e) => dispatch(recipeActions.setIngredientList(e.target.value))}
        />
      </Box>
      <Button type='submit' variant='outlined' onClick={() => dispatch(addRecipe(body))
        .then(() => dispatch(recipeActions.clearSearchFields()))
        .then(() => dispatch(syncRecipes()))}
      >
						Add
      </Button>
    </Box>
  </FormControl>
</Card>;
*/
