(function(HomeFactory){
  HomeFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;
  //var champgeninfo = data.DBdata.champgeninfo;

  lolcalculator.spawnHome = function(){
    var champgeninfo = data.DBdata.champgeninfo;
    var view = lolcalculator.buildHeaderView('Home');
    view += `
    <div class="body">
      <div class="champselect">
        <div class="instruction">
          <div class="title">Step 1 </div>
          <div class="description">
            Select a champion to start calculation
          </div>
        </div>`

    var index = 0;
    //console.log("sample = " + data.samplechamp);
    for (index = 0; index < champgeninfo.length; ++index){
      var champid = Number(champgeninfo[index].champID);
      var champname = champgeninfo[index].champName;
      if(data.samplechamp.indexOf(champid) < 0) continue;
      view += `<div id="listchamp_${champid}" class="listchamp">
        <img class="champicons" src="/assets/ChampionIcon/${champid}.png" alt="${champname}">
        <p class="champname">${champname}</p>
      </div>`;
    }

      view += `</div>
    </div>`
    view += lolcalculator.buildFooterView();
    lolcalculator.Homeevents();
    $('#'+config.appContainerId).empty();
    $('#'+config.appContainerId).html(view);
  };

  lolcalculator.Homeevents = function(){
    console.log('binding home events');
    $(document).ready(function(){
      $('.listchamp').click(function(){
        data.currentChampID = $(this).attr('id').replace('listchamp_','');
        data.currentChampName = $(".champicons",this).attr("alt");
        lolcalculator.spawnCalculator();
        console.log('going to calculation page, PAGE '+ data.currentChampName + data.currentChampID);
      });
    });
  };

  lolcalculator.data = data;

  return lolcalculator;
}));
