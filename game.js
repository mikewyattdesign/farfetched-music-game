// JavaScript Document
var padArray = [1,2,3,4,5,6,7,8,9,10];
var keyArray = [1,2,3,4,5,6,7,8,9,10];
var currentPad =0;
var previousPad =0;
var nextPad =1;
var highestPad = 0;
var dropTimer, dropTimer1, dropTimer2, dropTimer3, dropTimer4;
var dropsArraySeconds = 
[
0,		//[0] welcome 
11.637,	//[1] welcomefast
18.982,	//[2] nowyoutry
20.922,	//[3] fresh
22.817,	//[4] wack
24.061,	//[5] watchforthedrop
25.356,	//[6] tryagain
26.585,	//[7] ready set go
28.952,	//[8] dope
30.578	//[9] now you try fast
];

var dropsDurations = [
11.637,
7.345,
1.94,
1.895,
1.244,
1.295,
1.229,
2.367,
1.626,
1.94
];

var padTimer;
var playTimer;
var dropTimer;
var numberOfSlices = 8;
var sliceTime;
var steps=0;
$(document).ready(
	function(){
		fisherYates(padArray);
		makeKeyArray(padArray,keyArray);
		
		//$('audio #beat_1').oncanplaythrough = welcome();
		
		$('.pad-1').click(function(){stopLoop(); padPress(0);});	
		$('.pad-2').click(function(){stopLoop(); padPress(1);});	
		$('.pad-3').click(function(){stopLoop(); padPress(2);});			
		$('.pad-4').click(function(){stopLoop(); padPress(3);});	
		$('.pad-5').click(function(){stopLoop();padPress(4);});	
		$('.pad-6').click(function(){stopLoop();padPress(5);});	
		$('.pad-7').click(function(){stopLoop();padPress(6);});	
		$('.pad-8').click(function(){stopLoop();padPress(7);});	
		$('.pad-9').click(function(){stopLoop();padPress(8);});	
		$('.pad-10').click(function(){stopLoop();padPress(9);});	
			
		$('#play').click(function(){
			playLoop();});
		$('#stop').click(function(){stopLoop();});
		$('#pause').click(function(){$('audio')[0].pause(); });
							
							
		$('#knob-0').click(function(){$('.machine').css('background-image',"url(beatmachine_0.png)");})
		$('#knob-1').click(function(){$('.machine').css('background-image',"url(beatmachine_1.png)");})
		$('#knob-2').click(function(){$('.machine').css('background-image',"url(beatmachine_2.png)");})
		$('#knob-3').click(function(){$('.machine').css('background-image',"url(beatmachine_3.png)");})
		$('#knob-4').click(function(){$('.machine').css('background-image',"url(beatmachine_4.png)");})
																				
		$(document).keydown(function(key){
			switch(key.which){
			case 81: 	//q 
				$('#sub-display-right p').text('q');
				stopLoop();
				padPress(4);
				break;
			case 87:	//w
				$('#sub-display-right p').text('w');
				stopLoop();
				padPress(5);
				break;
			case 69:	//e
				$('#sub-display-right p').text('e');
				stopLoop();
				padPress(6);
				break;
			case 82:	//r				
				$('#sub-display-right p').text('r');
				stopLoop();
				padPress(7);
				break;
			case 65:	//a	
				$('#sub-display-right p').text('a');	
				stopLoop();
				padPress(0);
				break;
			case 83:	//s			
				$('#sub-display-right p').text('s');	
				stopLoop();
				padPress(1);
				break;
			case 68:	//d			
				$('#sub-display-right p').text('d');	
				stopLoop();
				padPress(2);
				break;
			case 70:	//f				
				$('#sub-display-right p').text('f');
				stopLoop();
				padPress(3);
				break;
			case 90:	//z				
				$('#sub-display-right p').text('z');
				stopLoop();
				padPress(9);
				break;
			case 88:	//x				
				$('#sub-display-right p').text("x");
				stopLoop();
				padPress(8);
				break;
			case 32:	//spacebar
				if($('#stop').hasClass("active")){
				playLoop();}
				else{
					stopLoop();	
				}
				break;
			}
		});
		
		$(document).keyup(function(key){
			switch(key.which){
			case 81: 	//q 
				//padRelease(5);
				break;
			case 87:	//w
				//padRelease(6);
				break;
			case 69:	//e
				//padRelease(7);
				break;
			case 82:	//r				
				//padRelease(8);
				break;
			case 65:	//a	
				//padRelease(1);
				break;
			case 83:	//s			
				//padRelease(2);
				break;
			case 68:	//d			
				//padRelease(3);
				break;
			case 70:	//f				
				//padRelease(4);
				break;
			case 90:	//z				
				//padRelease(10);
				break;
			case 88:	//x								
				//padRelease(9);
				break;
			case 32:	//spacebar
				break;
			}
		});
		
	});

