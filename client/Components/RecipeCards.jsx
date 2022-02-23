//Import dependencies
import { FormControl, InputLabel, Input, TextField, FormHelperText, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import '../App.scss';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { editRecipe, deleteRecipe, syncRecipes } from '../store/recipes-slice';
import { useDispatch } from 'react-redux';

// import canvas from 'canvas';

//import components
import IngredientsList from './IngredientsList.jsx';
import ChartContainer from './ChartContainer.jsx';
import DoughnutChart from './ChartJS/PieChart.jsx';

const RecipeCard = (props) => {
  const dispatch = useDispatch();
  // console.log('Here\'s the ingredient list: ', props.ingredientList);

  const [ isEditing, setIsEditing ] = useState(false);
  const [ editQuery, setQuery ] = useState(props.query);
  const [ editRecipeName, setEditRecipeName ] = useState(props.name);

  const editBody = {
    id: props.id,
    name: editRecipeName,
    query: editQuery
  };

  const editRecipeNameHandler = (name) => {
    setEditRecipeName(name);
  };

  const editQueryHandler = (query) => {
    setQuery(query);
  };

  const editBtnHandler = () => {
    setIsEditing(true);
  };

  const submitBtnHandler = () => {
    setIsEditing(false);
  };

  const renderCard = (
    <Card sx={{padding: '20px'}}>
      <Typography gutterBottom variant='h4' component='div' align='center'>
        {props.name}
      </Typography>
      <ChartContainer ingredientList={props.ingredientList} />
      <CardContent>
        <IngredientsList ingredientList={props.ingredientList} recipeName={props.name} />
      </CardContent>
      <CardActions>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant='outlined' size='large' onClick={editBtnHandler}>
							Edit
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant='outlined'
              size='large'
              onClick={() => dispatch(deleteRecipe(props.id)).then(() => dispatch(syncRecipes()))}
            >
							Delete
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );

  const renderEditCard = (
    <Card>
      <Typography gutterBottom variant='h4' component='div' align='center'>
        <TextField
          fullWidth
          required
          label='Name'
          id='fullWidth'
          sx={{ my: 2 }}
          value={editRecipeName}
          onChange={(e) => editRecipeNameHandler(e.target.value)}
        />
      </Typography>
      <ChartContainer ingredientList={props.ingredientList} />
      <CardContent>
        <TextField
          fullWidth
          required
          label='Ingredients'
          id='fullWidth'
          sx={{ mb: 2 }}
          multiline={true}
          rows={5}
          value={editQuery}
          onChange={(e) => editQueryHandler(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Box sx={{ width: '100%', display: 'flex', alignContent: 'space-between'}}>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant='outlined'
              size='large'
              onClick={() =>
                dispatch(editRecipe(editBody))
                  .then(() => dispatch(syncRecipes()))
                  .then(() => submitBtnHandler())}
            >
							Submit
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant='outlined'
              size='large'
              onClick={() => dispatch(deleteRecipe(props.id)).then(() => dispatch(syncRecipes()))}
            >
							Delete
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant='outlined'
              size='large'
              onClick={() => submitBtnHandler()}
            >
							Close
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>

  );

  return <div>{isEditing ? renderEditCard : renderCard}</div>;
};

export default RecipeCard;
