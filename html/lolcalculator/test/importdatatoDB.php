<?php

include '../../includes/myRiotImporter.inc';
require('../../includes/database.class.inc');

$importer = new myRiotImporter();

$trigger = array(
  'champions' => false,
  'runes' => false,
  'items' => false,
  'masteries' => false,
);

$trigger['champions'] = empty($_GET['champions']) ? false:$_GET['champions'];
$trigger['runes'] = empty($_GET['runes']) ? false:$_GET['runes'];
$trigger['items'] = empty($_GET['items']) ? false:$_GET['items'];
$trigger['masteries'] = empty($_GET['masteries']) ? false:$_GET['masteries'];

$trigger['champions'] = ($trigger['champions'] === 'true') ? true:false;
$trigger['runes'] = ($trigger['runes'] === 'true') ? true:false;
$trigger['items'] = ($trigger['items'] === 'true') ? true:false;
$trigger['masteries'] = ($trigger['masteries'] === 'true') ? true:false;
var_dump($trigger);

$output = $importer->import($trigger);
//echo "<pre>";
header('Content-Type: application/json');
//echo json_encode($output);
Insertdata($output,$trigger);
//echo "</pre>";

function Insertdata($data,$trigger){
  if($trigger['masteries']){
    insertMasteries($data);
  }
  if($trigger['runes']){
    insertRunes($data);
  }
  if($trigger['items']){
    insertItems($data);
  }
  if($trigger['champions']){
    insertchampions($data);
  }
}//end function GeneratImportString

function insertchampions($data){
  //echo "ready to insert champions.";
  //******************* General Info *******************
    insertGenInfo($data['champions']['champgeninfo']);
  //********************** Stats ***********************
    insertstats($data['champions']['stats']);
  //********************* Spells ***********************
    insertspells($data['champions']['champ_spells']);
  //********************* Passive **********************
    insertpassive($data['champions']['champ_passive']);
}

function insertpassive($data){
  //echo json_encode($data);
  $myDB = Database::getConnection();
  $myDB->beginTransaction();
  foreach($data as $passive){
    foreach($passive as $key => $value){
      if(gettype($value) == 'array'){
          $passive[$key] = json_encode($value);
      }
    }
    $query = 'insert into passives (champID,data)
                values (:col1,:col2)';
    $myDB->query($query)
         ->bindAll(array(
           ':col1' => $passive['champid'],
           ':col2' => $passive['passive']
          ))
         ->execute();
  }
  $myDB->endTransaction();
}

function insertspells($data){
  //echo json_encode($data);
  $myDB = Database::getConnection();
  $myDB->beginTransaction();
  foreach($data as $spells){
    foreach($spells as $key => $value){
      if(gettype($value) == 'array'){
          $spells[$key] = json_encode($value);
      }
    }
    //var_dump($chmpgeninfo['$chmpgeninfo']);
    //echo "<br><br>";
    $query = 'insert into spells (champID,data)
                values (:col1,:col2)';
    $myDB->query($query)
         ->bindAll(array(
           ':col1' => $spells['champid'],
           ':col2' => $spells['spell']
          ))
         ->execute();
  }
  $myDB->endTransaction();
}

function insertGenInfo($data){
  //echo json_encode($data);
  $myDB = Database::getConnection();
  $myDB->beginTransaction();
  foreach($data as $chmpgeninfo){
    foreach($chmpgeninfo as $key => $value){
      if(gettype($value) == 'array'){
          $chmpgeninfo[$key] = json_encode($value);
      }
    }
    //var_dump($chmpgeninfo['$chmpgeninfo']);
    //echo "<br><br>";
    $query = 'insert into champgeninfo (champID,champname,info,title,allytips,enemytips)
                values (:col1,:col2,:col3,:col4,:col5,:col6)';
    $myDB->query($query)
         ->bindAll(array(
           ':col1' => $chmpgeninfo['champid'],
           ':col2' => $chmpgeninfo['name'],
           ':col3' => $chmpgeninfo['info'],
           ':col4' => $chmpgeninfo['title'],
           ':col5' => $chmpgeninfo['allytips'],
           ':col6' => $chmpgeninfo['enemytips']
          ))
         ->execute();
  }
  $myDB->endTransaction();
  echo "Done inserting into champgeninfo table.";
}

