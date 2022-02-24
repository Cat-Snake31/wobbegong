const jwt = require('jsonwebtoken');

const sessionController = {};

const SECRET_KEY = '2E6C238321FFDC8ADC722457C98516EE1CB0C26036A461BF278EA4F0DAE4148E';

//Check if user is already logged in
sessionController.isLoggedIn = (req, res, next) => {
  try {
    // console.log(req.cookies);
    if(req.cookies.wobbeuser) {
      const decoded = jwt.verify(req.cookies.wobbeuser, SECRET_KEY);
      if(decoded.username !== undefined) {
        console.log(decoded.username);
        res.locals.username = decoded.username;
        return next();
      }
      else {
        //JWT exists but is not verified
        return res
          .clearCookie('wobbeuser')
          .json('not logged in');
      }
      //JWT does not exist
    } else {
      //HARD CODED USERNAME TO FIX CORS ISSUE
      if(process.env.NODE_ENV === 'development') {
        res.locals.username = 'testyman';
        return next();
      } else {
        return res
          .json('not logged in');
      }
    }
  } catch(err) {
    return next({
      log: `Cannot check if user is logged in (sessionController.isLoggedIn) Err: ${err.message}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// add session JWT to cookies
sessionController.startSession = (req, res, next) => {
  try {
    const { username } = res.locals.userData;
    const token = jwt.sign({ username: username }, SECRET_KEY);
    res.cookie('wobbeuser', token); //{httpOnly: true}
    return next();
  } catch(err) {
    return next({
      log: `Cannot start session. Error in sessionController.startSession Err: ${err.message}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = sessionController;
