(function(RunesMasteriesFactory){
  RunesMasteriesFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;

  lolcalculator.RunesView = function(view){
    view += `<div class="runes">
    <div class="runes-description">
    **Right click to clear runes!</div>
    <div class="runes-background">`;
    view += `
    <div id="mark" class="runes-section">
      <div class="runes-section-title mark-title">MARK</div>
      <div class="runes-section-main" value="mark">`;
    view += add4smallsection('mark');
    view += `
    </div>
    <div class="runes-section-stats"></div>
    </div>`;
    //---------------------------
    view += `
    <div id="glyph" class="runes-section">
      <div class="runes-section-title glyph-title">GLYPH</div>
      <div class="runes-section-main" value="glyph">`;
    view += add4smallsection('glyph');
    view += `</div>
    <div class="runes-section-stats"></div>
    </div>`;
   //-------------------------------------------------
    view += `
    <div id="seal" class="runes-section">
    <div class="runes-section-title seal-title">SEAL</div>
    <div class="runes-section-main" value="seal">`;
    view += add4smallsection('seal');
    view += `</div>
    <div class="runes-section-stats"></div>
    </div>`;
    //-------------------------------------------
    view +=`
    <div id="quint" class="runes-section">
    <div class="runes-section-title Quint-title">QUITESSENCE</div>
    <div class="runes-section-main" value="quint">`;
    view += add4smallsection('quint');
    view += `</div>
    <div class="runes-section-stats"></div>
    </div>`;
    view +=`</div>`; //close runes-background
    //--------------Modal------------------
    //
    view+=`</div>`;// close <div class="runes">


    return view;
  };
//<img class="runes-img-icon" data-toggle="modal" data-target="#myModal" src="/assets/Runes/blank.png" alt="blank.png">
  function add4smallsection(tag){
    var view="";
    var quint4 = "";
    var imghtml = "";
    var inputhtml = "";
    for(var i=0; i<4;++i){
      if(tag=="quint" && i==3){ quint4 = `style="display: none"`;};
      if(lolcalculator.data['Hasdefault']){
        imghtml = modify_runesimg(tag,i);
        inputhtml = modify_runesquantity(tag,i);
      }else{
        imghtml = `<img onclick="lolcalculator.displayRuneSelectModal('${tag}',${i+1})" class="runes-img-icon" src="/assets/Runes/blank.png" alt="blank.png">`;
        inputhtml = `<input class="amount-input form-control" type="int">`;
      };
      view += `<div class="runes-section-img" id="section-img-${tag}-${i+1}" ${quint4}>`;
      view += imghtml;
      view += `<div class="runes-amount">x</div>`;
      view += inputhtml;
      view += `</div>`;
    };
    //modify with url data

    return view;
  };

  function modify_runesimg(tag,i){
    var runestats = lolcalculator.data.selectedRunes.runestats;
    //check if stats array is Empty
    var view = `<img onclick="lolcalculator.displayRuneSelectModal('${tag}',${i+1})" class="runes-img-icon"
    src="/assets/Runes/blank.png" alt="blank.png">`;
    if(!(Object.keys(runestats[tag]).length === 0 && runestats[tag].constructor === Object)){
      if(runestats[tag][i].length > 0){
        var runeID = runestats[tag][i][0]['ID'];
        var runeName = tag + "_" + runeID;
        view = `<img onclick="lolcalculator.displayRuneSelectModal('${tag}',${i+1})" class="runes-img-icon"
        src="/assets/Runes/${runeName}.png" alt="${runeName}.png">`;
      };
    };

    return view;
  };

  function modify_runesquantity(tag,i){
    var runesquantity = lolcalculator.data.selectedRunes.runesquantity;
    var view = "";
    var quantity = 0;
    if(runesquantity[tag][i] > 0){
      quantity = runesquantity[tag][i];
      view = `<input class="amount-input form-control" type="int" value="${quantity}">`;
    }else{
      view = `<input class="amount-input form-control" type="int">`;
    };
    return view;
  };

  lolcalculator.displayRuneSelectModal = function(tag,field){
    //insert modal view
    addruneselectModal(tag,field);
    //display modal view
    setTimeout(()=>{
      $("#myModal").addClass("in");
    },200);
  };

  function addruneselectModal(tag,field){
    var removeList = lolcalculator.disableList.runes;
    var view = `
    <div class="mask"></div>
    <div class="modal fade" id="myModal" role="dialog" >
      <div class="modal-dialog rune-modal-block" id="rune-modal-padding">

        <!-- Modal content-->
        <div class="modal-content" id="runeselect-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Select Runes</h4>
            </div>
            <div class="modal-body rune-modal-body">`;
    view += `<div class="runes-display-block">`;
    data.DBdata.runesimg.filter((item)=>{
      if(item.type == tag){
        if(removeList.indexOf(parseInt(item.id,10)) < 0){
          return true;
        };
      };
    }).forEach((elem,index,array)=>{
      var key = -1;
      data.DBdata.runes.find((e,i)=>{
        if(e.ID == elem.id){
          key = i;
          return true;
        }
      });
      view += `<div class="runeimg-display">
      <img class="runes-img-icon" src="/${elem.path}" alt="blank.png" field="${field}">
      <div class="runes-img-title">${data.DBdata.runes[key].name}</div>
      <div class="runes-img-description">${data.DBdata.runes[key].description}</div>
      </div>`;
    });
    view +=`</div>`;//close <div class="runes-display-block">
    view += `</div>
            <div class="modal-footer">
            </div>
            </div>

      </div>
    </div>`;
  $('body').append(view);
  $(".close").click(function(){
    $("#myModal").remove();
    $(".mask").remove();
  });
  $(".runeimg-display .runes-img-icon").click(function(){
    var field = $(this).attr('field');
    var srcpath = $(this).attr('src');
    var imgname = $(this).attr('src').replace('assets/Runes/','')
    $(`#section-img-${tag}-${field} .runes-img-icon`).attr('src',srcpath);
    $(`#section-img-${tag}-${field} .runes-img-icon`).attr('alt',imgname);
    $("#myModal").remove();
    $(".mask").remove();
    //clean amount-input when amount-input is not empty
    var ori_quantity = $(`#section-img-${tag}-${field} .runes-img-icon`).siblings('.amount-input').val();
    if(ori_quantity != ""){
      $(`#section-img-${tag}-${field} .runes-img-icon`).siblings('.amount-input').val("").keyup();
    }

  });

  return true;
};// close addruneselectModal(tag,field)

  lolcalculator.runesEvents = function(){
    document.oncontextmenu = function() {return false;};
    //Right click -> deselect + clean input
    $('.runes-section-img .runes-img-icon').mousedown(function(e){
      if( e.button == 2 ) {
        var oriIMG = $(this).attr('alt');
        if(oriIMG != "blank.png"){
          $(this).attr('src','assets/Runes/blank.png');
          $(this).attr('alt','blank.png');
          //reset input number
          $(this).siblings('.amount-input').val("").keyup();
        };
      return false;
      }
    });
    //update stats
    $(`.runes-section-img .runes-img-icon`).on('load',function(){
      var type = ['mark','glyph','seal','quint'];
      var changeFlag = 0;
      var img = {
        'mark' : [],
        'glyph' : [],
        'seal' : [],
        'quint' : []
      };
      var runeID = {
        'mark' : [],
        'glyph' : [],
        'seal' : [],
        'quint' : []
      };
      type.forEach((ele,ind,arr)=>{
        for(var i=0; i<4; ++i){
          img[ele][i] = $(`#section-img-${ele}-${i+1} .runes-img-icon`).attr('alt');
          if(img[ele][i] == 'blank.png'){
            runeID[ele][i] = "";
          }else{
            var imgNoExtension = img[ele][i].replace(/\.png/,"");
            var runeSplit = imgNoExtension.split("_");
            runeID[ele][i] = runeSplit[1]; //ID is string
          }
        };
      });
      type.forEach((ele,ind,arr)=>{
        for(var i=0; i<4; ++i){
          if(runeID[ele][i] != ""){
            changeFlag = 1;
          };
        };
      });
      if(changeFlag === 1){
        lolcalculator.data.selectedRunes.runestats = matchstats(runeID);
        updatestats();
      };
    });

    //update rune amount
    $('.runes-section-img .amount-input').keyup(function(){
      var amount = {
        'mark' : [], //[0],[1],[2],[3] = {amount of each runes}
        'glyph' : [],
        'seal' : [],
        'quint' : []
      };
      Object.keys(amount).forEach((ele,ind,arr)=>{
        for(var i=0; i<4;++i){
          var value = $(`#section-img-${ele}-${i+1} .amount-input`).val();
          amount[ele][i] = Number((value) ? value : 0);
        };
      });
      lolcalculator.data.selectedRunes.runesquantity = amount;
      updatestats();
      //if quantity of each type is > than its own maximun, then highlight that part
      RunesQuantityCheck();
      lolcalculator.showstats();
    });



  };// close event function

  lolcalculator.showstats = function(){
    //only show stats when both rune and quantity exist
    var stats = [];
    var arr_size = stats.length;
    var flag = lolcalculator.data.selectedRunes.runeserrorFlag;
    Object.keys(data.selectedRunes.runesquantity).forEach((ele,ind)=>{
      stats = {
        "Attack Damage" : 0,
        "Ability Power" : 0,
        "Armor" : 0 ,
        "Magic Resist" : 0,
        "Health" : 0,
        "Critical Chance" : 0,
        "Attack Speed" : 0,
      };
      var view = `<div class="rune-section-stats-display">
      <span class="rune-section-stats-display-level">Level ${lolcalculator.championModel.data.level}<br></span>`;
      var title = "";
      stats["Attack Damage"] = lolcalculator.championModel.runesAD(ele).toFixed(2);
      stats["Ability Power"] = lolcalculator.championModel.runesAP(ele).toFixed(2);
      stats["Armor"] = lolcalculator.championModel.runesArmor(ele).toFixed(2);
      stats["Magic Resist"] = lolcalculator.championModel.runesMR(ele).toFixed(2);
      stats["Health"] = lolcalculator.championModel.runesHP(ele).toFixed(2);
      stats["Attack Speed"] = lolcalculator.championModel.runesAS(ele).toFixed(1); //return %
      stats["Critical Chance"] = lolcalculator.championModel.runesCrit_Chance(ele).toFixed(2); //return %
      stats["Magic Penetration"] = lolcalculator.championModel.runesMagicPen(ele).toFixed(2); //return %

      Object.keys(stats).forEach((e,i)=>{
        if(stats[e] != 0){
          if(e == "Critical Chance" || e == "Attack Speed"){
            view += `<span class="rune-section-stats-display-data">${e}:    +${stats[e]}%<br></span>`;
          }else{
            view += `<span class="rune-section-stats-display-data">${e}:    +${stats[e]}<br></span>`;
          };
        };
      });
      view += `</div>`;
      if(flag[ele]){
        $(`#${ele}`).children(".runes-section-stats").html(view);
      };
    });//close object.keys
    return true;
  };

  function RunesQuantityCheck(){
    var total = {};
    var flag = lolcalculator.data.selectedRunes.runeserrorFlag;
    Object.keys(data.selectedRunes.runesquantity).forEach((ele,ind)=>{
      total[ele] = data.selectedRunes.runesquantity[ele].reduce((sum, value) => sum + value, 0);
      var errorView = `<div class="runes-section-stats-error">
      Runes quantity incorrect!<br><br>Mark,Glyph,and Mark: Maximun 9<br>
      Quintessence: Maximun 3
      </div>`;
      //turn on
      if(ele === 'quint' && total[ele] > 3){
        console.log(total[ele]);
        $("#quint").css("border-color","red");
        $(`#quint`).children(".runes-section-stats").children(".rune-section-stats-display").hide();
        $(`#quint`).children(".runes-section-stats").html(errorView);
        flag[ele] = 0;
      }else if(total[ele] > 9){
        $(`#${ele}`).css("border-color","red");
        $(`#${ele}`).children(".runes-section-stats").children(".rune-section-stats-display").hide();
        $(`#${ele}`).children(".runes-section-stats").html(errorView);
        flag[ele] = 0;
      }else{
        $(`#${ele}`).css("border-color","rgba(67,67,67,0.5)");
        $(`#${ele} .runes-section-stats-error`).remove();
        $(`#${ele}`).children(".runes-section-stats").children(".rune-section-stats-display").show();
        flag[ele] = 1;
      };
    });
    lolcalculator.data.selectedRunes.runeserrorFlag = flag;
    return true;
  };

  function updatestats(){
    var type = ['mark','glyph','seal','quint'];
    var runestats = data.selectedRunes.runestats;
    var quantity = data.selectedRunes.runesquantity;
    var chosenstats ={
      'mark' : {}, //[0],[1],[2],[3] = {amount of each runes}
      'glyph' : {},
      'seal' : {},
      'quint' : {}
    };
    var tmp_name = "";
    var tmp_val = 0;
    //console.log(data.selectedRunes.runestats['quint'][0][0].stats);
    type.forEach((ele,ind,arr)=>{
      for(var i=0; i<4; ++i){
        chosenstats[ele][i] = (runestats[ele][i][0]) ? JSON.parse(runestats[ele][i][0].stats) : {};

        //Only update when both quantity and runes array are NOT empty
        if(Object.keys(chosenstats[ele][i]).length === 0 && chosenstats[ele][i].constructor === Object){
          chosenstats[ele][i] = {};
        }else{
          if(typeof quantity[ele] !== 'undefined' && quantity[ele] !== null){
              tmp_name = Object.keys(chosenstats[ele][i])[0];
              chosenstats[ele][i][tmp_name] = Object.values(chosenstats[ele][i])[0] * quantity[ele][i];
              chosenstats[ele][i][tmp_name] = Number(chosenstats[ele][i][tmp_name].toFixed(3));
          };
        };
      };
    });

    //Empty lolcalculator.championModel.data.runes, then assign new stuffs
    lolcalculator.championModel.data.runes = [];
    type.forEach((ele,ind)=>{
      for(var i=0; i<4; ++i){
        if(Object.keys(chosenstats[ele][i]).length === 0 && chosenstats[ele][i].constructor === Object){
          continue;
        }else{
          if(typeof quantity[ele] !== 'undefined' && quantity[ele] !== null){
            tmp_name = Object.keys(chosenstats[ele][i])[0];
            var runedata = {};
            runedata[tmp_name] = chosenstats[ele][i][tmp_name];
            runedata['type'] = ele;
            lolcalculator.championModel.data.runes.push(runedata);
          };
        };
      };
    });
    lolcalculator.SaveData2Hash();
    return true;
  };

  function matchstats(runeID){
    var runestats = {
      'mark' : [], //[0],[1],[2],[3] = {object of data.DBdata.runes[]}
      'glyph' : [],
      'seal' : [],
      'quint' : []
    };
    Object.keys(runeID).forEach((ele,ind,arr)=>{
      for(var i=0; i<4; ++i){
        //find matching index
        runestats[ele][i] = data.DBdata.runes.filter((item)=>{
          if(item.ID == runeID[ele][i]){
            return true;
          };
        });
      };
    });
    return runestats;
  };

  return lolcalculator;
}));
