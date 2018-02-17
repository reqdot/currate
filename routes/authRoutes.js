const _ = require('lodash');
const mongoose = require('mongoose');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/bulletins');
    }
  );

  app.post('/api/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.header('x-auth', token).send(user);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    User.findByToken(token)
      .then(user => {
        if (!user) {
          return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
      })
      .catch(e => {
        res.status(401).send();
      });
  };

  app.get('/api/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
