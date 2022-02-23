const User = require('../models/UserModel.js');

require('dotenv').config();

const userController = {};

userController.createUser = async (req, res, next) => {
  const { firstName, username, password, preferDarkMode } = req.body;
  try {
    const newUser = await User.create({
      firstName: firstName,
      username: username,
      password: password,
      preferDarkMode: preferDarkMode,
    });
    res.locals.newUser = newUser;
    return next();
  }
  catch (err) {
    console.log(err);
    return next({
      log: `userController.createUser: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in userController.createUser. Check server logs for more details.' },
    });
  }
};

userController.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getUser = await User.findOne({_id: '62169518613e620716055c2f'});
    res.locals.user = getUser;
    return next();
  } catch (err) { 
    console.log(err);
    return next({
      log: `userController.createUser: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in userController.createUser. Check server logs for more details.' },
    });
  }
};

userController.updateUser = async (req, res, next) => {
    
};

userController.deleteUser = async (req, res, next) => {
    
};

module.exports = userController;