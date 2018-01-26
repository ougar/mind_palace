<?php

require("kdb.inc");
require("docheader.inc");
require("getvar.inc");

$valid=array("Sport","Serier","Familie","Cartoons","Film","Berømte","none");

$header=new DocHeader();
$header->set_html5();

$dbh = MyDatabase::connect("diverse2");

$get=new GetVars();

$group=$get->add("group",$valid,"none");

if ($group=="none") {
  $header->display();
  print("<body>\n".
        "  <ul>\n");
  foreach ($valid as $v) {
    if ($v=="none") continue;
    print("    <li> <a href='?group=$v'>$v\n");
  }
  print("  </ul>\n".
        "</body>\n");
}
else {
  $res=$dbh->kquery("select * from mind_palace where class='$group'");
  $header->add_css("table.css");
  $header->display();
  print("<body>\n".
        "<h2> $group </h2>\n".
        "  <table>\n".
        "    <tr> <th> Number <th> Card <th> Person <th> Action <th> Object\n");
  while ($r = $res->fetch_assoc())
    printf("    <tr> <td> %d <td> %s <td> %s <td> %s <td> %s\n",
      $r["number"],$r["card"],$r["person"],$r["action"],$r["object"]);
  print("  </table>\n".
        "</html>\n");
}

?>
