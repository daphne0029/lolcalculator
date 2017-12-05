(function(CalculationFactory){
  CalculationFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;
  lolcalculator.lib = {
    calculation : {
      attackspeed : null,
      general : null,
      offense : null,
      regen : null,
    },
  };

  lolcalculator.lib.calculation.offense = {
    AttackDamagebyLevel : function(base,growth,level){
      base = parseFloat(base);
      growth = parseFloat(growth);
      level = parseFloat(level);
      var finalstats = 0;
      finalstats = base + growth*(level-1)*(0.685+0.0175*level);
      return parseFloat(finalstats.toFixed(2));
    },
  };

  lolcalculator.lib.calculation.regen = {
    HPbylevel : function(base,growth,level){
      base = parseFloat(base);
      growth = parseFloat(growth);
      level = parseFloat(level);
      var finalstats = 0;
      finalstats = base + growth*(level-1)*(0.685+0.0175*level);
      return parseFloat(finalstats.toFixed(3));
    },
    MPbylevel :function(base,growth,level){
      base = parseFloat(base);
      growth = parseFloat(growth);
      level = parseFloat(level);
      var finalstats = 0;
      finalstats = base + growth*(level-1)*(0.685+0.0175*level);
      return parseFloat(finalstats.toFixed(3));
    },
  };

  lolcalculator.lib.calculation.general = {
    HPbyLevel : function(base,growth,level){
      base = parseFloat(base);
      growth = parseFloat(growth);
      level = parseFloat(level);
      var finalstats = 0;
      finalstats = base + growth*(level-1)*(0.685+0.0175*level);
      return parseFloat(finalstats.toFixed(1));
    },
    MPbyLevel : function(base,growth,level){
      base = parseFloat(base);
      growth = parseFloat(growth);
      level = parseFloat(level);
      var finalstats = 0;
      finalstats = base + growth*(level-1)*(0.685+0.0175*level);
      return parseFloat(finalstats.toFixed(1));
    },
    ArmorbyLevel : function(base,growth,level){
      base = parseFloat(base);
      growth = parseFloat(growth);
      level = parseFloat(level);
      var finalArmor = 0;
      finalArmor = base + growth*level;
      return parseFloat(finalArmor.toFixed(1));
    },
    MRbyLevel : function(base,growth,level){
      base = parseFloat(base);
      growth = parseFloat(growth);
      level = parseFloat(level);
      var finalMP = 0;
      finalMP = base + growth*level;
      return parseFloat(finalMP.toFixed(1));
    }
  };

lolcalculator.lib.calculation.attackspeed = {
  ASwithItemBonus : function(offset,growth,level,itembonus){
    offset = parseFloat(offset);
    growth = parseFloat(growth);
    level = parseFloat(level);
    itembonus = parseFloat(itembonus);
    var finalAS = 0;
    var levelbonus = 0;
    var baseAS = 0;
    baseAS = this.BaseAttackSpeed(offset);
    levelbonus = this.bonusASbyLevel(growth,level);
    finalAS = baseAS + (baseAS * (levelbonus+itembonus));
    console.log(finalAS);
    return parseFloat(finalAS.toFixed(3));
  },
  BaseAttackSpeed : function(offset){
    offset = parseFloat(offset);
    var baseAS = 0;
    baseAS = 0.625/(1+offset);
    return parseFloat(baseAS.toFixed(3));
  },
  ASbyLevel : function(offset,growth,level){
    offset = parseFloat(offset);
    growth = parseFloat(growth);
    level = parseFloat(level);
    var finalAS = 0;
    var baseAS = 0;
    var bonusAS = 0;
    baseAS = parseFloat(this.BaseAttackSpeed(offset));
    bonusAS = this.bonusASbyLevel(growth,level,baseAS);
    finalAS = baseAS + (baseAS*bonusAS);
    console.log("finalAS = " + finalAS);
    return parseFloat(finalAS.toFixed(3));
  },
  bonusASbyLevel : function(growth,level){
    growth = parseFloat(growth);
    level = parseFloat(level);
    var bonusAS;
    bonusAS = growth*(7/400*(Math.pow(level,2)-1)+267/400*(level-1));
    return parseFloat(bonusAS.toFixed(3));
  }
};

  return lolcalculator;
}));
