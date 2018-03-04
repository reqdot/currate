const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const requireLogin = require('../middlewares/requireLogin');


const Bulletin = mongoose.model('bulletins');
module.exports = app => {
  app.get('/api/bulletins', requireLogin, async(req, res) => {
    const bulletins = await Bulletin.find();
    res.send(bulletins);
  });

  app.get('/api/bulletins/new/:id', async (req, res) => {
    const id = req.params.id;
    const bulletin = await Bulletin.findById(new ObjectId(id));
    res.send(bulletin);
  });

  app.patch('/api/bulletins/new/:id', async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const body = _.pick(req.body, ['title', 'content']);

    const updatedBulletin = await Bulletin.findByIdAndUpdate(
      { _id: new ObjectId(id)},
      { $set: body, date: Date.now() },
      { new: true }
    );
    res.send(updatedBulletin);
  });

  app.delete('/api/bulletins/new/:id', async (req, res) => {
    const id = req.params.id;
    const deleteBulletin = await Bulletin.findByIdAndRemove(new ObjectId(id));
    res.send(deleteBulletin);
  });

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
