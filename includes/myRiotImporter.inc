<?php
require('config.inc');
if (!class_exists('myRiotImporter')) {
  require 'riotAPI.inc';
  class myRiotImporter {
    private $riotAPI;
    private $excludeRunes = array(8019,8020,8021,8022,8035,10001,10002);
    public function __construct() {
      $this->riotAPI = riotAPI::getInstance();
    }
    public function import($options = array()) {
      $output = array();
      if($options['champions']){
        $output['champions'] = $this->importChampions();
      }
      if($options['runes']){
        $output['runes'] = $this->importRunes();
      }
      if($options['items']){
        $output['items'] = $this->importItems();
      }
      if($options['masteries']){
        $output['masteries'] = $this->importMasteries();
      }

      return $output;
    }
    public function importMasteries(){
      $res = $this->riotAPI->getMasteries();
      $output = $this->processmasteries($res);
      return $output;
    }
    public function  importItems(){
      $res = $this->riotAPI->getItems();
      $output = $this->processitems($res);
      return $output;
    }
    public function importRunes(){
      $res = $this->riotAPI->getRunes();
      $output = $this->processrunes($res);
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
    public function processmasteries($res){
      foreach($res['data'] as $data){
        $id = $data['id'];
        $masteries[$id] = $this->getmasteries($data,$res['tree']);
      }
      return $masteries;
    }
    public function processitems($res){
      foreach($res['data'] as $data){
        $id = $data['id'];
        //filters--------------------------------
        if (empty($data['name']) || empty($data['description'])) continue;
        if(!$data['maps'][11]) continue;
        if(!$data['gold']['purchasable']) continue;
        //---------------------------------------
        $items[$id] = $this->getitems($data,$id);
      }
      return $items;
    }
    public function processrunes($res){
      //$count = 0;.
      foreach($res['data'] as $data){
        $id = $data['id'];
        if (in_array($id,$this->excludeRunes)) continue;
        if($data['rune']['tier'] == 3){
            $wantedRunes[$id] = $this->getrunes($data,$id);
            //$count += 1;
        }
      }
      //echo $count;
      $runes = $wantedRunes;
      return $runes;
    }
    public function processchampions($res){
      //stats: champid, name, armor, armorperlvl,..., etc.
      foreach($res['data'] as $data){
        $champN = $data['name'];
        //*** Process Champion Data ***
        $champions['champgeninfo'][$champN] = $this->getchampgeninfo($data);
        $champions['stats'][$champN] = $this->getchampstats($data);
        $champions['champ_spells'][$champN] = $this->getspells($data);
        $champions['champ_passive'][$champN] = $this->getpassive($data);
      }
      return $champions;
    }
    public function getchampgeninfo($data){
      $info['champid'] = $data['id'];
      $info['name'] = $data['name'];
      $info['info'] = $data['info'];
      //$info['champgeninfo']['tag'] = $data['tag'];
      $info['title'] = $data['title'];
      $info['allytips'] = $data['allytips'];
      $info['enemytips'] = $data['enemytips'];
      return $info;
    }
    public function getchampstats($data){
      $data['stats']['champid'] = $data['id'];
      $data['stats']['champName'] = $data['name'];
      $info = $data['stats'];
      return $info;
    }
    public function getspells($data){
      $champ_spell['spell'] = $data['spells'];
      $champ_spell['champid'] = $data['id'];
      return $champ_spell;
    }
    public function getpassive($data){
      $champ_passive['passive'] = $data['passive'];
      $champ_passive['champid'] = $data['id'];
      return $champ_passive;
    }
    public function getrunes($data,$id){
      $wantedRunes['id'] = $data['id'];
      $wantedRunes['name'] = $data['name'];
      $wantedRunes['description'] = $data['description'];
      $wantedRunes['tags'] = $data['tags'];
      $wantedRunes['type'] = $data['rune']['type'];
      $wantedRunes['tier'] = $data['rune']['tier'];
      $wantedRunes['stats'] = $data['stats'];
      return $wantedRunes;
    }
    public function getitems($data,$id){
      $items['id'] = $id;
      $items['name'] = $data['name'];
      $items['description'] = $data['description'];
      $tags = (empty($data['tags'])) ? NULL : $data['tags'];
      $items['tags'] = $tags;
      $items['gold'] = $data['gold'];
      $depth = (empty($data['depth'])) ? NULL : $data['depth'];
      $items['depth'] = $depth;
      $from = (empty($data['from'])) ? NULL : $data['from'];
      $items['from'] = $from;
      $into = (empty($data['into'])) ? NULL : $data['into'];
      $items['into'] = $into;
      $effect = (empty($data['effect'])) ? NULL : $data['effect'];
      $items['effect'] = $effect;
      $items['stats'] = $data['stats'];
      return $items;
    }
    public function getmasteries($data,$tree){
      $masteries['id'] = $data['id'];
      $masteries['name'] = $data['name'];
      $masteries['description'] = $data['description'];
      $masteries['ranks'] = $data['ranks'];
      $masteries['masteryTree'] = $data['masteryTree'];
      for($i=0;$i<=5;$i++){
        for($j=0;$j<=2;$j++){
          $masteryID = (empty($tree[$masteries['masteryTree']][$i]['masteryTreeItems'][$j]['masteryId'])) ? null : $tree[$masteries['masteryTree']][$i]['masteryTreeItems'][$j]['masteryId'];
          if($masteryID == $masteries['id']){
            $masteries['level'] = $i;
            $masteries['col'] = $j;
          }
        }
      }
      return $masteries;
    }
  }//close class myRiotImporter
}//close if class exists





?>
