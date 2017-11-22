(function(championModelFactory){
  championModelFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;
  /*
  Armor:"38.3"
  Attack-Damage:"60.44"
  Attack-Speed:"0.653"
  Health:"687.7"
  Health-Regen:"7.867"
  Magic-Resist:"32.0"
  Movement-Speed : "330"
  */
  lolcalculator.championModel = {
    data : {
      level : 1,
      baseStats : {
        'Attack-Damage' : 100
      },
      runes : [
      ],
      item_stats : [
        {ad : 10},
        {ad : 20},
      ],
      item_list : [],
    },
    get ad() {
      var totalAd = this.data.baseStats['Attack-Damage'] + this.runesAD + this.itemsAD;
      return totalAd;
    },
    get runesAD_all(){
      //FlatPhysicalDamageMod ,  PercentPhysicalDamageMod   FlatPhysicalDamageModPerLevel
      //There's no percentAD in runes
      return this.data.runes.reduce((c,e)=>{
        var flatAD = (e.FlatPhysicalDamageMod) ? e.FlatPhysicalDamageMod : 0 ;
        var flatADPerlevel = (e.FlatPhysicalDamageModPerLevel) ? e.FlatPhysicalDamageModPerLevel : 0 ;
        flatAD += flatADPerlevel*this.data.level;
        return c+flatAD;
      },0);
    },
    runesAD : function(tag){
      //FlatPhysicalDamageMod ,  PercentPhysicalDamageMod   FlatPhysicalDamageModPerLevel
      //There's no percentAD in runes
      return this.data.runes.reduce((c,e)=>{
        var flatAD;
        if(e.type === tag){
          flatAD = (e.FlatPhysicalDamageMod) ? e.FlatPhysicalDamageMod : 0 ;
          var flatADPerlevel = (e.FlatPhysicalDamageModPerLevel) ? e.FlatPhysicalDamageModPerLevel : 0 ;
          flatAD += flatADPerlevel*this.data.level;
        }else{
          flatAD = 0;
        }
        return c+flatAD;
      },0);
    },
    get runesAP_all(){
      return this.data.runes.reduce((c,e)=>{
        var flatAP = (e.FlatMagicDamageMod) ? e.FlatMagicDamageMod : 0 ;
        var flatAPPerlevel = (e.FlatMagicDamageModPerLevel) ? e.FlatMagicDamageModPerLevel : 0 ;
        flatAP += flatAPPerlevel*this.data.level;
        return c+flatAP;
      },0);
    },
    runesAP : function(tag){
      //FlatPhysicalDamageMod ,  PercentPhysicalDamageMod   FlatPhysicalDamageModPerLevel
      //There's no percentAD in runes
      return this.data.runes.reduce((c,e)=>{
        var flatAP;
        if(e.type === tag){
          flatAP = (e.FlatMagicDamageMod) ? e.FlatMagicDamageMod : 0 ;
          var flatAPPerlevel = (e.FlatMagicDamageModPerLevel) ? e.FlatMagicDamageModPerLevel : 0 ;
          flatAP += flatAPPerlevel*this.data.level;
        }else{
          flatAP = 0;
        }
        return c+flatAP;
      },0);
    },
    get runesArmor_all(){
      return this.data.runes.reduce((c,e)=>{
        var flatArmor = (e.FlatArmorMod) ? e.FlatArmorMod : 0 ;
        var flatArmorPerlevel = (e.FlatArmorModPerLevel) ? e.FlatArmorModPerLevel : 0 ;
        flatArmor += flatArmorPerlevel*this.data.level;
        return c+flatArmor;
      },0);
    },
    runesArmor : function(tag){
      //FlatPhysicalDamageMod ,  PercentPhysicalDamageMod   FlatPhysicalDamageModPerLevel
      //There's no percentAD in runes
      return this.data.runes.reduce((c,e)=>{
        var flatAP;
        if(e.type === tag){
          flatArmor = (e.FlatArmorMod) ? e.FlatArmorMod : 0 ;
          var flatArmorPerlevel = (e.FlatArmorModPerLevel) ? e.FlatArmorModPerLevel : 0 ;
          flatArmor += flatArmorPerlevel*this.data.level;
        }else{
          flatArmor = 0;
        }
        return c+flatArmor;
      },0);
    },
    get runesMR_all(){
      return this.data.runes.reduce((c,e)=>{
        var flatMR = (e.FlatSpellBlockMod) ? e.FlatSpellBlockMod : 0 ;
        var flatMRPerlevel = (e.FlatSpellBlockModPerLevel) ? e.FlatSpellBlockModPerLevel : 0 ;
        flatMR += flatMRPerlevel*this.data.level;
        return c+flatMR;
      },0);
    },
    runesMR : function(tag){
      //FlatPhysicalDamageMod ,  PercentPhysicalDamageMod   FlatPhysicalDamageModPerLevel
      //There's no percentAD in runes
      return this.data.runes.reduce((c,e)=>{
        var flatMR;
        if(e.type === tag){
          flatMR = (e.FlatSpellBlockMod) ? e.FlatSpellBlockMod : 0 ;
          var flatMRPerlevel = (e.FlatSpellBlockModPerLevel) ? e.FlatSpellBlockModPerLevel : 0 ;
          flatMR += flatMRPerlevel*this.data.level;
        }else{
          flatMR = 0;
        }
        return c+flatMR;
      },0);
    },
    reset : function(){
      this.data.baseStats = null;
      this.data.level = 1;
      this.data.items = [];
      this.data.runes = [];
    },
    loadBaseStats : function(baseStats){
      this.data.baseStats = baseStats;
    },
    setLevel:function(level) {
      this.data.level = level;
    }
  };
  return lolcalculator;
}));
