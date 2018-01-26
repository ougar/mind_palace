<?php

require("kdb.inc");
require("getvar.inc");
require("docheader.inc");

$header=new DocHeader();
$header->set_html5();
$header->set_title("Mind Palace");
$header->set_javascript("train.js");
$header->add_jquery();
$header->set_css("train.css");
$get=new GetVars();

$dbh=MyDatabase::connect("diverse2");

?>
