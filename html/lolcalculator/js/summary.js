(function(championModelFactory){
  championModelFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;

  lolcalculator.SummaryView = function(){
    var view = "";
    view += calculateBtn();
    // view += BuildSummaryView();
    return view;
  };

  lolcalculator.SummaryEvents = function(){
    $(".summary-calculate-btn").click(function(){
      var view = "";
      $(".body").children(".summary").empty();
      view = BuildSummaryView();
      $(".body").append(view);
      $(".summary").fadeIn("slow");
      Events_Summary_block();
    });

  };

  function BuildSummaryView(){
    var view = "";
    view += `<div class="summary" style="display:none">`;
    view += `<div class="summary-title-title">Summary`;
    view += `</div>`;
    view += `<div class="summary-frame">`;
    view += `<div class="summary-inner-block">`;
    view += display_title();
    view += display_stats();// General, Offense, Defense, Other
    view += `</div>`;
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  function display_item(){
    var view = "";
    var path = "";
    var itemList = lolcalculator.championModel.data.item_list;
    view += `<div class="summary-item-block">`;
    view += `<div class="summary-item-data">`;
    itemList.forEach((e)=>{
      path = "assets/Items/" + e + ".png";
      view += `<img class="summary-itemd-data-icon" src="/${path}" alt=${e}>`;
    });
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  function display_level(){
    var view = "";
    view += `
    <div class="summary-level-block">
      <div class="summary-level-data">Level ${lolcalculator.championModel.data.level}
      </div>
    </div>`;
    return view;
  };

  function calculateBtn(){
    var view = "";
    view += `<div class="summary-calculate-button">`;
    view += `<button type="button" class="summary-calculate-btn">Calculate Stats</button>`
    view += `</div>`;
    return view;
  };

  function Events_Summary_block(){
    $(".summary-stats-row").mouseenter(function(){
      $(this).children(".summary-stats-col3").toggle();
      var tag = $(this).attr("id").replace(/summary-/,"");
      var view = show_detail_stats(tag);
      $(".summary-stats-text").eq(1).append(view);
    });
    $(".summary-stats-row").mouseleave(function(){
      $(this).children(".summary-stats-col3").toggle();
      $(".summary-stats-text").eq(1).empty();
    });
  };

  function show_detail_stats(tag){
    var view = "";
    var Model = lolcalculator.championModel;
    var calfunctions = {
      "AD" : [Model.baseAD,Model.runesAD_all,Model.itemsAD],
      "AP" : [Model.baseAP,Model.runesAP_all,Model.itemsAP],
      "Armor" : [Model.baseArmor,Model.runesArmor_all,Model.itemsArmor],
      "MR" : [Model.baseMR,Model.runesMR_all,Model.itemsMR],
      "HP" : [Model.baseHP,Model.runesHP_all,Model.itemsHP],
      "AS" : [Model.baseAS,Math.round(Model.runesAS_all*100),Model.itemsAS*100],
      "MS" : [Model.baseMS,0,Model.itemsMS*100],
      "Crit_Chance" : [Model.baseCrit_Chance,Model.runesCrit_Chance_all*100,Model.itemsCrit_Chance*100],
      "Lethality" : [0,0,Model.itemsLethality],
      "Magic_Penetration" : [0,Model.runesMagicPen_all,Model.itemsMagicPen],
    };
    //Displat note:
    //  Base AS NOT in %, but item and rune in % form
    //  Crit chance all in %
    var percentstr = "";
    if (tag == "Crit_Chance" || tag == "AS" || tag == "MS"){
      percentstr = "%";
    };
    view += `<div class="summary-stats-text-detail">`;
    view += `
    <span class="summary-stats-text-detail-title">Stats Breakdown:</span>
    <br><br>
    <span class="summary-stats-text-detail-title">Base: </span>
    <span class="summary-stats-text-detail-data">${calfunctions[tag][0]}</span>
    <br>
    <span class="summary-stats-text-detail-title">Runes: </span>
    <span class="summary-stats-text-detail-data">${calfunctions[tag][1].toFixed(1)} ${percentstr}</span>
    <br>
    <span class="summary-stats-text-detail-title">Item: </span>
    <span class="summary-stats-text-detail-data">${calfunctions[tag][2].toFixed(1)} ${percentstr}</span>
    `;
    view += `</div>`;
    return view;
  };

  function display_stats_One(){
    var view = "";
    view += `<div class="summary-stats-data">`;
    // var filteredStats = filterTag(enabledTag);
    var calculatedStats = {};
    // console.log(filteredStats);
    view += `<div class="summary-stats-display">`;
    view += `
    <div class="summary-stats-text">
      <div class="summary-stats-row" id="summary-HP">
        <div class="summary-stats-col1">Health</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.HP)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-MS">
        <div class="summary-stats-col1">Movement Speed</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.MS)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-AD">
        <div class="summary-stats-col1">Attack Damage</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.AD)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-Crit_Chance">
        <div class="summary-stats-col1">Critical Chance</div>
        <div class="summary-stats-col2">${(lolcalculator.championModel.Crit_Chance*100).toFixed(1)} %</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-AS">
        <div class="summary-stats-col1">Attack Speed</div>
        <div class="summary-stats-col2">${lolcalculator.championModel.AS.toFixed(3)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-AP">
        <div class="summary-stats-col1">Ability Power</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.AP)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-Armor">
        <div class="summary-stats-col1">Armor</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.Armor)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-MR">
        <div class="summary-stats-col1">Magic Resist</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.MR)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-Lethality">
        <div class="summary-stats-col1">Lethality</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.Lethality)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
      <div class="summary-stats-row" id="summary-Magic_Penetration">
        <div class="summary-stats-col1">Magic Penetration</div>
        <div class="summary-stats-col2">${Math.round(lolcalculator.championModel.MagicPen)}</div>
        <div class="summary-stats-col3"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </div>
    </div>
    `;
    view += `</div>`; //close class="summary-stats-display"
    view += `</div>`; //close class="summary-stats-data"

    return view;
  };

  function display_stats_Two(appendedView){
    var view = "";
    view += `<div class="summary-stats-data">`;
    // var filteredStats = filterTag(enabledTag);
    var calculatedStats = {};
    view += `<div class="summary-stats-display">`;
    view += `
    <div class="summary-stats-text">
    </div>
    `;
    view += `</div>`; //close class="summary-stats-display"
    view += `</div>`; //close class="summary-stats-data"
    return view;
  };

  // function filterTag(enabledTag){
  //   var enabledStats = lolcalculator.enabledStats;
  //   var filteredStats = Object.keys(enabledStats).filter((e,i)=>{
  //     if(enabledTag.indexOf(e) > -1){
  //       return true;
  //     };
  //   }).map((e)=>{return enabledStats[e]}).reduce((a,c)=>{
  //     a = a.concat(c);
  //     return a;
  //   },[]);
  //   return filteredStats;
  // };

  function display_stats(){
    var view = "";
    view += `<div class="summary-stats-block">`;
    view += `<div class="summary-stats-block-half">`;
    view += display_stats_One(); //Gen, Defense
    view += `</div>`;
    view += `<div class="summary-stats-block-half">`;
    view += display_stats_Two(); //Offense, Other
    view += `</div>`;
    view += `</div>`;
    //General: HP, MS
    //2nd HP regen, MP regen, energy regen, MP, Energy
    //Offense: AD, AP, AS
    //2nd: AD pen, AP pen
    //3rd: crit chance, crit dmg
    //Defense: Armor, MR
    //Other: CDR, spellVamp, life steal
    return view;
  };

  function display_title(){
    var view = "";
    view += `<div class="summary-title">`;
    view += `<div class="summary-title-block">`;
    view += `<div class="summary-title-name">${lolcalculator.data.currentChampName}`;
    view += `</div>`;
    view += display_level();
    view += display_item();
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  return lolcalculator;
}));
