(function(lolcalculatorFactory){
  window.lolcalculator = lolcalculatorFactory({});
}(function(lolcalculator){
  var config = {
    appContainerId : "default_app_container",
    apiURL : "http://lolcalculator.local/ajax/data.php"
  };
  var data = {
    samplechamp : [17,22,51,99,134],
    currentPage : 'home',
    currentChampID : 0,
    currentChampName : '',
    DBdata : {
      champgeninfo : [],
      champstats : [],
      champpassives : [],
      champspells : [],
      masteries : [],
      runes : [],
      items : [],
    },
  };

  lolcalculator.data = data;
  lolcalculator.config = config;

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
    lolcalculator.spawnHome();
  };

  lolcalculator.loadConfig = function(cfg) {
    console.log('loading Config');
    config = $.extend(config,cfg);
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
