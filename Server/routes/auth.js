const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

router.post('./checkSession',(req,res,next)=>{
var status= req.body(status);
if(req.session.email!=undefined)
{
   const userdata = {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        email: req.session.email
      };
  return res.json({status: 300,user:userdata});
}
else
{
  return res.json({status :301})
}
})
router.post('/signup', (req, res, next) => {
  return passport.authenticate('local-signup', (err,userData,info) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
        }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.',
      user: userData
    });
  })(req, res, next);
});

//login functionality
router.post('/login', (req, res, next) => {
  
  return passport.authenticate('local-login', (err, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    req.session.email = userData.email;
    req.session.firstName = userData.firstName;
    req.session.lastName = userData.lastName;
      console.log(req.session.email);
      console.log("session initilized");
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      user: userData,
      status:201
    });
  })(req, res, next);
});

module.exports = router;
