const express = require('express');

const userController = require('../controllers/UserController');
const recipeController = require('../controllers/RecipeController');

const router = express.Router();

//router.post
router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

//router/login/post
router.post('/login', userController.verifyUser, (req, res) => {
  return res.redirect('/');
});

//router.put
router.put('/', userController.updateUser, (req, res) => {
  return res.status(200).json(res.locals.updatedUser)
});

//router.delete
router.delete('/', userController.deleteUser, (req, res) => {
  return res.status(200).json(res.locals.deletedUser)
});





module.exports = router;