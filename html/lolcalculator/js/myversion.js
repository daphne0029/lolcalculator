(function(lolcalculatorFactory){
  window.lolcalculator = lolcalculatorFactory({});
}(function(lolcalculator){
  var config = {
    appContainerId : "default_app_container",
    apiURL : "/ajax/data.php"
  };
  var data = {
    Hasdefault : false,
    samplechamp : [17,21,22,51,99,134],
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
    runes : [5249,5265,5269,5270,5271,5402,5253,
      5279,5291,5295,5296,5299,5300,5301,5302,5371,5372,
      5309,,5321,5322,5325,5329,5330,5331,5332,5369,5370,5403,5415,
      5339,5343,5351,5352,5355,5356,5359,5360,5361,5362,
      5365,5366,5367,5368,5373,5374,5406,5409,5412,5418],
  };

  var enabledStats = {
    'General' : ["Health","Movement Speed"],
    'Offense' : ["Attack Damage","Ability Power"],
    'Defense' : ["Armor","Magic Resist"],
  };

  var ManualStatsOnItems = {
    'item-3020' : {'FlatMagicPen' : 15},
    'item-3135' : {'TotalMagicPen' : 0.35},
    'item-3136' : {'FlatMagicPen' : 15},
    'item-3151' : {'FlatMagicPen' : 15},
    'item-3033' : {'BonusArmorPen' : 0.35},
    'item-3035' : {'BonusArmorPen' : 0.35},
    'item-3036' : {'BonusArmorPen' : 0.35},
    'item-3134' : {'Lethality' : 10},
    'item-3142' : {'Lethality' : 18},
    'item-3147' : {'Lethality' : 18},
    'item-3814' : {'Lethality' : 18},
  };

  lolcalculator.data = data;
  lolcalculator.config = config;
  lolcalculator.disableList = disableList;
  lolcalculator.enabledStats = enabledStats;
  lolcalculator.ManualStatsOnItems = ManualStatsOnItems;

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
    window.location.hash = encodeURIComponent(JSON.stringify(Hashdata));
  };

  //init will call this function
  lolcalculator.ValidateAndReadHashData = function(){
    console.log("Loading Hash data");
    console.log(window.location.hash.substring(1));
    try {
      decodeURIComponent(window.location.hash.substring(1));
    } catch (e) {
      window.location.hash = "";
      console.log('Cannot decode URL');
      return;
    };
    try {
      JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
      lolcalculator.data.Hasdefault = true;
    } catch (err) {
      window.location.hash = "";
      console.log('invalid data');
      return;
    };
    if((window.location.hash.substring(1)).length <= 0){
      return;
    };
    var Hashdata = JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
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
          <h1>LoLCulator</h1>
          <h2>Pick a Champion > Set Level > Select Runes and Items > Calculate Stats!</h2>
        </div>`;
        //Menu:
        // <div class="menu">
        //   <div class="navigation">CALCULATOR</div>
        //   <div class="navigation">CHAMPIONS</div>
        //   <div class="navigation">ITEMS</div>
        // </div>
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
