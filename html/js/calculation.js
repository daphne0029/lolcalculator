(function(CalulationFactory){
  CalulationFactory(lolcalculator);
}(function(lolcalculator){

  var data = lolcalculator.data;

  var calView = function(){
    var view = lolcalculator.buildHeaderView('Calulation');
    view += `<div class="body">
      <button class="reselectbutton">Re-select a Champion</button>
      <div class="championprofile">
        <div class="championbackground">
          <div class="shadowblock">
            <div class="champinfo">
              <img class="role" src="/assets/Roles/marksman.png" alt="marksman.png">
              <div class="champname">Ashe</div>
              <div class="champtitle">the Frost Archer</div>
            </div>
            <div class="generalinfo">
              <div class="stats-area">
                <span class="stats-title">Defense</span>
                <div class="progress_bar">
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                </div>
              </div>
              <div class="stats-area">
                <span class="stats-title">Attack</span>
                <div class="progress_bar">
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                </div>
              </div>
              <div class="stats-area">
                <span class="stats-title">Magic</span>
                <div class="progress_bar">
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                </div>
              </div>
              <div class="stats-area">
                <span class="stats-title">Difficulty</span>
                <div class="progress_bar">
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg checked"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                  <div class="bg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="footer">
      </div>`;
    return view;
  };

  var CalEvents = function(){
    console.log('binding calculation events');

    $('.reselectbutton').click(function(){
      lolcalculator.goTo('home');
      console.log('going to home page');
    });

  };

  lolcalculator.control.calculation.view.push(calView);
  lolcalculator.control.calculation.events.push(CalEvents);
  return lolcalculator;
}))
