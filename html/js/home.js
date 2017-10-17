(function(HomeFactory){
  HomeFactory(lolcalculator);
}(function(lolcalculator){

  var data = lolcalculator.data;

  var homeView = function(){
    var view = lolcalculator.buildHeaderView('Home');
    view += `
      <div class="body">
          <div class="champselect">
            <div class="instruction">
              <div class="title">Step 1 </div>
              <div class="description">
                Select a champion to start calculation
              </div>
            </div>
            <div class="listchamp">
              <img class="champicons" src="/assets/ChampionIcon/22.png" alt="Ashe">
              <p class="champname">Ashe</p>
            </div>
            <div class="listchamp">
              <img class="champicons" src="/assets/ChampionIcon/22.png" alt="Ashe">
              <p class="champname">Ashe</p>
            </div>
            <div class="listchamp">
              <img class="champicons" src="/assets/ChampionIcon/22.png" alt="Ashe">
              <p class="champname">Ashe</p>
            </div>
            <div class="listchamp">
              <img class="champicons" src="/assets/ChampionIcon/22.png" alt="Ashe">
              <p class="champname">Ashe</p>
            </div>
            <div class="listchamp">
              <img class="champicons" src="/assets/ChampionIcon/22.png" alt="Ashe">
              <p class="champname">Ashe</p>
            </div>
            <div class="listchamp">
              <img class="champicons" src="/assets/ChampionIcon/22.png" alt="Ashe">
              <p class="champname">Ashe</p>
            </div>
            <div class="listchamp">
              <img class="champicons" src="/assets/ChampionIcon/22.png" alt="Ashe">
              <p class="champname">Ashe</p>
            </div>
          </div>
        </div>
        <div class="footer">
        </div>
      </div>
    </div>`;
    return view;
  };

  var homeEvents = function(){
    console.log('binding home events');

    $('.listchamp').click(function(){
      lolcalculator.goTo('calculation');
      console.log('going to calculation page');
    });

  };

  lolcalculator.control.home.view.push(homeView);
  lolcalculator.control.home.events.push(homeEvents);
  return lolcalculator;
}))
