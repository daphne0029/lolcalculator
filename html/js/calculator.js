(function(CalculatorFactory){
  CalculatorFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;

  lolcalculator.roledefine = function(info){
    var role = "";
    if(info.attack > 5){
      role = "marksman";
    }else if (info.magic > 5) {
      role = "mage";
    }
    return role;
  };
  lolcalculator.indexfinding = function(id,array){
    var i = 0;
    var index = -1;
    var champid;
    array.find((ele,i)=>{
      champid = Number(ele.champID);
      if(champid == id){
        index = i;
        return true;
      };
    });
    return index;
  };
  lolcalculator.getChampionData = function(champId) {
    var champgeninfo_i = lolcalculator.indexfinding(champId,data.DBdata.champgeninfo);
    var champstats_i = lolcalculator.indexfinding(champId,data.DBdata.champstats);
    var champpassives_i = lolcalculator.indexfinding(champId,data.DBdata.champpassives);
    var champspells_i = lolcalculator.indexfinding(champId,data.DBdata.champspells);
    return {
      champgeninfo : data.DBdata.champgeninfo[champgeninfo_i],
      champstats : data.DBdata.champstats[champstats_i],
      champpassives : data.DBdata.champpassives[champpassives_i],
      champspells : data.DBdata.champspells[champspells_i]
    };
  };

  lolcalculator.spawnCalculator = function(){
    var champObject = lolcalculator.getChampionData(data.currentChampID);
    lolcalculator.data.currentChampObj = champObject;
    var role = lolcalculator.roledefine(JSON.parse(champObject.champgeninfo.info));
    var imagpath = "url(./assets/ChampionProfile/" + data.currentChampID + ".jpg)";

    var view = lolcalculator.buildHeaderView('Calculator');
    view += `<div class="body">
        <button class="reselectbutton">Re-select a Champion</button>
        <div class="championprofile">
          <div class="championbackground">
            <div class="shadowblock">
              <div class="champinfo">
                <img class="role" src="/assets/Roles/${role}.png" alt="${role}.png">
                <div class="champname">${champObject.champgeninfo.champName}</div>
                <div class="champtitle">${champObject.champgeninfo.title}</div>
              </div>
              <div class="generalinfo">`;
    view = addstatusArea(JSON.parse(champObject.champgeninfo.info),view);
    view = addAbility(champObject.champspells,champObject.champpassives,view);
    view = addbasicstats(champObject.champstats,view);
    view += `</div></div></div></div>`; //adter champion profile
    view = lolcalculator.RunesView(view); // Display Runes's page!!!
    view += lolcalculator.FrameView();
    view += lolcalculator.SummaryView();
    view += `</div>`;
    view += lolcalculator.buildFooterView();

    lolcalculator.Calculatorevents(champObject);
    $('#'+config.appContainerId).empty();
    $('#'+config.appContainerId).html(view);
    $(".championbackground").css("background-image", imagpath);

  };

    lolcalculator.Calculatorevents = function(champObject){
      console.log('building calculator events')
      $(document).ready(function(){
        $('.reselectbutton').click(function(){
          lolcalculator.spawnHome();
          console.log("going to home page");
        });
        $('.ablility-indi').mouseenter(function(){
          $('.ability-description-block').fadeIn();
          var indi_id = $(this).attr('id').replace('indi_','');
          var name = "";
          if(indi_id==0){
            name = `<div class="ability-discription-title">` + JSON.parse(champObject.champpassives.data).name + "</div>";
            $('.ability-discription-text').html(name+"<br>"+JSON.parse(champObject.champpassives.data).description).show();
          }else{
            var i = indi_id-1;
            name = `<div class="ability-discription-title">` + JSON.parse(champObject.champspells.data)[i].name + "</div>";
            $('.ability-discription-text').html(name+"<br>"+JSON.parse(champObject.champspells.data)[i].description).show();
          };
        });
        $('.ablility-indi').mouseleave(function(){
          $('.ability-description-block').toggle();
          $('.ability-discription-text').html("").hide();
        });
        $('.dropbtn').click(function(){
          console.log("Button clicked");
          $("#leveldropdown").toggle();
        });
        window.onclick = function(event){
          if(!event.target.matches('.dropbtn')){
              $("#leveldropdown").hide();
          }
        };
        $("[herf^='#Level']").click(function(){
          var level = $(this).attr('herf').replace('#Level','');
          console.log("Level " + level + "Chosen");
          lolcalculator.updatebasicstats(level,champObject);
          $(".dropbtn").html("Level "+level);
          $(".frame-level-bubble").html(level);
          $("#leveldropdown").hide();
        });
        lolcalculator.runesEvents();
        lolcalculator.FrameEvents();
        lolcalculator.SummaryEvents();
      });
    };

    lolcalculator.updatebasicstats = function(level,champObject){
      lolcalculator.calculatestats(level,champObject.champstats);
      var Newstats = lolcalculator.championModel.data.baseStats;
      Object.keys(lolcalculator.championModel.data.baseStats).forEach(function(element){
        $("#stat-title-"+element+" > .champstats-text").html(Newstats[element]);
      });
    };
    lolcalculator.calculatestats = function(level,champstats){
      var cal = lolcalculator.lib.calculation;
      var Newstats = {};
      console.log("Level " + level);
      Newstats["Health"] = cal.general.HPbyLevel(champstats.hp,champstats.hpperlevel,level);
      Newstats["Health-Regen"] = cal.regen.HPbylevel(champstats.hpregen,champstats.hpregenperlevel,level);
      Newstats["Attack-Damage"] = cal.offense.AttackDamagebyLevel(champstats.attackdamage,champstats.attackdamageperlevel,level);
      Newstats["Armor"] = cal.general.ArmorbyLevel(champstats.armor,champstats.armorperlevel,level);
      Newstats["Attack-Speed"] = cal.attackspeed.ASbyLevel(champstats.attackspeedoffset,champstats.attackspeedperlevel/100,level);
      Newstats["Magic-Resist"] = cal.general.MRbyLevel(champstats.magicresistance,champstats.magicresistanceperlevel,level);
      Newstats["Movement-Speed"] = champstats.movementspeed;
      console.log(Newstats);
      lolcalculator.championModel.loadBaseStats(Newstats);
      console.log('setLevel',level);
      lolcalculator.championModel.setLevel(level);
      lolcalculator.showstats();
      return true;
    };
    function addbasicstats(champstats,view){
      console.log(champstats);
      var stats_title = ["Health","Health-Regen","Attack-Damage","Armor","Attack-Speed","Magic-Resist","Movement-Speed"];
      var attackspeed = lolcalculator.lib.calculation.attackspeed.BaseAttackSpeed(parseFloat(champstats.attackspeedoffset));
      var stats_text = [
        parseFloat(champstats.hp).toFixed(1),            parseFloat(champstats.hpregen).toFixed(3),
        parseFloat(champstats.attackdamage).toFixed(2),  parseFloat(champstats.armor).toFixed(1),
        parseFloat(attackspeed).toFixed(3),              parseFloat(champstats.magicresistance).toFixed(1),
        parseFloat(champstats.movementspeed)
      ];
      view += '<div class="champstats-area">';
    //Dropdown List----------------------------
      view += `<div class="champstats-dropdown">
        <button class="dropbtn">Select Level</button>
        <div id="leveldropdown" class="dropdown-content">`;
      for(var x=0; x<18; ++x){
        view += `<a herf="#Level${x+1}">Level ${x+1}</a>`;
      }
      view +=`</div></div>`;
    //-----------------------------------------
      for(var i=0; i<stats_title.length; ++i){
        view += `<div id="stat-title-${stats_title[i]}" class="champstats-block">
          <div class="champstats-title">${stats_title[i].replace("-"," ")}:</div>
          <div class="champstats-text" >${stats_text[i]}</div>
        </div>`
      }
      view += '</div>';
      return view;
    };

    function addAbility(champspells,champpassives,view){
      var spells = JSON.parse(champspells.data);
      console.log(spells);
      var passive = JSON.parse(champpassives.data);
      console.log(passive);
      view += `<div class="ability-block">
                <div class="ability-row">`;
      var imgString = "";
      var abilitytable = ["P","Q","W","E","R"];
      for(var i=0;i<5;++i){
        if(i==0){
          imgString = `<img class="abilities" src="/assets/Ability/${data.currentChampID}-P.png" alt="${passive.name}">`;
        }else{
          imgString = `<img class="abilities" src="/assets/Ability/${data.currentChampID}-${abilitytable[i]}.png" alt="${spells[i-1].name}">`;
        };
        view += `
        <div class="ablility-indi" id="indi_${i}">
          ${imgString}
          <div class="arrow">^</div>
        </div>`;

      };
      view += ` </div>
                <div class="ability-description-block">
                  <div class="ability-discription-text">${passive.name}<br><br>${passive.description}</div>
                </div>
              </div>`;
      return view;
    };

    function addstatusArea(info,view){
      var statstitle = ["Defense","Attack","Magic","Difficulty"];
      var stats = 0;
      for(var i=0;i<4;++i){
          view += `<div class="stats-area">
            <span class="stats-title">${statstitle[i]}</span>
            <div class="progress_bar">`;
            if(i==0){
              stats = info.defense;
            }else if (i==1) {
              stats = info.attack;
            }else if (i==2) {
              stats = info.magic;
            }else {
              stats = info.difficulty;
            };
            for(var j=0;j<10;++j){
              if(j<stats){
                view += `<div class="bg checked"></div>`;
              }else{
                view += `<div class="bg"></div>`;
              }
            };
          view += `</div>
        </div>`;
      };
      return view;
    };

  return lolcalculator;
}));
