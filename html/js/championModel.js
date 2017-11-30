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
      },
      runes : [
      ],
      item_stats : [
      ],
      item_list : [],
    },
    get AD() {
      var totalAd = 0;
      totalAd = parseInt(this.data.baseStats['Attack-Damage'],10) + this.runesAD_all + this.itemsAD;
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
    get baseAD(){
      return parseInt(this.data.baseStats['Attack-Damage'],10);
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
    get itemsAD(){
      return this.data.item_stats.reduce((c,e)=>{
        var flatAD = (e.FlatPhysicalDamageMod) ? e.FlatPhysicalDamageMod : 0 ;
        var flatADPerlevel = (e.FlatPhysicalDamageModPerLevel) ? e.FlatPhysicalDamageModPerLevel : 0 ;
        flatAD += flatADPerlevel*this.data.level;
        return c+flatAD;
      },0);
    },
    get baseAP(){
      return 0; // base AP is always 0
    },
    get AP() {
      var totalAP = 0;
      totalAP = this.runesAP_all + this.itemsAP;
      return totalAP;
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
    get itemsAP(){
      return this.data.item_stats.reduce((c,e)=>{
        var flatAP = (e.FlatMagicDamageMod) ? e.FlatMagicDamageMod : 0 ;
        var flatAPPerlevel = (e.FlatMagicDamageModPerLevel) ? e.FlatMagicDamageModPerLevel : 0 ;
        flatAP += flatAPPerlevel*this.data.level;
        return c+flatAP;
      },0);
    },
    get baseArmor(){
      return parseInt(this.data.baseStats['Armor'],10);
    },
    get Armor() {
      var totalarmor = 0;
      totalarmor = parseInt(this.data.baseStats['Armor'],10) + this.runesArmor_all + this.itemsArmor;
      return totalarmor;
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
    get itemsArmor(){
      return this.data.item_stats.reduce((c,e)=>{
        var flatArmor = (e.FlatArmorMod) ? e.FlatArmorMod : 0 ;
        var flatArmorPerlevel = (e.FlatArmorModPerLevel) ? e.FlatArmorModPerLevel : 0 ;
        flatArmor += flatArmorPerlevel*this.data.level;
        return c+flatArmor;
      },0);
    },
    get baseMR(){
      return parseInt(this.data.baseStats['Magic-Resist'],10);
    },
    get MR() {
      var totalMR = 0;
      totalMR = parseInt(this.data.baseStats['Magic-Resist'],10) + this.runesMR_all + this.itemsMR;
      return totalMR;
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
    get itemsMR(){
      return this.data.item_stats.reduce((c,e)=>{
        var flatMR = (e.FlatSpellBlockMod) ? e.FlatSpellBlockMod : 0 ;
        var flatMRPerlevel = (e.FlatSpellBlockModPerLevel) ? e.FlatSpellBlockModPerLevel : 0 ;
        flatMR += flatMRPerlevel*this.data.level;
        return c+flatMR;
      },0);
    },
    get baseHP(){
      return parseInt(this.data.baseStats['Health'],10);
    },
    get HP() {
      var totalHP = 0;
      totalHP = parseInt(this.data.baseStats['Health'],10) + this.runesHP_all + this.itemsHP;
      return totalHP || 0;
    },
    get runesHP_all(){
      return this.data.runes.reduce((c,e)=>{
        var flatHP = (e.FlatHPPoolMod) ? e.FlatHPPoolMod : 0 ;
        var flatHPPerlevel = (e.FlatHPModPerLevel) ? e.FlatHPModPerLevel : 0 ;
        flatHP += flatHPPerlevel*this.data.level;
        return c+flatHP;
      },0);
    },
    runesHP : function(tag){
      return this.data.runes.reduce((c,e)=>{
        var flatHP;
        if(e.type === tag){
          flatHP = (e.FlatHPPoolMod) ? e.FlatHPPoolMod : 0 ;
          var flatHPPerlevel = (e.FlatHPModPerLevel) ? e.FlatHPModPerLevel : 0 ;
          flatHP += flatHPPerlevel*this.data.level;
        }else{
          flatHP = 0;
        }
        return c+flatHP;
      },0);
    },
    get itemsHP(){
      return this.data.item_stats.reduce((c,e)=>{
        var flatHP = (e.FlatHPPoolMod) ? e.FlatHPPoolMod : 0 ;
        var flatHPPerlevel = (e.FlatHPModPerLevel) ? e.FlatHPModPerLevel : 0 ;
        flatHP += flatHPPerlevel*this.data.level;
        return c+flatHP;
      },0);
    },
    get baseMS(){
      return parseInt(this.data.baseStats['Movement-Speed'],10);
    },
    get MS(){
      var Flat_MS = this.data.item_stats.reduce((c,e)=>{
        var flatMS = (e.FlatMovementSpeedMod) ? e.FlatMovementSpeedMod : 0 ;
        return c+flatMS;
      },0);
      var Percent_MS = this.data.item_stats.reduce((c,e)=>{
        var percentMS = (e.PercentMovementSpeedMod) ? e.PercentMovementSpeedMod : 0 ;
        return c+percentMS;
      },0);
      return (parseInt(this.data.baseStats['Movement-Speed'],10)+Flat_MS)*(1+Percent_MS);
    },
    get itemsMS(){
      return this.data.item_stats.reduce((c,e)=>{
        var percentMS = (e.PercentMovementSpeedMod) ? e.PercentMovementSpeedMod : 0 ;
        return c+percentMS;
      },0);
    },
    get baseAS(){
      return Number(this.data.baseStats['Attack-Speed']);
    },
    get AS(){
      var champstats = lolcalculator.data.currentChampObj.champstats;
      var cal =  lolcalculator.lib.calculation;
      var runesbonus = this.runesAS_all; // not %
      var itembonus = this.itemsAS; // not %
      var bonus = runesbonus + itembonus;
      return cal.attackspeed.ASwithItemBonus(champstats.attackspeedoffset,champstats.attackspeedperlevel/100,this.data.level,bonus);
    },
    get runesAS_all(){
      return this.data.runes.reduce((c,e)=>{
        var percentAS = (e.PercentAttackSpeedMod) ? e.PercentAttackSpeedMod : 0 ;
        return c+percentAS;
      },0); // NOT %
    },
    runesAS : function(tag){
      //return percentage!!!!!!
      return 100*this.data.runes.reduce((c,e)=>{
        var percentAS;
        if(e.type === tag){
          var percentAS = (e.PercentAttackSpeedMod) ? e.PercentAttackSpeedMod : 0 ;
        }else{
          percentAS = 0;
        }
        return c+percentAS;
      },0);
    },
    get itemsAS(){
      return this.data.item_stats.reduce((c,e)=>{
        var percentAS = (e.PercentAttackSpeedMod) ? e.PercentAttackSpeedMod : 0 ;
        return c+percentAS;
      },0);
    },
    get baseCrit_Chance(){
      return 0 // base crit chance is always 0
    },
    get Crit_Chance() {
      var totalCrit_Chance = 0;
      totalCrit_Chance = this.itemsCrit_Chance + this.runesCrit_Chance_all;
      return totalCrit_Chance || 0;
    },
    get itemsCrit_Chance(){
      return this.data.item_stats.reduce((c,e)=>{
        var flatCrit_Chance = (e.FlatCritChanceMod) ? e.FlatCritChanceMod : 0 ;
        return c+flatCrit_Chance;
      },0);
    },
    get runesCrit_Chance_all(){
      return this.data.runes.reduce((c,e)=>{
        var flatCrit_Chance = (e.FlatCritChanceMod) ? e.FlatCritChanceMod : 0 ;
        return c+flatCrit_Chance;
      },0);
    },
    runesCrit_Chance : function(tag){
      return 100*this.data.runes.reduce((c,e)=>{
        var flatCrit_Chance;
        if(e.type === tag){
          flatCrit_Chance = (e.FlatCritChanceMod) ? e.FlatCritChanceMod : 0 ;
        }else{
          flatCrit_Chance = 0;
        }
        return c+flatCrit_Chance;
      },0);
    },
    reset : function(){
      this.data.baseStats = null;
      this.data.level = 1;
      this.data.item_stats = [];
      this.data.item_list = [];
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
