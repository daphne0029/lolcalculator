(function(RunesMasteriesFactory){
  RunesMasteriesFactory(lolcalculator);
}(function(lolcalculator){
  var config = lolcalculator.config;
  var data = lolcalculator.data;

  lolcalculator.RunesView = function(view){
    view += `<div class="runes">
    <div class="runes-background">`;
    view += `
    <div id="mark" class="runes-section">
      <div class="runes-section-title mark-title">MARK</div>
      <div class="runes-section-main">`;
    view = lolcalculator.add4smallsection(view,'mark');
    view += `
    </div>
    <div class="runes-section-stats">+8.19<br>Attack Damage</div>
    </div>`;
    //---------------------------
    view += `
    <div id="glyph" class="runes-section">
      <div class="runes-section-title glyph-title">GLYPH</div>
      <div class="runes-section-main">`;
    view = lolcalculator.add4smallsection(view,'glyph');
    view += `</div>
    <div class="runes-section-stats">+8.19<br>Attack Damage</div>
    </div>`;
   //-------------------------------------------------
    view += `
    <div id="seal" class="runes-section">
    <div class="runes-section-title seal-title">SEAL</div>
    <div class="runes-section-main">`;
    view = lolcalculator.add4smallsection(view,'seal');
    view += `</div>
    <div class="runes-section-stats">+8.19<br>Attack Damage</div>
    </div>`;
    //-------------------------------------------
    view +=`
    <div id="Quintessence" class="runes-section">
    <div class="runes-section-title Quint-title">QUITESSENCE</div>
    <div class="runes-section-main">`;
    view = lolcalculator.add4smallsection(view,'Quintessence');
    view += `</div>
    <div class="runes-section-stats">+8.19<br>Attack Damage</div>
    </div>`;
    view +=`</div></div>`;

    //--------------------------------------
    return view;
  };

  lolcalculator.add4smallsection = function(view,tag){
    for(var i=0; i<4;++i){
      view += `<div class="runes-section-img" id="section-img-${i+1}">
        <img class="runes-img-icon" src="/assets/Runes/blank.png" alt="blank.png">
        <div class="runes-amount">x</div>
        <input class="amount-input form-control" type="int">
      </div>`;
    };
    return view;
  };

  lolcalculator.runesEvents = function(){
    //$(".runes-img-icon").click();
  };

  return lolcalculator;
}));
