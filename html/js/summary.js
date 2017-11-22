(function(championModelFactory){
  championModelFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;

  lolcalculator.SummaryView = function(){
    var view = `<div class="summary">`;
    view += `<div class="summary-frame">`;
    view += `<div class="summary-inner-block">`;
    view += `</div>`;
    view += `</div>`;
    view += `</div>`;

    return view;
  };

  lolcalculator.SummaryEvents = function(){

  };

  return lolcalculator;
}));
