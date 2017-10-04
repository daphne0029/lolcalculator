<?php

include '../../includes/myRiotImporter.inc';

$importer = new myRiotImporter();

$output = $importer->import(array(
  'champions' => false,
  'runes' => true,
  'items' => false,
  'masteries' => false,
));
//echo "<pre>";
header('Content-Type: application/json');
echo json_encode($output);
//echo "</pre>";

?>
