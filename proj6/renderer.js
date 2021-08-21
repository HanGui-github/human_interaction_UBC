// Tips and hints are provided throughout, make sure to read them!
const app = require('electron').remote.app;
const fileDir = app.getPath('desktop');
const path = require("path");

var fs = require('fs');

// this will hold all the data we need
var dataLog = "";

// this will count how many clicks have occured
var clicks = 0;

// max number of trials to run 
var maxTrials = 5;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: Complete these declaration statements to get all the required elements from your HTML file! 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// reference our start button
var startButton = document.getElementById("startBtn");

// display how many tasks a user has completed (choose the correct HTML element)
var counterDisplay = document.getElementById("counter");

// display the target icon to click (find the element with this HTML tag)
var indicator = document.getElementById("indicator");


// element that holds all your icons 
var parent = document.getElementById("iconDrawer");


// array of all icons (hint: use the parent var to reference its children icons)
var icons = new Array(5);
icons[0] = parent.getElementsByClassName("icon")[0];
icons[1] = parent.getElementsByClassName("icon")[1];
icons[2] = parent.getElementsByClassName("icon")[2];
icons[3] = parent.getElementsByClassName("icon")[3];
icons[4] = parent.getElementsByClassName("icon")[4];


// display the position of your mouse
var positionDisplay = document.getElementById("position");

// count the frequencies
var frequencyDisplay = document.getElementById("frequency");
var frequencies = new Array(5);
// initialize
for (var i = 0; i < frequencies.length; i++) {
	frequencies[i] = [i, 0];
}


// get mouse positions
function getMousePos(e) {
    return {x:e.clientX,y:e.clientY};
}

// onmousemove 'mouseTrap' function 
//with the corresponding HTML element to display the current coordinates
document.onmousemove=function(e) {
    var mousecoords = getMousePos(e);
    //alert(mousecoords.x);alert(mousecoords.y);
	var pos_info = "You are at: (" + mousecoords.x + ", " + mousecoords.y + ")";
	
	//
	//var icon0 = document.getElementById('i0'); 
	//var delta_x = mousecoords.x - icon0.offsetLeft;
	//var delta_y = mousecoords.y - icon0.offsetTop;
	//var dis_info = "(" + delta_x + ", " + delta_y + ")";
	//positionDisplay.innerHTML = pos_info + ", " + dis_info;
	
	positionDisplay.innerHTML = pos_info;
	cal_distance(mousecoords); 
};

// Technique 1: Expanding Targets
function cal_distance(mousecoords){
	var i = 0;
	
	// if distance > 100, no changes
	var dis_threshold = 100.0;
	
	// this is the original size of each icon
	var size = 50;
	
	while(i<5){
		var id = "i" + i;
		var icon = document.getElementById(id); 
		// relative differences
		var dx = mousecoords.x - icon.offsetLeft;
		var dy = mousecoords.y - icon.offsetTop;
		// distance, choose the closest icon
		var distance = Math.sqrt(dx *dx + dy * dy);
		
		// grow or shrink according to distance
		if(distance > dis_threshold){
			icon.style.width = icon.style.height = size + 'px';
		}else{
			new_size = size * (dis_threshold/(dis_threshold/2+distance) );
			if(new_size < size){
				new_size = size;
			}
			icon.style.width = icon.style.height = new_size + 'px';
		}
		
		i++;
	}
}


/////////////////////////////////////////////////////////////////////////////////////
// TODO: Set the filepath so you know where the .csv file is going! 
/////////////////////////////////////////////////////////////////////////////////////

function save()
{
  // change the filepath in the writeFile() function
  fs.writeFile(path.resolve(fileDir, "JStest.csv"), dataLog, (err)=> {
    if (err) alert(err);
    alert("all tasks are done");
  });
}

/////////////////////////////////////////////
// TODO: Complete the randomIcon function! //
/////////////////////////////////////////////

function randomIcon()
{
  // Generate a random number in the appropriate range 
  var iconIndex = Math.floor(Math.random() * Math.floor(5));

  return iconIndex;
}

