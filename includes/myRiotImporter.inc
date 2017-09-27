<?php

if (!class_exists('myRiotImporter')) {
  require 'riotAPI.inc';
  class myRiotImporter {
    private $riotAPI;
    public function __construct() {
      $this->riotAPI = riotAPI::getInstance();
    }
    public function import($options = array()) {
      $output = array();
      if($options['champions']){
        $output['champions'] = $this->importChampions();
      }

      return $output;
    }
    public function importChampions() {
      //get riot api response
      $res = $this->riotAPI->getChampions();
      //process response
      $output = $this->processchampions($res);
      //save
      return $output;
    }
    public function processchampions($res){
      //stats: champid, name, armor, armorperlvl,..., etc.
      foreach($res['data'] as $data){
        $champN = $data['name'];

        $data['stats']['champid'] = $data['id'];
        $data['stats']['champN'] = $data['name'];
        $info = $data['stats'];
        $stats[$champN] = $info;
        //echo json_encode($info,true);
        //echo "<br><br>";
      }

      return $stats;
    }
  }//close class myRiotImporter
}//close if class exists





?>
