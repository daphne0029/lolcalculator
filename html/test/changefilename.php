<?php
require('../../includes/config.inc');
$dir = ROOTPATH . "/html/assets/Runes";
$listofDIR = scandir($dir);

foreach ($listofDIR as $key => $value){
  if(preg_match("/(\w+)_(\d+)_(\w+).png/", $value)){
    echo "<br>";
    $oldname = $dir . "/" . $value;
    $newname = $dir . "/" . preg_replace("/(\w+)_(\d+)_(\w+).png/", "$1_$2.png", $value);
    rename($oldname, $newname);
    echo $newname;
  };
};
?>
