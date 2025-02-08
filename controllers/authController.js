const userModel = require('../models/userModel');

const registerGET = (req, res) => {
  res.render('register', { title: 'Register' });
};

const registerPOST = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.registerUser(name, email, password);
    res.redirect('/auth/login');
  } catch (err) {
    res.send(err);
  }
};

const loginGET = (req, res) => {
  res.render('login', { title: 'Login' });
};

const loginPOST = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = { registerGET, registerPOST, loginGET, loginPOST, logout };
