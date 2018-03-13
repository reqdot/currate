const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
let client = require('cheerio-httpcli');
const requireLogin = require('../middlewares/requireLogin');

var News = mongoose.model('news');

module.exports = app => {
  app.get('/api/crawler', requireLogin, (req, res) => {
    let untrimmedKeywordList = req.query.terms;
    let trimmedKeywordList = _.map(untrimmedKeywordList.split(','), term =>
      term.trim()
    );
    let keywords = trimmedKeywordList.toString();

    let printHttpResponse = word =>
      client.fetch(
        'http://www.google.com/search',
        { q: word },
        (err, $, response, body) => {
          let aList = $('div.rc')
            .find('.r')
            .find('a');
          let summary = $('div.rc')
            .find('.s')
            .find('.st');
          var resultList = [];
          for (let i = 0; i < aList.length; i++) {
            var result = { title: '', url: '', description: '' };
            result['title'] = $(aList[i]).text();
            result['url'] = $(aList[i]).attr('href');
            result['description'] = $(summary[i]).text();
            resultList.push(result);
          }
          res.send(resultList);
        }
      );
    printHttpResponse(keywords);
  });

  app.get('/api/crawler/news', requireLogin, async (req, res) => {
    var newsList = await News.find();
    res.send(newsList);
  });

  app.get('/api/crawler/news/:id', requireLogin, async (req, res) => {
    var id = req.params.id;
    var newsList = await News.find({ _user: new ObjectId(id) });
    res.send(newsList);
  });

  app.delete('/api/crawler/news/:id', requireLogin, async (req, res) => {
    var id = req.params.id;
    var deleteNews = await News.findByIdAndRemove(new ObjectId(id));
    res.send(deleteNews);
  });

  app.post('/api/crawler/news/:id', requireLogin, (req, res) => {
    var id = req.params.id;
    var { title, url, description } = req.body;
    var news = new News({
      title,
      url,
      description,
      _user: ObjectId(id),
      date: Date.now()
    });

    try {
      news.save().then(news => res.send(news));
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
