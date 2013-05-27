#!/usr/bin/env node

var spawn = require('child_process').spawn;
var fs = require('graceful-fs');
var path = require('path');
var cheerio = require('cheerio');
var hljs = require('highlight.js');
var _ = require('lodash');
var marked = require('marked');

marked.setOptions({
  gfm: true,
  tables: false,
  breaks: false,
  pedantic: false,
  sanitize: false,
  highlight: function(code, lang) {
    if (lang) {
      if (lang === 'js') lang = 'javascript';
      if (lang === 'html') lang = 'xml';
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

var writeAsHTML = function(markdown, htmlFile) {
  fs.readFile(htmlFile, 'utf8', function(err, data) {
    if (err) throw err;
    var $ = cheerio.load(data);

    $('.lead').text(markdown.split('<!-- div -->').join('<div>')
                            .split('<!-- /div -->').join('</div>'));

    fs.writeFile(htmlFile, _.unescape($.html()), function(err) {
      if (err) throw err;
    });
  });
}

var parseMarkdownFile = function(mdFile, callback) {
  fs.readFile(mdFile, 'utf8', function(err, data) {
    if (err) throw err;
    callback(marked(data));
  });
}

var mdFile = path.join(__dirname, '/docs/index.md');
var htmlFile = path.join(__dirname, '/docs/index.html');

parseMarkdownFile(mdFile, function(output) {
  writeAsHTML(output, htmlFile);
});