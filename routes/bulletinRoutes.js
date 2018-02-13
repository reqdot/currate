const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Bulletin = mongoose.model('bulletins');
module.exports = app => {
  app.post('/api/bulletins', requireLogin, (req, res) => {
    const { title, content, date } = req.body;

    const bulletin = new Bulletin({
      title,
      content,
      _user: req.user.id,
      date: Date.now()
    });

    try {
      bulletin.save().then(bulletin => res.send(bulletin));
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