function padPress(number,manual){
	if(typeof manual == 'undefined') {
        manual = true;
    }
	

	$('.pad').removeClass("active");	
	$('.pad-'+(number+1)).addClass("active");
	$('#play').addClass("active");
	$('#stop').removeClass("active");
	$('#sub-display-left p').text(padArray[number]);
	
	if(manual){
		//update current pad
		currentPad = padArray[number];
		$('#current-pad').text('Current Pad:' + currentPad);
		
		//check if current pad is the correct one
		if (currentPad === nextPad)
		{
			success();	
		}
		else if (currentPad === 1)
		{
			nextPad = currentPad % numberOfSlices + 1;
			$('#next-pad').text('Next Pad: '+	nextPad);
		} 
		else{
			mistake();
		}

		
	}

// jump current time to corresponding slice
// the padArray stores the slice number
	$('audio')[0].currentTime=audioSlice(padArray[number],8);	

	
	$('audio')[0].play();
	nextTime = audioSlice(padArray[number],8)+sliceDuration(8);

	timer = setInterval(function () {
    if ($('audio')[0].currentTime >= nextTime) {
      $('audio')[0].pause();
	  padRelease(number+1);
      clearInterval(timer);
    } }, 10);
}

function audioSlice(sliceNumber,numOfSlices){
	return ((sliceNumber-1)%numOfSlices)*sliceDuration(numOfSlices);
}

function sliceDuration(numOfSlices){
	return 	$('audio')[0].duration/numOfSlices;
}

function padRelease(number){
		
	
	
	$('.pad-'+number).removeClass("active");
	$('#play').removeClass("active");
	$('#stop').addClass("active");
}


//pads should light up as activated during playthrough
function playLoop(){
/*	$('.pad').removeClass("active");
	$('#play').addClass("active"); 
	$('#stop').removeClass("active");	
	$('audio')[0].pause(); 
	$('audio')[0].currentTime=0; */
	sliceTime = sliceDuration(numberOfSlices)*1000;
	$('#main-display p').text('play the pattern');
	padPress(keyArray[0],false);
	var i=2;	
	playTimer = setInterval(function(){

			if(i<9 ){
				padPress(keyArray[i-1], false);
				i++;	
			}
			else{stopLoop(); clearInterval(playTimer);}
	}, sliceTime);
	
}

function stopLoop(){
	clearInterval(playTimer);
	$('#stop').addClass("active");		
	$('#play').removeClass("active");
	$('.pad').removeClass("active");
	$('audio')[0].pause();
	$('audio')[0].currentTime=0;
	$('#drops')[0].pause;
}
/* Good Ole fisherYates Shuffle */
function fisherYates ( myArray ) {
  var i = myArray.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     tempi = myArray[i];
     tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}

function makeKeyArray(src, dest){
	for(var i=1;i<=10;i++)
	{
			dest[i-1] = src.indexOf(i);
	}
}

/* 
Title: Welcome
Purpose: load beat and play welcome sound
*/
function welcome(){
	//display welcome text

	
	//welcome to the ff-5000
	$('#main-display p').text('Welcome to the FF-5000');

		
	//sonic memory exercise module (2. s)
	dropTimer1 = setInterval(function(){
		$('#main-display p').text('sonic memory exercise module');	
		clearInterval(dropTimer1);
	},3000);
		

	//are you ready to turn up (5 s)
	dropTimer2 = setInterval(function(){
$('#main-display p').text('are you ready to turn up?');	
		clearInterval(dropTimer2);
},6000);



	//let's go (7.5s)
dropTimer3 = setInterval(function(){
$('#main-display p').text("let's go.");	
		clearInterval(dropTimer3);
},8100);

//
dropTimer4 = setInterval(function(){
$('#main-display p').text("now watch for the drop.");	
		clearInterval(dropTimer4);
},9800);


dropTimer = setInterval(function(){
		if(dropStop(11.4))
		{
			clearInterval(dropTimer);	
			playLoop();
		}
				//clearInterval(dropTimer5);
		},10);

	
	//play welcome function
	$('audio#drops')[0].pause();
	if ($('audio#drops')[0].currentTime!==0)
	{$('audio#drops')[0].currentTime=0;	stopLoop();}
	$('#drops')[0].play();
	
	//playLoop();
}


