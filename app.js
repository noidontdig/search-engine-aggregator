var http = require('http');
var url = require('url');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
const PORT = 3000;

function fetch (url, cb) {
  request.get(url, function (err, response, body) {
    if (err) {
      cb(err);
    } else {
      cb(null, body);
    }
  });
}

function handleRequest (req, res) {
  var search = {
    google: [],
    ddg: [],
    bing: []
  };
  var path = url.parse(req.url).path;
  var query = path.split('/')[1];
  var urls = [
    'https://www.google.com/search?q=' + query,
    'https://duckduckgo.com/search?q=' + query,
    'https://www.bing.com/search?q=' + query
  ];

  async.map(urls, fetch, function (err, results) {
    if (err) {
      res.end(err);
    } else {

      var google = results[0];
      var $google = cheerio.load(google);
      $google('.r a').each(function (i, link) {
        var url = $google(link).attr("href");
        url = url.replace("/url?q=", "").split("&")[0];
        if (url.charAt(0) === "/") {
          return;
        }
        search.google.push(url);
      });

      var ddg = results[1];
      var $ddg = cheerio.load(ddg);
      $ddg('h2 a').each(function (i, link) {
        var url = $ddg(link).attr("href");
        if (url.charAt(0) === "/") {
          return;
        }
        search.ddg.push(url);
      });

      var bing = results[2];
      var $bing = cheerio.load(bing);
      $bing('h2 a').each(function (i, link) {
        var url = $bing(link).attr('href');
        search.bing.push(url);
      });

      res.end(JSON.stringify(search));
    }
  });
}

var server = http.createServer(handleRequest);
server.listen(PORT, function () {
  console.log("Server listening on: http://localhost:%s", PORT);
});
