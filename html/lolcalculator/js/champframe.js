(function(champframeFactory){
  champframeFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;

  lolcalculator.FrameView = function(){
    var view = `<div class="frame-view">`
    view += `<div class="bgframe">`;
      view += display_championicon();
      view += display_level();
      view += display_role();
      view += display_trinket();
      view += display_recall();
      // view += display_spells();
      view += display_passive();
      view += display_ability();
      view += display_summoner_spell();
      view += item();
      view += display_hpbar();
      view += display_mpbar();
      view += `<div class="frame-img">`;
        view += purchase_btn();
    view += `</div></div></div>`;// close class="bgframe" class="frame-img" AND class="frame-view"
    return view;
  };

  lolcalculator.FrameEvents = function(){

  };

  function display_hpbar(){
    var view = `
    <div class="frame-hpbar">
      <div class="frame-hpbar-block">
      </div>
    </div>
    `;
    return view;
  };

  function display_mpbar(){
    var view = `
    <div class="frame-mpbar">
      <div class="frame-mpbar-block">
      </div>
    </div>
    `;
    return view;
  };

  function display_summoner_spell(){
    var view = "";
    var chosen_spell = ["Ignite","Flash"];
    view += `<div class="frame-summonerspell">`;
    view += `<div class="frame-summonerspell-block">`;
    view += `<img class="frame-summonerspell-img" src="/assets/SummonerSpells/${chosen_spell[0]}.png" alt="${chosen_spell[0]}.png">`;
    view += `<img class="frame-summonerspell-img" src="/assets/SummonerSpells/${chosen_spell[1]}.png" alt="${chosen_spell[1]}.png">`;
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  function display_recall(){
    var imgName = "Recall";
    var view = "";
    view += `<div class="frame-recall">`;
    view += `<div class="frame-recall-block">`;
    view += `<img class="frame-recall-img" src="/assets/Frame/${imgName}.png" alt="${imgName}.png">`;
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  function display_trinket(){
    var itemID = 3340;
    var view = "";
    view += `<div class="frame-trinket">`;
    view += `<div class="frame-trinket-block">`;
    view += `<img class="frame-trinket-img" src="/assets/Items/${itemID}.png" alt="${itemID}.png">`;
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  function display_role(){
    var view = "";
    var champObject = lolcalculator.data.currentChampObj;
    var role = lolcalculator.roledefine(JSON.parse(champObject.champgeninfo.info));
    view += `<div class="frame-role">`;
    view += `<div class="frame-role-bubble">`;
    view += `<img class="frame-role-img" src="/assets/Roles/${role}.png" alt="${role}.png">`;
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  function display_level(){
    var view = "";
    var level = lolcalculator.championModel.data.level;
    view += `<div class="frame-level">`;
    view += `<div class="frame-level-bubble">${level}`;
    view += `</div>`;
    view += `</div>`;
    return view;
  };

  function display_championicon(){
    var view = "";
    view += `<div class="frame-championicon">`;
    view += `<img class="frame-icon-img"
    src="/assets/ChampionIcon/${lolcalculator.data.currentChampID}.png"
    alt="${lolcalculator.data.currentChampName}">`;
    view += `</div>`;
    return view;
  };

  function display_passive(){
    var passive = lolcalculator.data.currentChampObj.champpassives;
    var view = `
    <div class="frame-passive">
      <div class="frame-passive-indi">
        <img class="frame-passive-img" src="/assets/Ability/${data.currentChampID}-P.png" alt="${passive.name}">
      </div>
    </div>`;
    return view;
  };

  function display_ability(){
    var spells = JSON.parse(lolcalculator.data.currentChampObj.champspells.data);
    var abilitytable = ["Q","W","E","R"];
    var view = "";
    view += `<div class="frame-ability">`;
    for(var i=0; i<abilitytable.length; ++i){
      view += `<div class="frame-spell-indi">
          <img class="frame-ability-img" src="/assets/Ability/${data.currentChampID}-${abilitytable[i]}.png" alt="${spells[i]}">
        </div>`;
    };
    view += `</div>`;
    return view;
  };

  function item(){
    var view = `<div class="frame-items">`;

    //Six item slots
    view += `<div class="frame-items-six-blocks">`;
    for(var i=0; i<6; ++i){
      if(i == 0){
        view += `<div class="frame-items-row-one">`;
      }else if(i == 3){
        view += `<div class="frame-items-row-two">`;
      }
      view += `<div class="frame-items-indi-block" id="items-purchase-block-${i+1}">`
      view +=`</div>`; //class="frame-items-indi-block"
      if(i == 2 || i == 5){
        view +=`</div>`; //class="frame-items-row-xxx"
      };
    };
    view +=`</div>`; //class="frame-items-six-blocks"

    view += `</div>`;//class="frame-items"
    return view;
  };

  function purchase_btn(){
    var view = "";
    view += `<div class="frame-items-purchase">
      <div onclick="lolcalculator.itemPurchasModal()" class="frame-items-purchase-button">Purchase Items
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      </div>
    </div>`;
    return view;
  }

  lolcalculator.itemPurchasModal = function(){
    addItemPurchaseModal();
    setTimeout(()=>{
      $("#myModal").addClass("in");
    },200);

    return true;
  }

  function addItemPurchaseModal(){
    var itemList = lolcalculator.data.DBdata.items;
    var removeList = lolcalculator.disableList.items;
    var path = "";
    var view = `  <!-- Modal -->
      <div class="mask"></div>
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog item-purchase-dialog">

          <!-- Modal content-->
          <div class="modal-content" id="item-purchase-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Purchase Window</h4>
            </div>
            <div class="modal-body item-modal-body" >`;
      //Tag List ----------------------START------------------------------------
      view += `<div class="item-tag-list">`;
      var tags = {
        "Starting Items" : ["Jungle","Lane"],
        "Tools" : ["Consumable","Gold Income", "Vision & Trinkets"],
        "Defense" : ["Armor","Health","Health Regen","Magic Resist"],
        "Attack" : ["Attack Speed","Critical Strike","Damage","Life Steal","Armor Penetration"],
        "Magic" : ["Cooldown Reduction","Mana","Mana Regen","Ability Power","Magic Penetration"],
        "Movement" : ["Boots","Other Movement"]
      };
      Object.keys(tags).forEach((e,i)=>{
        view +=  `<span class="item-tag-group-name">${e}<br>`;
        tags[e].forEach((e,i)=>{
          view +=  `<label class="item-tag-name"><input class="item-tag-checkbox" type="checkbox" tag="${e}">${e}</label>`;
          view +=  `<br>`;
        });
        view +=  `</span>`;
      });
      view += `</div>`;
      //Item List----------------------START------------------------------------
      view += `<div class="item-searchbar-block">`;
      view += ` <div class="input-group">
        <span class="input-group-addon">Search by Name</span>
        <input id="msg" type="text" class="form-control item-searchbar-input" name="msg" placeholder="Example: Zeal">
        </div>`;
      view += `</div>`;
      //Item List----------------------START------------------------------------
      view += `<div class="item-display-list">`;
      view += itemHTMLGenertor();
      view += `</div>`;
      //Item Description--------------------START-------------------------------
      view += `<div class="item-description-section">`;
      view += `</div>`; // close class="item-description-section"
      view += `</div>`; //close class="modal-body"
      //Modal Footer------------------------------------------------------------
      view += `<div class="modal-footer">`;
      view += footerView();
      view += `<button type="button" class="btn btn-default purchase-item Modal-purchase-btn" data-dismiss="modal">Purchase</button>`;
      view += `</div>
          </div>
        </div>
      </div>`;
    $('body').append(view);
    $(".close").click(function(){
      $("#myModal").remove();
      $(".mask").remove();
    });
    $('.purchase-item').click(function(){
      $("#myModal").remove();
      $(".mask").remove();
    });
    ItemPurchaseEvents();
    return true;
  };

  function ItemPurchaseEvents(){
    Event_Tag();
    Event_ViewItemDescription();
    Event_SearchBar();
    Event_Footer();
    Event_Purchase();
    Event_ClearAll();
    return true;
  };

  lolcalculator.allowDrop = function(ev) {
      ev.preventDefault();
  };

  lolcalculator.drag = function(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
  };

  lolcalculator.drop = function(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var clone = document.getElementById(data).cloneNode(true);
      clone.id = "";
      if ($(ev.target).hasClass('chosen-items-block')) {
        ev.target.appendChild(clone);
      } else {
        $(ev.target.parentNode).empty().append(clone);
      };

  };

  function footerView(){
    var view = "";
    var path = "";
    var chosenItem = lolcalculator.championModel.data.item_list;
    view += `<div class="chosen-items">`;
    view += `<div class="chosen-items-description">Drop items here</div>`;
    view += `<div class="chosen-items-description-detail">Right click to clear items</div>`;
    for(var i=0;i<6;++i){
      view += `<div class="chosen-items-block" ondrop="lolcalculator.drop(event)"
      ondragover="lolcalculator.allowDrop(event)" id="chosen${i+1}">`;
      if(chosenItem.length>i){
        path = "assets/Items/" + chosenItem[i] + ".png";
        view += `<img class="item-purchase-icon" src="/${path}" alt=${chosenItem[i]}>`;
      };
      view += `</div>`;
    };
    view += `<button type="button" class="chosen-items-clearall">Clear All</button>`
    view += `</div>`;
    return view;
  };

  lolcalculator.generateHTMLofchosenItem = function(){
    var chosen_item = lolcalculator.championModel.data.item_list;
    console.log("Chosen item =====",chosen_item);
    var path = "";
    var view = "";
    //remove existing img on frame
    $(".frame-items-indi-block").empty();
    //Generate code for the most recent list
    for(var i=0; i<chosen_item.length; ++i){
      path = "assets/Items/" + chosen_item[i] + ".png";
      view = `<img class="frame-items-indi-icon" src="/${path}" alt=${chosen_item[i]}>`
      $(`#items-purchase-block-${i+1}`).append(view);
    };

    return true;
  };

  function SaveChosenItemOnFrame(chosen_item){
    var path = "";
    var view = "";
    var fullItemList = lolcalculator.data.DBdata.items;
    var chosen_item_object = [];
    //Reset Item list and item sets
    lolcalculator.championModel.data.item_list = [];
    lolcalculator.championModel.data.item_stats = [];

    for(var i=0; i<chosen_item.length; ++i){
      //update to lolcalculator.ChampionModel
      lolcalculator.championModel.data.item_list.push(chosen_item[i]);
      chosen_item_object[i] = fullItemList.find((e)=>{
        return e.ID == chosen_item[i];
      });
      var stats = ManualStatsAdder(chosen_item_object[i]);
      var tmp_stats = {};
      Object.keys(stats).forEach((e,i)=>{
        //push one by one to item_stats
        tmp_stats = {};
        tmp_stats[e] = stats[e];
        lolcalculator.championModel.data.item_stats.push(tmp_stats);
      });
    };

    return true;
  };

  function ManualStatsAdder(itemObj){
    var stats = JSON.parse(itemObj.stats);
    var addOns = lolcalculator.ManualStatsOnItems;
    Object.keys(addOns).forEach((e)=>{
      var id = e.replace('item-','');
      if(parseInt(itemObj.ID,10) == id){
        var type = Object.keys(addOns[e])[0];
        var amount = addOns[e][type];
        stats[type] = amount;
      };
    });
    return stats;
  };

  function Event_ClearAll(){
    $(".chosen-items-clearall").click(function(){
      $(".chosen-items-block").empty();
    });
    return true;
  };

  function Event_Purchase(){
    var chosen_item = [];
    $(".Modal-purchase-btn").mousedown(function(){
      var num_of_item = $(".chosen-items-block").children(".item-purchase-icon").length;
      var tmp_id = 0;
      for(var i=0; i<num_of_item; ++i){
        tmp_id = $(".chosen-items-block").children(".item-purchase-icon").eq(i).attr("alt");
        chosen_item.push(tmp_id);
      };
      SaveChosenItemOnFrame(chosen_item);
      lolcalculator.generateHTMLofchosenItem();
      lolcalculator.SaveData2Hash();
    });
    return true;
  };

  function Event_Footer(){
    document.oncontextmenu = function() {return false;};
    $(".chosen-items-block").mousedown(function(e){
      if( e.button == 2 ){
        $(this).empty();
      };
    });
    return true;
  }

  function Event_SearchBar(){
    $(".item-searchbar-input").keyup(function(){
      $(".item-display-list").empty();
      var view = ``;
      view += itemHTMLGenertor();
      $(".item-display-list").html(view);
      //Re-bind Hover event
      Event_ViewItemDescription();
    });
    return true;
  };

  function Event_ViewItemDescription(){
    //Hover events--------------------------START-------------------------------
    $(".item-purchase-icon-block").mouseenter(function(){
      var id = $(this).children(".item-purchase-icon").attr('alt');
      var itemObject = {};
      var itemList = lolcalculator.data.DBdata.items;
      var view = "";
      itemObject = itemList.find((e)=>{
        return e.ID == id;
      });
      view += `<div class="item-description-block">`;
      view += `<div class="item-des-title">`;
      view += `<sapn>${itemObject.name}</sapn>`
      view += `</div>`;
      view += `<div class="item-des-description">`;
      view += itemObject.description;
      view += `</div>`;
      view += `</div>`;
      $(".item-description-section").html(view);
    });
    //Hover events--------------------------END---------------------------------
    return true;
  };

  function Event_Tag(){
    $('.item-tag-checkbox').click(function(){
      $(".item-display-list").empty();
      var view = ``;
      view += itemHTMLGenertor();
      $(".item-display-list").html(view);
      //Re-bind Hover event
      Event_ViewItemDescription();
    });
    return true;
  };

  function GetSelectedTags(){
    var selectedTAG = [];
    var NumCheckbox = $(".item-tag-checkbox").length;
    var tmp_box = false;
    var tmp_name = "";
    for(var i=0; i<NumCheckbox; ++i){
      tmp_box = $(".item-tag-checkbox").eq(i).is(':checked');
      if(tmp_box){
        tmp_name = $(".item-tag-checkbox").eq(i).attr('tag').replace(/ /g,"");
        if(tmp_name=="GoldIncome"){
          tmp_name = "GoldPer";
        }else if (tmp_name == "AbilityPower") {
          tmp_name = "SpellDamage";
        }else if (tmp_name=="OtherMovement") {
          tmp_name = "NonbootsMovement";
        }else if (tmp_name =="Vision&Trinkets" ){
          tmp_name = "Vision";
        }else if (tmp_name=="MagicResist") {
          tmp_name = "SpellBlock";
        };
        selectedTAG.push(tmp_name);
      };
    };//close for
    return selectedTAG;
  }

  function itemHTMLGenertor(){
    var searchbarKEY = $(".item-searchbar-input").val();
    var selectedTAG = GetSelectedTags();
    var itemList = lolcalculator.data.DBdata.items;
    var removeList = lolcalculator.disableList.items;
    var selectedITEMS = [];
    var path = "";
    var view = "";
    selectedITEMS = itemList.filter((e,i)=>{
      if (removeList.indexOf(parseInt(e.ID,10)) > -1) {
        return false;
      }
      var itemTag = (JSON.parse(e.tags)) ? JSON.parse(e.tags) : ["null"];
      var allTagPassed = true;
      selectedTAG.forEach((item)=>{
        if (itemTag.indexOf(item) <= -1) {
          allTagPassed = false;
        }
      });
      var re = RegExp(searchbarKEY,"i");
      if (e.name.search(re) <= -1) {
        allTagPassed = false;
      };
      if (allTagPassed) {
        return true;
      }
    });
    selectedITEMS.forEach((e)=>{
      path = "assets/Items/" + e.ID + ".png";
      view += `<div class="item-purchase-icon-block">
      <img id="item-${e.ID}" class="item-purchase-icon" src="/${path}" alt=${e.ID} draggable="true" ondragstart="lolcalculator.drag(event)">
      </div>`;
    });

    return view;
  };



  return lolcalculator;
}));
