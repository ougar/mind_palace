<?php

require("setup.inc");
$header->display();
?>

<body>
  <div id='content'>
    <div id='target'> - </div>
    <div id='memimage'>
      <span id='person'> Person </span>
      <span id='action'> Action </span>
      <span id='object'> Object </span>
    </div>
  </div>
  <div id='options'>
    <span id='traintype' class='optiongroup'>
      <span id='opt_card' class='selected'> Card </span> / <span id='opt_number'> Num </span>
    </span>
    -
    <span id='traindepth' class='optiongroup'>
      <span id='opt_d1' class='selected'> 1 </span> / <span id='opt_d3'> 3 </span>
    </span>
    -
    <span id='groupcard' class='optiongroup'> 
      <span> ♥ </span>
      <span> ♣ </span>
      <span> ♦ </span>
      <span> ♠ </span>
      &nbsp;
    </span>
    <span id='groupnumber' class='optiongroup'> 
      <span> 1 </span>
      <span> 2 </span>
      <span> 3 </span>
      <span> 4 </span>
      <span> 5 </span>
    </span>
    -
    <span id='traindirection' class='optiongroup selected'>
      c2i
    </span>
    -
    <span id='trainpao' class='optiongroup'>
      <span>P</span><span>A</span><span>O</span>
    </span>
  </div>
</body>
</html>
