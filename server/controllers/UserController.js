const User = require('../models/UserModel.js');

require('dotenv').config();

const userController = {};

userController.createUser = async (req, res, next) => {
  const { firstName, username, password, darkModePref } = req.body;
  try {
    const newUser = await User.create({
      firstName: firstName,
      username: username,
      password: password,
      darkModePref: darkModePref,
    });
    res.locals.userData = newUser;
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

userController.verifyUser = (req, res, next) => {
  const {username, password} = req.body;
  console.log('in the verifyUser controller', req.body);
  User.findOne({username: username})
    .then((result) => {
      res.locals.userData = {
        username: username,
        firstName: result.firstName,
        darkModePref: result.darkModePref
      };
      return result.comparePassword(password);
    })
    .then((result) => {
      if (result) {
        return next();
      } else {
        //need to add proper error handling for incorrect password matching
        return res.status(200).json({loggedIn: false});
      }
    })
    .catch(err => 
      next({
        log: `userController.verifyUser: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: { err: 'Error occurred in userController.verifyUser. Check server logs for more details.' },
      }));
};

userController.updateUser = async (req, res, next) => {
    
};

userController.deleteUser = async (req, res, next) => {
    
};

module.exports = userController;