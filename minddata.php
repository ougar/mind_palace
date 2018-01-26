<?php

require_once("kdb.inc");

$dbh=MyDatabase::connect("diverse2");

// Fetch all matches
$q="select * from mind_palace";
$res=$dbh->kquery($q);
$data=array();
while ($data[]=$res->fetch_assoc()) ;
$jsondata=json_encode($data);

header('Content-Type: application/json');
print("$jsondata\n");
?>
