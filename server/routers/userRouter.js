const express = require('express');

const userController = require('../controllers/UserController');
const recipeController = require('../controllers/RecipeController');

const router = express.Router();

//router.post
router.post('/', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser)
});

//router.get
router.get('/', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user)
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