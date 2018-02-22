const _ = require('lodash');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');

module.exports = app => {
  app.get('/api/crawler', (req, res) => {
    console.log('routes url:', req.query.url);
    var url = req.query.url;

    request(url, function(error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        var title, release, rating;
        var json = { title: '', release: '', rating: '' };

        $('.title_wrapper').filter(function() {
          var data = $(this);
          title = data
            .children()
            .first()
            .text()
            .trim();
          release = data
            .children()
            .last()
            .children()
            .last()
            .text()
            .trim();

          json.title = title;
          json.release = release;
        });

        $('.ratingValue').filter(function() {
          var data = $(this);
          rating = data.text().trim();

          json.rating = rating;
        });
        res.send(json);
      }
    });
  });
};
