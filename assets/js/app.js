//Variables
var div = document.getElementById('showTime'),
        startBtn = document.getElementById('start'),
        stopBtn = document.getElementById('stop'),
        lapBtn = document.getElementById('lap'),
        resetBtn = document.getElementById('reset'),
        removeLapsBtn = document.getElementById('removeLaps'),
        seconds = 0, minutes = 0, hours = 0,
        t;


// Event Listener
loadTime();
function loadTime(){
    // Start Timer
    stopBtn.disabled = true;
    startBtn.addEventListener('click', timer);

    // Stop Timer
    stopBtn.addEventListener('click', function(){
        clearTimeout(t);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    // Lap Timer
    lapBtn.addEventListener('click', lapTime);

    // Reset Timer
    resetBtn.addEventListener('click', function(){
        clearTimeout(t);
        startBtn.disabled = false;
        stopBtn.disabled = true;

        // const lapsLabel = document.getElementById('laps');
        // lapsLabel.textContent = "";

        div.textContent = "00:00:00";
        seconds = 0, minutes = 0, hours = 0;
        
    });

    // Remove All Time Laps
    removeLapsBtn.addEventListener('click', removelAllLaps);

    laps = getFromLocalStorage();
    laps.forEach(function(lap){
        const getLapsId = document.getElementById('laps');
        const setLabel = document.createElement('div');

        setLabel.classList = 'ui label';
        setLabel.setAttribute('id','labels');

        setLabel.innerHTML = `<i class="fa fa-clock-o"></i>
                            ${lap}
                        `;
        getLapsId.appendChild(setLabel);
    });
}

function add(){
    seconds ++;
    if(seconds >= 60){
        seconds = 0;
        minutes ++;
        if(minutes >= 60){
            minutes = 0;
            hours ++;
        }
    }

    div.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                        (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer(){
    t = setTimeout(add, 1000);
    stopBtn.disabled = false;
    startBtn.disabled = true;
}

function lapTime(){
    const getLapsId = document.getElementById('laps');
    const setLabel = document.createElement('div');

    setLabel.classList = 'ui label';
    setLabel.setAttribute('id','labels');

    const lapsTime = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                (seconds > 9 ? seconds : "0" + seconds);

    setLabel.innerHTML = `<i class="fa fa-clock-o"></i>
                        ${lapsTime}
                     `;
    getLapsId.appendChild(setLabel);
    
    addLapsInLocalStorage(lapsTime);
}

function addLapsInLocalStorage(lapsTime){
    let laps = getFromLocalStorage();
    
    // Check the lenth of Laps
    checkLengthOfLaps(laps);

    // Add the lapsTime into the array
    laps.push(lapsTime);

    // Convert tweet array into String
    localStorage.setItem('laps', JSON.stringify( laps ) );
}

function getFromLocalStorage(){
    let laps;
    const lapsLS = localStorage.getItem('laps');
    if (lapsLS == null){
        laps = [];        
    }
    else{
        laps = JSON.parse( lapsLS );
    }
    return laps;
}

function checkLengthOfLaps(laps){
    if (laps.length > 9){
        alert('Yo cannot add more than 10 time-laps');
        window.location.reload(true);
        if(laps[0]){
            laps.splice(laps[0],1);
        }
        
    }
    
    // Save the data
    localStorage.setItem('laps', JSON.stringify(laps) );
    
}

function removelAllLaps(){
    let lapsLS = localStorage.getItem('laps');

    if (lapsLS != null){
        lapsLS = [];          
    }
    
    // Save the data
    localStorage.setItem('laps', JSON.stringify(lapsLS) );
    window.location.reload(true);
}