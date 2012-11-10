<?php

  // cleanup requested filepath
  $file = isset($_GET['f']) ? $_GET['f'] : 'primality';
  $file = preg_replace('#(\.*[\/])+#', '', $file);
  $file .= preg_match('/\.[a-z]+$/', $file) ? '' : '.js';

  // output filename
  if (isset($_GET['o'])) {
    $output = $_GET['o'];
  } else if (isset($_SERVER['argv'][1])) {
    $output = $_SERVER['argv'][1];
  } else {
    $output = basename($file);
  }

  /*--------------------------------------------------------------------------*/

  require('docdown/docdown.php');

  // generate Markdown
  $markdown = docdown(array(
    'path'  => '../' . $file,
    'title' => 'Primality',
    'toc'   => 'categories',
    'url'   => 'https://github.com/KenanY/primality/blob/master/primality.js'
  ));

  // save to a .md file
  file_put_contents($output . '.md', $markdown);

  // print
  header('Content-Type: text/plain;charset=utf-8');
  echo $markdown . PHP_EOL;

?>