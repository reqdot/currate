const _ = require('lodash');
const mongoose = require('mongoose');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');

var User = mongoose.model('users');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.post('/api/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.cookie('token', token).send(user);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  var authenticate = (req, res, next) => {
    var token = req.session.token;
    console.log('authenticate token: ', token)
    User.findByToken(token)
      .then(user => {
        if (!user) {
          return Promise.reject();
        }
        req.session.user = user;
        next();
      })
      .catch(e => {
        res.status(401).send();
      });
  };

  app.get('/api/users/me', authenticate, (req, res) => {
    console.log('/api/users/me req.user: ', req.session.user)
    res.send(req.session.user);
  });

  app.post('/api/users/signin', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
        req.session.token = token;
        console.log('login req.session.token: ', token)
        res.send(user);
        });
      })
      .catch(e => {
        res.status(400).send();
      });
  });

  app.delete('/api/users/me/signout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(
      () => {
        res.status(200).send()
      },
      () => {
        res.status(400).send();
      }
    );
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/signout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
})
}
