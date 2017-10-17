(function(lolcalculatorFactory){
  window.lolcalculator = lolcalculatorFactory({});
}(function(lolcalculator){
  var config = {
    appContainerId : "default_app_container",
  };
  var data = {
    currentPage : 'home',
    championid : 22,
  };
  var control = {
    home : {
      view: [],
      events : [],
    },
    calculation : {
      view: [],
      events : [],
    },
  }

  lolcalculator.control = control;
  lolcalculator.data = data;

  lolcalculator.init = function(){
    lolcalculator.goTo(data.currentPage);
  };

  lolcalculator.goTo = function(page){
    data.currentPage = page;
    $('#'+config.appContainerId).empty();
    var view = '';
    control[page].view.forEach((func,index)=>{
      view += func();
    });
    $('#'+config.appContainerId).html(view);

    //bind events
    control[page].events.forEach((func,index)=>{
      func();
    });
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

  lolcalculator.boot = function(cfg) {
    lolcalculator.loadConfig(cfg);
    console.log('booting...');
    console.log('initializing...');
    lolcalculator.goTo(data.currentPage);
  };

  lolcalculator.config = config;

  return lolcalculator;
}))