function insertstats($data){
  //echo "<pre>";
  //echo json_encode($data);
  //echo "</pre>";
  $myDB = Database::getConnection();
  $myDB->beginTransaction();
  foreach($data as $stats){
    foreach($stats as $key => $value){
      if(gettype($value) == 'array'){
          $stats[$key] = json_encode($value);
      }
    }
    //var_dump($stats);
    //echo "<br><br>";
    $query = 'insert into champstats
                (champID,champName,armor,armorperlevel,attackdamage,attackrange,
                attackspeedoffset,attackspeedperlevel,crit,critperlevel,hp,hpperlevel,
                hpregen,hpregenperlevel,movespeed,mp,mpperlevel,mpregen,mpregenperlevel,
                spellblock,spellblockperlevel,attackdamageperlevel)
                values (:col1,:col2,:col3,:col4,:col5,:col6,:col7,:col8,:col9,:col10,
                :col11,:col12,:col13,:col14,:col15,:col16,:col17,:col18,:col19,:col20,:col21,:col22)';
    $myDB->query($query)
         ->bindAll(array(
           ':col1' => $stats['champid'],             ':col2' => $stats['champName'],
           ':col3' => $stats['armor'],               ':col4' => $stats['armorperlevel'],
           ':col5' => $stats['attackdamage'],        ':col6' => $stats['attackrange'],
           ':col7' => $stats['attackspeedoffset'],   ':col8' => $stats['attackspeedperlevel'],
           ':col9' => $stats['crit'],                ':col10' => $stats['critperlevel'],
           ':col11' => $stats['hp'],                 ':col12' => $stats['hpperlevel'],
           ':col13' => $stats['hpregen'],            ':col14' => $stats['hpregenperlevel'],
           ':col15' => $stats['mpperlevel'],         ':col16' => $stats['mp'],
           ':col17' => $stats['mpperlevel'],         ':col18' => $stats['mpregen'],
           ':col19' => $stats['mpregenperlevel'],    ':col20' => $stats['spellblock'],
           ':col21' => $stats['spellblockperlevel'], ':col22' => $stats['attackdamageperlevel']
          ))
         ->execute();
  }
  $myDB->endTransaction();
  //echo "Done inserting into champstats table.";
}

function insertItems($data){
  $myDB = Database::getConnection();
  $myDB->beginTransaction();
  foreach($data['items'] as $items){
    foreach($items as $key => $value){
      if(gettype($value) == 'array'){
          $items[$key] = json_encode($value);
      }
    }
    $query = 'insert into items (ID,name,description,tags,gold,depth,fromitem,intoitem,effect,stats)
                values (:col1,:col2,:col3,:col4,:col5,:col6,:col7,:col8,:col9,:col10)';
    $myDB->query($query)
         ->bindAll(array(
           ':col1' => $items['id'],
           ':col2' => $items['name'],
           ':col3' => $items['description'],
           ':col4' => $items['tags'],
           ':col5' => $items['gold'],
           ':col6' => $items['depth'],
           ':col7' => $items['from'],
           ':col8' => $items['into'],
           ':col9' => $items['effect'],
           ':col10' => $items['stats'],
          ))
         ->execute();
  }//end foreach(data['masteries'])
  $myDB->endTransaction();
  //echo "Done inserting into items table.";
}

function insertRunes($data){
  $myDB = Database::getConnection();
  $myDB->beginTransaction();
  foreach($data['runes'] as $runes){
    foreach($runes as $key => $value){
      if(gettype($value) == 'array'){
          $runes[$key] = json_encode($value);
      }
    }
    $query = 'insert into runes (ID,name,description,tags,type,tier,stats)
                values (:col1,:col2,:col3,:col4,:col5,:col6,:col7)';
    $myDB->query($query)
         ->bindAll(array(
           ':col1' => $runes['id'],
           ':col2' => $runes['name'],
           ':col3' => $runes['description'],
           ':col4' => $runes['tags'],
           ':col5' => $runes['type'],
           ':col6' => $runes['tier'],
           ':col7' => $runes['stats']
          ))
         ->execute();
  }//end foreach(data['masteries'])
  $myDB->endTransaction();
  //echo "Done inserting into runes table.";
}

function insertMasteries($data){
  $myDB = Database::getConnection();
  $myDB->beginTransaction();
  foreach($data['masteries'] as $masteries){
    foreach($masteries as $key => $value){
      if(gettype($value) == 'array'){
          $masteries[$key] = json_encode($value);
      }
    }
    $query = 'insert into masteries (ID,name,description,ranks,masteryTree,level,col)
                values (:col1,:col2,:col3,:col4,:col5,:col6,:col7)';
    $myDB->query($query)
         ->bindAll(array(
           ':col1' => $masteries['id'],
           ':col2' => $masteries['name'],
           ':col3' => $masteries['description'],
           ':col4' => $masteries['ranks'],
           ':col5' => $masteries['masteryTree'],
           ':col6' => $masteries['level'],
           ':col7' => $masteries['col']
          ))
         ->execute();
  }//end foreach(data['masteries'])
  $myDB->endTransaction();
  //echo "Done inserting into masteries table.";
}



?>
