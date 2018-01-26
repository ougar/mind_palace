<?php

require("setup.inc");

$res=$dbh->kquery("select * from mind_palace");

$data=array();
while ($data[]=$res->fetch_assoc()) ;

$header->display();
?>

<body>
  <div id='content'>
    <div id='number'> 00 </div>
    <p>
      <span id='person'> Person </span>
      <br>
      <span id='action'> Action </span>
      <br>
      <span id='object'> Object </span>
    </p>
  </div>
</body>
</html>
