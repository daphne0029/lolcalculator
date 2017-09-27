<?php

class riotAPI {
  private $APIkey = 'RGAPI-a28f01b9-3882-4e7b-ba25-4f6c54838b53';
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
    //$output = $this->sendCommand($url,$param);
    $championAll = file_get_contents('D:/xampp/htdocs/daphne/lolcalculator/allchampions.json');
    //echo $championAll;
    $output = json_decode($championAll, true);
    //echo json_encode($output);
    return $output;
  }
}




?>
