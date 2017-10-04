<?php

include '../includes/database.class.inc';

$query = 'describe champstats';
$results = $myDB->query($query)
     ->bindAll(array(
      ))
     ->execute()
    ->resultset();

echo '<pre>';
var_dump($results);
echo '</pre>';
?>
