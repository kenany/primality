#!/usr/bin/env node

var spawn = require('child_process').spawn;
var fs = require('fs');
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

var parseMarkdown = function(mdFile, htmlFile) {
  console.log('Markdown file: ' + mdFile + ' => HTML file: ' + htmlFile);
  return [marked(fs.readFileSync(mdFile, 'utf8')), htmlFile];
}

var writeToHTML = function(mdAndHTMLFile) {
  var html = fs.readFileSync(mdAndHTMLFile[1], 'utf8');
  var $ = cheerio.load(html);

  $('.lead').text(mdAndHTMLFile[0].split('<!-- div -->').join('<div>')
                                  .split('<!-- /div -->').join('</div>'));
  fs.writeFileSync(mdAndHTMLFile[1], _.unescape($.html()));
}

/*
 * Generating a page is a combination of parsing the Markdown and writing the
 * HTML
 */
var generatePage = _.compose(writeToHTML, parseMarkdown);

/* Docs */
generatePage(path.join(__dirname, '/docs/index.md'), path.join(__dirname, '/docs/index.html'));