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
      if (lang === 'js') lang = 'javascript';
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

var parseMarkdown = function(mdFile, htmlFile) {
  console.log('Markdown file: ' + mdFile + ' => HTML file: ' + htmlFile);
  return [marked(fs.readFileSync(mdFile, 'utf8')), htmlFile];
}

var writeToHTML = function(mdAndHTMLFile) {
  var html     = fs.readFileSync(mdAndHTMLFile[1], 'utf8'),
      $        = cheerio.load(html);

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