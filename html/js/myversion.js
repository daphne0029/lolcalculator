(function(lolcalculatorFactory){
  window.lolcalculator = lolcalculatorFactory({});
}(function(lolcalculator){
  var config = {
    appContainerId : "default_app_container",
    apiURL : "http://lolcalculator.local/ajax/data.php"
  };
  var data = {
    Hasdefault : false,
    samplechamp : [17,22,51,99,134],
    currentPage : 'home',
    currentChampID : 0,
    currentChampName : '',
    currentChampObj : {},
    DBdata : {
      champgeninfo : [],
      champstats : [],
      champpassives : [],
      champspells : [],
      masteries : [],
      runes : [],
      items : [],
      runesimg :[],
    },
    selectedRunes : {
      runestats : {
        'mark' : {},
        'glyph' : {},
        'seal' : {},
        'quint' : {}
      },
      runesquantity : {
        'mark' : [],
        'glyph' : [],
        'seal' : [],
        'quint' : []
      },
      runeserrorFlag : {
        'mark' : 1,
        'glyph' : 1,
        'seal' : 1,
        'quint' : 1
      },
    },
  };

  var disableList = {
    items : [3671,3672,3673,3675,
    3647,3642,3643,3641,3640,3636,3635,3634,3631,3599,
    3901,3902,3903,
    3198,3197,3196,
    3340,3341,3363,3364],
  };

  var enabledStats = {
    'General' : ["Health","Movement Speed"],
    'Offense' : ["Attack Damage","Ability Power"],
    'Defense' : ["Armor","Magic Resist"],
  };

  lolcalculator.data = data;
  lolcalculator.config = config;
  lolcalculator.disableList = disableList;
  lolcalculator.enabledStats = enabledStats;

  lolcalculator.boot = function(cfg) {
    lolcalculator.loadConfig(cfg);
    console.log('booting...');
    console.log('initializing...');
    console.log('getting data from DB...');
    lolcalculator.getDatafromDB(()=>{
      lolcalculator.init();
    });
  };
  lolcalculator.init = function(){
    lolcalculator.ValidateAndReadHashData();
    //If champion is already selected,
    //then go to champion calculator
    if(lolcalculator.data.currentChampID != 0){
      lolcalculator.spawnCalculator();
    }else{
      lolcalculator.spawnHome();
    };
  };

  lolcalculator.loadConfig = function(cfg) {
    console.log('loading Config');
    config = $.extend(config,cfg);
  };

  lolcalculator.SaveData2Hash = function(){
    var Hashdata = {};
    var data = lolcalculator.data;
    var model = lolcalculator.championModel;
    //Gather data
    Hashdata['id'] = data.currentChampID;
    Hashdata['name'] = data.currentChampName;
    Hashdata['selectedrunes'] = data.selectedRunes;
    Hashdata['runes'] = model.data.runes;
    Hashdata['item_stats'] = model.data.item_stats;
    Hashdata['item_list'] = model.data.item_list;
    Hashdata['level'] = model.data.level;
    //Generate Json string
    console.log("saving data");
    console.log(Hashdata);
    window.location.hash = JSON.stringify(Hashdata);
  };

  //init will call this function
  lolcalculator.ValidateAndReadHashData = function(){
    console.log("Loading Hash data");
    try {
      JSON.parse(window.location.hash.substring(1));
      lolcalculator.data.Hasdefault = true;
    } catch (err) {
      window.location.hash = "";
      console.log('invalid data');
      return;
    };
    if((window.location.hash.substring(1)).length <= 0){
      return;
    };
    var Hashdata = JSON.parse(window.location.hash.substring(1));
    var data = lolcalculator.data;
    var model = lolcalculator.championModel;

    //@@@TO DO: Validate these stats
    data.currentChampID = Hashdata['id'];
    data.currentChampName = Hashdata['name'];
    data.selectedRunes = Hashdata['selectedrunes'];
    data.champObject = lolcalculator.getChampionData(data.currentChampID);
    console.log(data.champObject);
    model.data.runes = Hashdata['runes'];
    model.data.item_stats = Hashdata['item_stats'];
    model.data.item_list = Hashdata['item_list'];
    model.data.level = Hashdata['level'];
  };

  lolcalculator.buildHeaderView = function(title){
    title = 'League of Legends';
    var view = `
        <div class="header">
          <h1>League of Legends</h1>
          <div class="menu">
            <div class="navigation">CALCULATOR</div>
            <div class="navigation">CHAMPIONS</div>
            <div class="navigation">ITEMS</div>
          </div>
        </div>`;
    return view;
  };

  lolcalculator.buildFooterView = function(){
    var view = `
    <div class="footer">
    </div>`;
    return view;
  };

  lolcalculator.getDatafromDB = function(callback){
    $.ajax({
      type : "get",
      url : lolcalculator.config.apiURL,
      data : {'function' : 'initialLoad'},
      dataType: 'json',
      success : function(response){
        if(response.status > 0){
          data.DBdata.champgeninfo = response.data.geninfo;
          data.DBdata.champstats = response.data.stats;
          data.DBdata.champpassives = response.data.passives;
          data.DBdata.champspells = response.data.spells;
          data.DBdata.masteries = response.data.masteries;
          data.DBdata.runes = response.data.runes;
          data.DBdata.items = response.data.items;
          data.DBdata.runesimg = response.data.runesimg;
          if(typeof(callback) == 'function'){
            callback();
          }
        } else{
          //handle error
        }
      }
    });
  };

  //lolcalculator.getDatafromDB();
  return lolcalculator;
}))
