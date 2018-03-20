const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const requireLogin = require('../middlewares/requireLogin');

var Bulletin = mongoose.model('bulletins');

module.exports = app => {
  app.get('/api/bulletins', async (req, res) => {
    var bulletins = await Bulletin.find();
    res.send(bulletins);
  });

  app.get('/api/bulletins/new/:id', requireLogin, async (req, res) => {
    var id = req.params.id;
    var bulletin = await Bulletin.findById(new ObjectId(id));
    res.send(bulletin);
  });

  app.get('/api/bulletins/mybulletins/:id', requireLogin, async (req, res) => {
    var id = req.params.id;
    var bulletin = await Bulletin.find({ _user: new ObjectId(id) });
    res.send(bulletin);
  });

  app.patch('/api/bulletins/new/:id', requireLogin, async (req, res) => {
    var id = req.params.id;
    var date = req.body.date;
    var body = _.pick(req.body, ['title', 'content']);

    const updatedBulletin = await Bulletin.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body, date: Date.now() },
      { new: true }
    );
    res.send(updatedBulletin);
  });

  app.delete('/api/bulletins/new/:id', requireLogin, async (req, res) => {
    var id = req.params.id;
    var deleteBulletin = await Bulletin.findByIdAndRemove(new ObjectId(id));
    res.send(deleteBulletin);
  });

  app.post('/api/bulletins/new/:id', requireLogin, (req, res) => {
    var id = req.params.id;
    var { title, content, date } = req.body;
    var bulletin = new Bulletin({
      title,
      content,
      _user: ObjectId(id),
      date: Date.now()
    });

    try {
      bulletin.save().then(bulletin => res.send(bulletin));
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
