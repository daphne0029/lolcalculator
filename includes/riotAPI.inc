<?php
require('config.inc');
class riotAPI {
  private $APIkey = RIOTKEY;
  private static $instance = false;
  public static function getInstance() {
    if (riotAPI::$instance === false) {
      riotAPI::$instance = new riotAPI();
    }
    return riotAPI::$instance;
  }
  private function __constructor() {

  }
  private function sendCommand($url, $param) {
    //send get to target url
    //http://lolcalculator.local/test.php?u=1
    //$this->sendCommand('http://lolcalculator.local/test.php',array('u'=>1));
    $param['api_key'] = $this->APIkey;
    $cmdURL = $url . '?' . http_build_query($param);
    $response = file_get_contents($cmdURL);
    return json_decode($response, true);
  }
  public function getChampions() {
    //set $url
    $url = 'https://na1.api.riotgames.com//lol/static-data/v3/champions';
    $param['locale'] = 'en_US';
    $param['tags'] = 'all';
    $output = $this->sendCommand($url,$param);
    //$championAll = file_get_contents(ROOTPATH.'/allchampions.json');
    //echo $championAll;
    //$output = json_decode($championAll, true);
    //echo json_encode($output);
    return $output;
  }
  public function getRunes(){
    $url = 'https://na1.api.riotgames.com/lol/static-data/v3/runes';
    $param['locale'] = 'en_US';
    $param['tags'] = 'all';
    $output = $this->sendCommand($url,$param);
    return $output;
  }
  public function getItems(){
    $url = 'https://na1.api.riotgames.com/lol/static-data/v3/items';
    $param['locale'] = 'en_US';
    $param['tags'] = 'all';
    $output = $this->sendCommand($url,$param);
    return $output;
  }
  public function getMasteries(){
    $url = 'https://na1.api.riotgames.com/lol/static-data/v3/masteries';
    $param['locale'] = 'en_US';
    $param['tags'] = 'all';
    $output = $this->sendCommand($url,$param);
    return $output;
  }
}




?>