/////////////////////////////////////////////
// TODO: Complete the timedClick function! //
/////////////////////////////////////////////
var timedClick = function()
{
  // disables the start button so user can't press it twice 
  startButton.onclick = function(){
    //startButton.disabled = true;
	
	// if set the startButton.disabled as true
	// then there is a problem if clicking startButton continuously twice
	// because this startButton will be disable and cannot activate again, 
	// if not set: startButton.disabled as false
	// here just leave it as empty
  }

  // call randomIcon function to get random index and the matching icon
  var targetIndex = randomIcon();
  var targetIcon = icons[targetIndex];

  // Update the 'indicator' element to show the target icon 
  // Hint: you need to access the attribute of targetIcon
  indicator.src = targetIcon.src;

  // start timing right here
  var start = performance.now();
  // this is where we are going to start watching for clicks on icons
  // this loop will add an onclick function to each icon
  for(var i=0; i < icons.length; i++)
  {
    icons[i].onclick = function()
    {
      // everything in here will occur when an icon is pressed

      // stop timing and record how long it took
      // calculate time elapsed 
      // record whole milliseconds (use Math.round())
      var end = performance.now();
      var timer = Math.round(end - start);
	  alert("that took: " + timer + " milliseconds"); 
	  
      // we want to ensure only 1 icon can be clicked at a time, so disable all the onclicks now! 
      // HINT: loop through all the icons and disable the function like we did with the start button      
      for(var k = 0; k < icons.length; k++){
        icons[k].onclick = function(){
          //icons[k].disabled = true;
        }
      }
      
      // record the time and positions of the target icon and the icon the user actually pressed
      // this is to be stored in a new line in the 'dataLog' variable
      // append to the 'dataLog' variable, a line like 'timeTaken','targetIndex','iconClicked'
      // to save you some headache, we define iconClicked for you
      var iconClicked = this.id[1]; // INCLUDE THIS
      var index = clicks + 1;
	  var record = index + ", " + targetIndex + ", " + iconClicked + ", " + timer;
	  record = record + "\n";
	  
      // now add to the end of the 'dataLog' variable as explained above
      dataLog = dataLog + record;
	  
      // increment clicks completed
      clicks++;
	  
	  
	  // -----------------------
		// clicked icon + 1
	  for (var i = 0; i < frequencies.length; i++) {
		  if(frequencies[i][0] == iconClicked){
			frequencies[i][1]++;  
		  }	
	  }
		// original order, show the frequencies
	  var frequency_info = "";
	  for (var i = 0; i < 5; i++) {
		  var ic_id = i;		  
		  var ic_fre = 0;
		  for (var j = 0; j < frequencies.length; j++) {
			  if(frequencies[j][0] == ic_id){
				ic_fre = frequencies[j][1];
				break;
			  }	
		  }		  
		  frequency_info = frequency_info + ic_fre + ", ";
	  }	  
		frequencyDisplay.innerHTML = "frequencies: " + frequency_info;
		// sort those icon by click-number
	  for (var i = 0; i < frequencies.length; i++) {
		  for (var j = 0; j < frequencies.length; j++) {
			  if(frequencies[j][1] < frequencies[i][1]){
				  var tmp = frequencies[i];
				  frequencies[i] = frequencies[j];
				  frequencies[j] = tmp;
			  }	
		  }		  
	  }
	  var frequency_info = "";
	  for (var i = 0; i < frequencies.length; i++) {
			  //
			  var before_id = "i" + frequencies[i][0];			  
			  var before = document.getElementById(before_id);
				parent.appendChild( before );
		  //frequency_info = frequency_info + frequencies[i][1] + " ";
		  frequency_info = frequency_info + frequencies[i][0] + ", ";
	  }
		var new_order = "new Order: " + frequency_info;
	    frequencyDisplay.innerHTML += new_order;
      // -----------------------
	  
	  
	  
	  // update what the counterDisplay says!
      // modify the innerHTML property of counterDisplay
      // it should show the user how many clicks have currently been completed
      counterDisplay.innerHTML = clicks + " clicks have currently been completed.";
	  
      // if maxTrials is reached, then data collection is over, so call save and reset 'clicks' and 'dataLog'
      if(clicks % maxTrials == 0){
        save(); // write into csv
		
        dataLog = "";
		clicks = 0;
      }
	  
	  // -----------------------
	  // re-order the children icons
		
		
	  //
	  // -----------------------
	  

      // reactivate the start button by changing the onclick function from nothing back to starting the trial
      startButton.onclick = timedClick;

    }
  }
}

window.onload = function() 
{ 
  // majority of the work will be done in timedClick
  startButton.onclick = timedClick;
}