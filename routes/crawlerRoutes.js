const _ = require('lodash');
let https = require('https');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
let subscriptionKey = '00f1ca2222b24c96a3023a955cd9f6fb';
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/news/search';

module.exports = app => {
  app.get('/api/crawler', (req, res) => {
    console.log('routes url:', req.query.url);
    let term = req.query.url;

    let response_handler = function(response) {
      let body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        console.log('\nRelevant Headers:\n');

        for (var header in response.headers)
          if (header.startsWith('bingapis-') || header.startsWith('x-msedge-'))
            console.log(header + ': ' + response.headers[header]);
        body = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('\nJSON Response:\n');
        console.log(body);
        res.send(body);
      });
      response.on('error', function(e) {
        console.log('Error: ' + e.message);
      });
    };

    let bing_news_search = function(search) {
      console.log('Searching news for: ' + term);
      let request_params = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(search),
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey
        }
      };

      let req = https.request(request_params, response_handler);
      req.end();
    };
    bing_news_search(term);
  });
};
