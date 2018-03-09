let client = require('cheerio-httpcli');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/crawler', requireLogin, (req, res) => {
    console.log('routes url:', req.query.terms);
    let untrimmedKeywordList = req.query.terms;
    let trimmedKeywordList = [];
    trimmedKeywordList = untrimmedKeywordList.split(',').trim();
    console.log('trimmedKeywordList: ', trimmedKeywordList);

    let printHttpResponse = (word) => client.fetch(
      "http://www.google.com/search",
      {q:word},
      (err, $, res, body) => {
        let aList = $("div.rc").find(".r").find("a");
        let description = $("div.rc").find(".s").find(".st");
        for(let i = 0 ; i < aList.length ; i++) {
          console.log($(aList[i]).text());
          console.log($(aList[i]).attr('href'));
          console.log($(description[i]).text());
        }

      }
    )

  //   let keywordList = [
  //     "신사역 맛집",
  //     "교대역 맛집",
  //     "약수역 맛집"
  //   ]
  //
  //   for(let keyword of keywordList) {
  //     printHttpResponse(keyword);
  //   }
  // })
})}
