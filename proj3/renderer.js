//
var portraitSection = document.getElementById("portrait-section");


// start to record
var startTime = performance.now();

var portraits = portraitSection.children;
var anxiety = portraits[2];
var despair = portraits[1];
var scream = portraits[0];
// sort
portraitSection.appendChild( anxiety );
portraitSection.appendChild( despair );
portraitSection.appendChild( scream );


var fee = document.getElementById("fee");

// get the center image
var img = document.getElementById("despair");
var imgWidth = img.width;
var imgHeight = img.height;

window.onload = function(){
    for(var i=0; i < portraits.length; i++){
        portraits[i].onclick = function(){ 
			var msg = "Don't Touch The Paintings!";
            alert(msg); 
        }
    }
	
    fee.onclick = function(){
		// get the elapsed time
		var endTime = performance.now();
		var timeTaken = endTime - startTime;
		timeTaken = Math.round(timeTaken);
		
		// hide the portraits
		for(var i=0; i < portraits.length; i++)
			portraits[i].style.display = "none";
		
		// pay 
		var fee = ( timeTaken / 60 / 1000 ) * 20;
		fee = Math.round(fee);
		
		// alert
		var msg = "you need to pay $" + fee;
		alert(msg);
		
		//window.location.reload(true);
    }
	
	
    img.onclick = function(){
		var n = Math.floor(Math.random() * 10);
		if(n % 3 == 0){
			// bigger, by 50 pixels, half of the times
			img.width = imgWidth + 50;
			img.height = imgHeight + 50;
		}else if(n % 3 == 1){
			// smaller, by 50 pixels, the other half of the time
			img.width = imgWidth - 50;
			img.height = imgHeight - 50;
		}else{
			img.width = imgWidth;
			img.height = imgHeight;
		}
    }
}





