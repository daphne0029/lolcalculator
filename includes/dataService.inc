<?php
require('../../includes/database.class.inc');

class dataService{
  private $db;
  public function __construct() {
    $this->db = Database::getConnection();
  }
  public function initialLoad(){
    $output['geninfo'] = $this->getChampgeninfo_all();
    $output['passives'] = $this->getpassives_all();
    $output['spells'] = $this->getspells_all();
    $output['stats'] = $this->getstats_all();
    $output['runes'] = $this->getrunes_all();
    $output['masteries'] = $this->getmasteries_all();
    $output['items'] = $this->getitems_all();

    return $output;
  }
  public function getChampionName($id){
    $query = 'select champname from champgeninfo
              where champid = :id';
    $results = $this->db->query($query)
         ->bindAll(array(
           ':id' => $id
          ))
         ->execute()
        ->resultset();
    $name = $results[0]['champname'];
    return $name;
  }
  public function getChampgeninfo_all(){
    $query = 'select * from champgeninfo';
    $results = $this->db->query($query)
         ->bindAll(array(
          ))
         ->execute()
        ->resultset();
    return $results;
  }
  public function getChampgeninfo_single($id){
    $query = 'select * from champgeninfo where champid = :id';
    $results = $this->db->query($query)
         ->bindAll(array(
           ':id' => $id
          ))
         ->execute()
        ->resultset();
    return $results;
  }
  public function getpassives_all(){
    $query = 'select * from passives';
    $results = $this->db->query($query)
         ->bindAll(array(
          ))
         ->execute()
        ->resultset();
    return $results;
  }
  public function getspells_all(){
    $query = 'select * from spells';
    $results = $this->db->query($query)
         ->bindAll(array(
          ))
         ->execute()
        ->resultset();
    return $results;
  }
  public function getstats_all(){
    $query = 'select * from champstats';
    $results = $this->db->query($query)
         ->bindAll(array(
          ))
         ->execute()
        ->resultset();
  //********* Magic Resistance ***************************
    $MRfile = fopen(ROOTPATH . "/html/ajax/magicresist.csv", "r") or die("Unable to open file!");
    if ($MRfile) {
      while (($buffer = fgets($MRfile)) !== false) {
          //echo $buffer. "<br>";
          $MRdata = explode(",",$buffer);
          foreach($results as $key => $value){
            if($value['champName'] == trim($MRdata[0])){
              $results[$key]['magicresistance'] = trim($MRdata[1]);
              $results[$key]['magicresistanceperlevel'] = trim($MRdata[2]);
            }
          };
        }
        if (!feof($MRfile)) {
          echo "Error: unexpected fgets() fail\n";
        }
        fclose($MRfile);
    }
  //******************************************************
  //************** Movement Speed ************************
    $MSfile = fopen(ROOTPATH . "/html/ajax/movementspeed.csv", "r") or die("Unable to open file!");
    if ($MSfile) {
      while (($buffer = fgets($MSfile)) !== false) {
          //echo $buffer. "<br>";
          $MSdata = explode(",",$buffer);
          foreach($results as $key => $value){
            if($value['champName'] == trim($MSdata[0])){
              $results[$key]['movementspeed'] = trim($MSdata[1]);
            }
          };
        }
        if (!feof($MSfile)) {
          echo "Error: unexpected fgets() fail\n";
        }
        fclose($MSfile);
    }
  //******************************************************

    return $results;
  }
  public function getmasteries_all(){
    $query = 'select * from masteries';
    $results = $this->db->query($query)
         ->bindAll(array(
          ))
         ->execute()
        ->resultset();
    return $results;
  }
  public function getitems_all(){
    $query = 'select * from items';
    $results = $this->db->query($query)
         ->bindAll(array(
          ))
         ->execute()
        ->resultset();
    return $results;
  }
  public function getrunes_all(){
    $query = 'select * from runes';
    $results = $this->db->query($query)
         ->bindAll(array(
          ))
         ->execute()
        ->resultset();
    return $results;
  }
}
?>
