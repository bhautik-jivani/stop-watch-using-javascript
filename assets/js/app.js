//Variables
var div = document.getElementById('showTime'),
        startBtn = document.getElementById('start'),
        stopBtn = document.getElementById('stop'),
        lapBtn = document.getElementById('lap'),
        resetBtn = document.getElementById('reset'),
        removeLapsBtn = document.getElementById('removeLaps'),
        seconds = 0, minutes = 0, hours = 0,
        stoppedTime = localStorage.getItem("stoppedTime"),
        t;
if(stoppedTime != null ){
    
    var stoppedTimer = stoppedTime.split(":"),
    hours = parseInt(stoppedTimer[0]), minutes = parseInt(stoppedTimer[1]), seconds = parseInt(stoppedTimer[2]);
}

// Event Listener
loadTime();
function loadTime(){
    
    if (stoppedTime != null){
        div.textContent = `${stoppedTime}`;
    }
    
    // Show Timer Logs
    const timeLogs = getLogsFromLocalStorage();
    console.log(timeLogs);
    
    if (timeLogs.length !== 0 ){
        document.getElementById('logs').style.display = 'block';
        addTimeLogs(timeLogs);
    }
    else{
        document.getElementById('logs').style.display = 'none';
       
    }
    

    // Start Timer
    stopBtn.disabled = true;
    startBtn.addEventListener('click',timer);
    // Stop Timer
    stopBtn.addEventListener('click', stopTime);

    // Lap Timer
    lapBtn.addEventListener('click', lapTime);

    // Reset Timer
    resetBtn.addEventListener('click', function(){
        clearTimeout(t);

        startBtn.disabled = false;
        stopBtn.disabled = true;

        // Stores last 10 logs
        const lastStoppedWatchTime = div.textContent;
        
        addLogsInLocalStorage(lastStoppedWatchTime);
        document.getElementById('logs').style.display = 'block';

        removelAllLaps();

        stoppedTimer = '00:00:00';
        div.textContent = "00:00:00";

        localStorage.setItem('stoppedTime', stoppedTimer );
        seconds = 0, minutes = 0, hours = 0;
        
    });

    // Remove All Time Laps
    removeLapsBtn.addEventListener('click', removelAllLaps);

    laps = getFromLocalStorage();
    if (laps != null){
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
    
}

function add(){
    console.log(hours,minutes,seconds);
    
    seconds ++;
    if(seconds >= 60){
        seconds = '0';
        minutes ++;
        if(minutes >= 60){
            minutes = '0';
            hours ++;
        }
    }
    console.log("Minutes",minutes);
    div.textContent = (hours > 9 ? hours : "0" + hours) + ":" +
                        (minutes > 9 ? minutes : "0" + minutes) + ":" +
                        (seconds > 9 ? seconds : "0" + seconds);

    // div.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
    //                     (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
    //                     (seconds > 9 ? seconds : "0" + seconds);

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

    const lapsTime = div.textContent;

    setLabel.innerHTML = `<i class="fa fa-clock-o"></i>
                        ${lapsTime}
                     `;
    getLapsId.appendChild(setLabel);
    console.log("LapsTime",lapsTime);
    
    addLapsInLocalStorage(lapsTime);
}

function addLapsInLocalStorage(lapsTime){
    let laps = getFromLocalStorage();
    
    // Check the lenth of Laps
    checkLengthOfLaps(laps);

    // Add the lapsTime into the array
    laps.push(lapsTime);

    // Convert lapsTime array into String
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
        
        localStorage.setItem('stoppedTime', div.textContent );
        
        let lapsData = (hours > 9 ? hours : "0" + hours) + ":" +
                        (minutes > 9 ? minutes : "0" + minutes) + ":" +
                        (seconds > 9 ? seconds : "0" + seconds);
        console.log("laps Data",lapsData);
        
        alert('Yo cannot add more than 10 time-laps');
        window.location.reload(true);
        if(laps[0]){
            laps.splice(laps[0],1);
        }
        
    }
    
    // Save the data
    localStorage.setItem('laps', JSON.stringify(laps) );
    
}

function stopTime(){

    clearTimeout(t);
    startBtn.disabled = false;
    stopBtn.disabled = true;

    let lapsTime = [];
    lapsTime = (hours > 9 ? hours : "0" + hours) + ":" +
                (minutes > 9 ? minutes : "0" + minutes) + ":" +
                (seconds > 9 ? seconds : "0" + seconds);

    // Convert lapsTime array into String
    localStorage.setItem('stoppedTime',  lapsTime );
}

function removelAllLaps(){
    let lapsLS = localStorage.getItem('laps');

    if (lapsLS != null){
        lapsLS = [];          
    }
    
    // Save the data
    localStorage.setItem('laps', JSON.stringify(lapsLS) );
    const lapsLabel = document.getElementById('laps');
    lapsLabel.textContent = "";
}

function addLogsInLocalStorage(lastStoppedWatchTime){
    const timeLogs = getLogsFromLocalStorage();
    const divLogs = document.getElementById('logs');
    divLogs.textContent = '';
    
    // Check the lenth of Laps
    checkLengthOfLogs(timeLogs);

    // Add the lapsTime into the array
    timeLogs.push(lastStoppedWatchTime);

    // Convert lapsTime array into String
    localStorage.setItem('timerlogs', JSON.stringify( timeLogs ) );
    
    addTimeLogs(timeLogs);
}

function addTimeLogs(timeLogs){
    const divLogs = document.getElementById('logs');
    const raisedSegment = document.createElement('div');
    raisedSegment.classList = 'ui raised segment';
    const ribbon = document.createElement('a');
    ribbon.classList = 'ui red ribbon label';
    ribbon.textContent = "Last Stopped Watch Logs";
    raisedSegment.appendChild(ribbon);

    timeLogs.forEach(function(timelog){
        const pTag = document.createElement('p');
        pTag.innerHTML = `${timelog}`;

        raisedSegment.appendChild(pTag);
    });
    
    divLogs.appendChild(raisedSegment);
}


function getLogsFromLocalStorage(){
    let timeLogs;
    const logsLS = localStorage.getItem('timerlogs');
    if (logsLS == null){
        timeLogs = [];        
    }
    else{
        timeLogs = JSON.parse( logsLS );
    }
    console.log(timeLogs);
    
    return timeLogs;
}

function checkLengthOfLogs(timeLogs){
    if (timeLogs.length > 9){
        
        localStorage.setItem('timerlogs', JSON.stringify(div.textContent) );
        
        if(timeLogs[0]){
            timeLogs.splice(laps[0],1);
        }
        
    }
    
    // Save the data
    localStorage.setItem('timerlogs', JSON.stringify(timeLogs) );
}