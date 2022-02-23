const express = require('express');

const recipeController = require('../controllers/RecipeController');
const userController = require('../controllers/UserController');

const router = express.Router();

//router.post
router.post('/', recipeController.createRecipe, (req, res) => {
  return res.status(200).json(res.locals.newRecipe);
});

//router.get
router.get('/', recipeController.getRecipes, (req, res) => { 
  return res.status(200).json(res.locals.recipes); 
});

//router.patch
router.put('/', recipeController.editRecipe, (req, res) => { 
  return res.status(200).json(res.locals.updatedRecipe); 
});

//router.delete
router.delete('/:id', recipeController.deleteRecipe, (req, res) => { 
  return res.status(200).json('Recipe deleted successfully.'); 
});

module.exports = router;
 