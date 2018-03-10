const _ = require('lodash');
let client = require('cheerio-httpcli');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/crawler', requireLogin, (req, res) => {
    let untrimmedKeywordList = req.query.terms;
    let trimmedKeywordList = _.map(untrimmedKeywordList.split(','), term => term.trim());
    let keywords = trimmedKeywordList.toString();

    let printHttpResponse = (word) => client.fetch(
      "http://www.google.com/search",
      {q:word},
      (err, $, response, body) => {
            let aList = $("div.rc").find(".r").find("a");
            let summary = $("div.rc").find(".s").find(".st");
            var resultList = [];
            for(let i = 0 ; i < aList.length ; i++) {
              var result = {"name": "", "url": "", "description": ""}
              result["name"] = $(aList[i]).text();
              result["url"] = $(aList[i]).attr('href');
              result["description"] = $(summary[i]).text();
              resultList.push(result);
            }
            res.send(resultList);
          }
    )
      printHttpResponse(keywords);
  }
)
}
