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

module.exports = { registerGET, registerPOST };
