const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
