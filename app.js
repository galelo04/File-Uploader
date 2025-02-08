const path = require('node:path');
const passport = require('passport');
const express = require('express');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const Router = require('./routes/indexRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public'))); // Serves static files from "public"

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
require('./config/passport');

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/', Router);

app.listen(3000, () => console.log('app listening on port 3000!'));