function dropStop(timeToStop, debug){
	if(typeof debug == 'undefined') {
        debug = false;
    }
		if(debug){
			$('#sub-display-left p').text($('audio#drops')[0].currentTime + "/" + timeToStop);
		}
		
	if ($('audio#drops')[0].currentTime >= timeToStop) {
      	$('audio#drops')[0].pause();
		if(debug){
			$('#sub-display-left p').text($('audio#drops')[0].currentTime + "/" + timeToStop);
		}
		clearInterval(dropTimer);
		return true;
	}
	return false;
}
/* 
Title: beatPlay
Purpose: demonstrates the beat through steps number of samples
*/
function beatPlay(steps){
	
}

function clearDropTimers(){
		clearInterval(dropTimer1);
		clearInterval(dropTimer2);
		clearInterval(dropTimer3);
		clearInterval(dropTimer4);
		clearInterval(dropTimer);	
}

function nowYouTry(){

		clearDropTimers();
		
		$('audio#drops')[0].pause();
		$('audio#drops')[0].currentTime = dropsArraySeconds[2];
		$('audio#drops')[0].play();
		
		dropTimer = setInterval(function(){
		if(dropStop(dropsArraySeconds[3]-0.2))
		{
			clearInterval(dropTimer);	
		}
				//clearInterval(dropTimer5);
		},10);
}
/* 
Title: tryAgain
Purpose:
*/
function tryAgain(){
	playDrop(6);
		
}

/* 
Title: success
Purpose:
*/
function success(){
	playDrop(8);
	$('#main-display p').text('good job!');
	//update previousPad
	previousPad = currentPad;	
	$('#previous-pad').text('Previous Pad: '+previousPad);

	//update nextPad
	highestPad = nextPad = currentPad % numberOfSlices + 1;
	$('#next-pad').text('Next Pad: '+	nextPad);
	$('#highest-pad').text('Highest Pad: '+highestPad);
}

/* 
Title:
Purpose:
*/
function mistake(){
		playDrop(4);
		nextPad = 1;
		previousPad = 0;
		$('#main-display p').text('start over...');
}

function playDrop(number){
				clearDropTimers();
		
		$('audio#drops')[0].pause();
		$('audio#drops')[0].currentTime = dropsArraySeconds[number];
		$('audio#drops')[0].play();
		
		dropTimer = setInterval(function(){
		if(dropStop(dropsArraySeconds[number+1]-0.25))
		{
			clearInterval(dropTimer);	
		}
				//clearInterval(dropTimer5);
		},10);	
}
/*
var dogBarkingBuffer = null;
var context = new webkitAudioContext();
window.addEventListener('load', init, false);
function init() {
  try {
    context = new webkitAudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function loadDogSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(dogBarkingBuffer) {
      dogBarkingBuffer = buffer;
    }, onError);
  }
  request.send();
}
function onError(){
	alert('Smh. #bufferfail');	
}

function playSound() {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = dogBarkingBuffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.noteOn(0);                          // play the source now
}

loadDogSound('/u/15672882/Run1.ogg');
//RhythmSample.play = playSound(dogBarkingBuffer);

/*var RhythmSample={};
RhythmSample.play=function(){
	function playSound(buffer,time)
	{
		var source=context.createBufferSource();
		source.buffer=buffer;
		source.connect(context.destination);
		source.noteOn(time);
	}
	var kick=BUFFERS.kick;
	var snare=BUFFERS.snare;
	var hihat=BUFFERS.hihat;
	var startTime=context.currentTime+0.100;
	var tempo=80;
	var eighthNoteTime=(60/tempo)/2;
	for(var bar=0;bar<2;bar++)
	{
		var time=startTime+bar*8*eighthNoteTime;
		playSound(kick,time);
		playSound(kick,time+4*eighthNoteTime);
		playSound(snare,time+2*eighthNoteTime);
		playSound(snare,time+6*eighthNoteTime);
		for(var i=0;i<8;++i)
		{
			playSound(hihat,time+i*eighthNoteTime);
		}
	}
};
*/