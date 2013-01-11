#!/usr/bin/env node

var cheerio    = require('cheerio'),
    hljs       = require('highlight.js'),
    _          = require('lodash'),
    marked     = require('marked'),
    spawn      = require('child_process').spawn,
    fs         = require('fs'),
    path       = require('path');

marked.setOptions({
  gfm: true,
  tables: false,
  breaks: false,
  pedantic: false,
  sanitize: false,
  highlight: function(code, lang) {
    if (lang) {
      if (lang === 'js') {
        lang = 'javascript';
      }
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

/*
var downloadDocs = function(file) {
  var markdownFile = fs.createWriteStream(file),
      docURL = 'https://raw.github.com/KenanY/primality/master/doc/README.md',
      curl = spawn('curl', [docURL]);
  curl.stdout.on('data', function(data) { markdownFile.write(data); });
  curl.stdout.on('end', function(data) { markdownFile.end(); });
  curl.on('exit', function(err) {
    if (err != 0) {
      console.log('Failed: ' + err)
    }
  });
  return true;
}
*/

var parseMarkdown = function(file) {
  return marked(fs.readFileSync(file, 'utf8'));
}

var writeToHTML = function(md) {
  var htmlFile = path.join(__dirname, 'index.html'),
      html     = fs.readFileSync(htmlFile, 'utf8'),
      $        = cheerio.load(html);

  $('.lead').text(md);
  fs.writeFileSync(htmlFile, _.unescape($.html()));
}

var finalShow = _.compose(writeToHTML, parseMarkdown);
finalShow(path.join(__dirname, 'index.md'));