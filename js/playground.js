var gblock = 170;
var vol = new Tone.Volume(-12);
var eq3 = new Tone.EQ3({
	"low": 0,
	"mid": 0,
	"high": 0,
	"lowFrequency": 400,
	"highFrequency": 2500
});
var searchstr = document.getElementById("searchTB").value;

var currentstring = document.getElementById('dataString');
var currentstringlength = currentstring.length;
var start = currentstringlength - currentstringlength;
var end = start + 2;
var blockstream = "https://blockstream.info/api/";

var reverb = new Tone.Reverb({
	"decay": 5,
	"preDelay": 0.01
}).toMaster();
var chorus = new Tone.Chorus(8, 5, 1).toMaster();
var pingpongdelay = new Tone.PingPongDelay({
	"delayTime": "16n",
	"feedback": 0.8,
	"wet": 0.25
}).toMaster();
var tremolo = new Tone.Tremolo();
var vibrato = new Tone.Vibrato({
	"maxDelay": 0.005,
	"frequency": 15,
	"depth": 0.1

}).toMaster();
var phaser = new Tone.Phaser({
	"frequency": 8,
	"octaves": 4,
	"baseFrequency": 1000
}).toMaster();

function selecteffect(effect) {

	var effecttype = document.getElementById("effect").value;


	switch (effecttype) {

		case "reverb":

			effect = reverb;
			break;

		case "chorus":
			effect = chorus;
			break;

		case "pingpongdelay":
			effect = pingpongdelay;
			break;

		case "tremolo":
			effect = tremolo;
			break;

		case "vibrato":
			effect = vibrato;
			break;

		case "phaser":
			effect = phaser;
			break;

	}

	return effect;

}
function selectslice(slice) {

	var slicetype = document.getElementById("slice").value;

	switch (slicetype) {
		//case "raw":

		//	slice = slicestrg();			
		//	instrument.triggerAttackRelease(slice, '4n');
		//	$("#slicestrg").css('color', 'red', function (i) { return i + 25; });

		//	break;
		case "slice":

			slice = slicestrg();
			instrument.triggerAttackRelease(slice, '4n');

			break;

		case "next":
			slice = nextslice();
			instrument.triggerAttackRelease(slice, '4n');
			break;

		case "whole":
			slice = wholeslice();
			instrument.triggerAttackRelease(slice, '4n');
			break;

		case "half":
			slice = halfslice();
			instrument.triggerAttackRelease(slice, '4n');

			break;
	}
	return slice;

}

function changeeffect() {
	var s = instrument;
	var e = selecteffect();
	s.connect(e);
}

var countGetstringcalls = 0;
var currentMerkle;
var currentHash;

function getblockinfo(hash, merkleroot) {
	//searchstr = document.getElementById("searchTB").value;
	//Need Hash to get Root of Height
	$.get(blockstream + "block-height/" + searchstr, function (data) {
		hash = `${data}`;
		$.get(blockstream + "block/" + hash, function (block) {
			merkleroot = `${block.merkle_root}`;

			document.getElementById('testTB').value = merkleroot;
		});
	});
}


function getstring(stringtype, merkleroot, hash) {
	searchstr = document.getElementById("searchTB").value;
	stringtype = document.getElementById("stringtype").value;
	var stringtypetoggle = document.getElementById("stringtype").value;

	//GET block tip
	$.get(blockstream + "blocks/tip/height", function (data) {
		getblocks = `${data}`;
		document.getElementById('blocksTB').value = "Highest Block: " + getblocks;
		if (searchstr < 0) {

			alert("TOO LOW! Please select Height 0 to " + getblocks);
			//document.getElementById("searchTB").value = 0;
		}
		if (searchstr > getblocks) {
			alert("TOO HIGH! Please select Height 0 to " + getblocks);
			//document.getElementById("searchTB").value = 0;
		}

	});


	//GET Root and Hash of Height
	$.get(blockstream + "block-height/" + searchstr, function (data) {
		hash = `${data}`;



		$.get(blockstream + "block/" + hash, function (block) {
			var timestamp = block.timestamp;
			var ts = Date(timestamp);
			merkleroot = `${block.merkle_root}`;

			var info = `Now Playing: Height ${block.height}	Timestamp: ${timestamp}<br>				
				Merkle Root: ${block.merkle_root}<br>
						Hash: ${hash}<br>
							Calling on Blockstream for blockchain info`;
			$(".blockinfo").html(info);

			switch (stringtype) {


				case "root":

					document.getElementById('dataString').value = merkleroot;
					document.getElementById('clipTB').value = merkleroot;

					break;

				case "hash":
					document.getElementById('dataString').value = hash;
					document.getElementById('clipTB').value = hash;
					break;

			}


		});
	});


}

function slicestrg() {
	//var m = currentstring.value;
	var m = document.getElementById('clipTB').value;
	var strgslice = m.slice(start, end);
	//document.getElementById("slicestrg").value = strgslice;
	document.getElementById("stringindex").value = start + "," + end;
	return strgslice;

}
function nextslice() {
	var nextstart = start++;
	var nextend = end++;
	var nextindex = slicestrg(nextstart, nextend);
	//document.getElementById("nextslice").value = nextindex;

	return nextindex;
}
function prevslice() {
	var prevstart = start--;
	var prevend = end--;
	var previndex = slicestrg(prevstart, prevend);
	//document.getElementById("testTB").value = previndex;

	return previndex;
}
function wholeslice() {

	var wslice = nextslice();
	start++;
	end++;
	//document.getElementById("whole").value = "whole = " + wslice;	
	return wslice;

}
function halfslice() {
	var nexthalf = wholeslice();
	//document.getElementById("half").value = "half = " + nexthalf;
}
function resetslice() {
	start = 0;
	end = start + 2;

	playstr();
}

function loopseq() {
	start = 0;
	end = start + 2;
	playseq();
}
function noloopseq() {
	start = 0;
	end = start + 2;
	playallheights();
}


function heightplus100k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 100000 + parseInt(h, 10);
	getstring(h);
}
function heightplus10k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 10000 + parseInt(h, 10);
	getstring(h);
}
function heightplus1k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 1000 + parseInt(h, 10);
	getstring(h);
}
function heightplus100() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 100 + parseInt(h, 10);
	getstring(h);

}
function heightplus10() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 10 + parseInt(h, 10);
	getstring(h);
}
//next height
function nextheight() {
	var h = document.getElementById("searchTB").value;
	h++;
	document.getElementById("searchTB").value = h;
	getstring(h);

}
//previous height
function prevheight() {
	var h = document.getElementById("searchTB").value;
	h--;
	document.getElementById("searchTB").value = h;
	getstring(h);


}
function heightminus100k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 100000;
	getstring(h);
}
function heightminus10k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 10000;
	getstring(h);
}
function heightminus1k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 1000;
	getstring(h);
}
function heightminus100() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 100;
	getstring(h);
}
function heightminus10() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 10;
	getstring(h);
}

var cliptb = document.getElementById('clipTB');

function wholeString() {
	var m = currentstring.value;
	var start = 0;
	var end = 64;
	var strgslice = m.slice(start, end);
	cliptb.value = strgslice;
	cliptb.focus();
	cliptb.select();
}
function halfString() {
	var m = currentstring.value;
	var start = 0;
	var end = 32;
	var strgslice = m.slice(start, end);
	cliptb.value = strgslice;
	cliptb.focus();
	cliptb.select();
}
function quarterString() {
	var m = currentstring.value;
	var start = 0;
	var end = 16;
	var strgslice = m.slice(start, end);
	cliptb.value = strgslice;
	cliptb.focus();
	cliptb.select();
}
function eighthString() {
	var m = currentstring.value;
	var start = 0;
	var end = 8;
	var strgslice = m.slice(start, end);
	cliptb.value = strgslice;
	cliptb.focus();
	cliptb.select();
}



function bd() {

	var metro = new Tone.Player("/Metronome/Box_5_BD.mp3").toMaster();
	metro.autostart = true;
	Tone.Transport.bpm.value = 60;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, "4n");
		Tone.Transport.start();
	};
	Tone.Transport.start();

	
}
function ClsdHH() {
	var metro = new Tone.Player("/Metronome/Box_5_ClsdHH.mp3").toMaster();
	metro.autostart = true;
	Tone.Transport.bpm.value = 60;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, "4n");
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function OpenClsd() {
	var metro = new Tone.Player("/Metronome/Box_5_OpenClsd.mp3").toMaster();
	metro.autostart = true;
	Tone.Transport.bpm.value = 60;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, "4n");
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function OpenHH() {
	var metro = new Tone.Player("/Metronome/Box_5_OpenHH.mp3").toMaster();
	metro.autostart = true;
	Tone.Transport.bpm.value = 60;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, "4n");
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function RimShot() {
	var metro = new Tone.Player("/Metronome/Box_5_RimShot.mp3").toMaster();
	metro.autostart = true;
	Tone.Transport.bpm.value = 60;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, "4n");
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function RimShot_2() {
	var metro = new Tone.Player("/Metronome/Box_5_RimShot_2.mp3").toMaster();
	metro.autostart = true;
	Tone.Transport.bpm.value = 60;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, "4n");
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}

function playtext() {
	responsiveVoice.speak("For those who don't know me, I'm Hal Finney.");
}
var timeout;

function stoptimeout() {
	clearTimeout(timeout);
}
function playselected() {

	var txt = "";

	if (document.getSelection) {
		txt = document.getSelection();
		document.getElementById("clipTB").value = txt;

	}
	cliptb.blur();
	playseq();

}

function playseq() {
	stoptimeout();
	var n = nextslice();
	//var n = slicestrg();	
	var timeMenu = document.getElementById("time");
	timeTime = Number(timeMenu.options[timeMenu.selectedIndex].value);
	timeout = setTimeout(playseq, timeTime);
	
	playstr();


	if (n === "") {
		loopseq();
	}
}
function playstr(string) {
	selectslice();
	var s = slicestrg();
	nextslice();
	
	instrument.triggerAttackRelease(s, '4n');

	//bd();
	//ClsdHH();
	//OpenHH();
	//OpenClsd();
	//RimShot();
	//RimShot_2();
	//instrument.frequency.setValueAtTime(s);
	return string;
}


function changevolume() {
	// Volume Slider[0]
	var audiosliders = document.getElementById("vol-panel");
	var sliders = audiosliders.getElementsByTagName('webaudio-slider');

	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[0];
		slider.addEventListener("change", function (e) {

			document.getElementById("testTB").value = this.value;
			vol.volume.value = this.value;
			instrument.chain(vol, Tone.Master);

			//vol.volume.rampTo(1, 1);
		});
	}
}
function changeEQ() {
	var eqbase = document.getElementById("vol-panel");
	var eq = eqbase.getElementsByTagName('webaudio-slider');
	//document.getElementById("testTB").value = eq.length;
	for (var i = 0; i < eq.length; i++) {

		var eqlow = eq[2];
		var eqmid = eq[3];
		var eqhigh = eq[4];
		eqlow.addEventListener("change", function (e) {
			document.getElementById("testTB").value = this.value;
			eqlow = this.value;
			instrument.chain(eqlow, Tone.Master);
		});
		eqmid.addEventListener("change", function (e) {
			document.getElementById("testTB").value = this.value;
			eqmid = this.value;
			instrument.chain(eqmid, Tone.Master);
		});
		eqhigh.addEventListener("change", function (e) {
			document.getElementById("testTB").value = this.value;
			eqhigh = this.value;
			instrument.chain(eqhigh, Tone.Master);
		});


	}

	instrument.chain(eq3, vol, Tone.Master);

}
function changePan() {
	// Pan Slider[1]
	var audiosliders = document.getElementById("vol-panel");
	var sliders = audiosliders.getElementsByTagName('webaudio-slider');
	var panVol = new Tone.Panner();
	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[1];
		slider.addEventListener("change", function (e) {

			document.getElementById("testTB").value = this.value;
			panVol.pan.value = this.value;
			instrument.chain(panVol, vol, Tone.Master);
		});
	}

}
function play101273() {
	//
	var powerswitch = document.getElementById("powerswitch");
	var toggles = powerswitch.getElementsByTagName('webaudio-switch');
	for (var i = 0; i < toggles.length; i++) {
		var toggle = toggles[0];
		toggle.addEventListener("change", function (e) {

			document.getElementById("testTB").value = "this.value";
			loadPreset("MembraneSynth");
			
		});
	}

}

function midiSwitches() {
	var midiswitches = document.getElementById("midiswitches");
	var switches = midiswitches.getElementsByTagName("webaudio-switch");
	for (var i = 0; i < switches.length; i++) {
		var midiswitch = switches[1];
			//midiswitch.addEventListener('click', function (e) {});
		webAudioControlsMidiManager.addMidiListener(function (event) {
			var data = event.data;
			var channel = data[0] & 0xf;
			var controlNumber = data[1];

			console.log("Midi event hook: data:[" + data + "] channel:" + channel + " cc:" + controlNumber);
			
			
			// do whatever you want with the event
			// ...
			switch (controlNumber) {
				
				case 81:
					start = 0;
					end = start + 2;
					wholeString();
					playseq();
					break;

				case 83:
					start = 0;
					end = start + 2;
					halfString();
					playseq();
					break;

				case 84:
					start = 0;
					end = start + 2;
					quarterString();
					playseq();
					break;

				case 86:
					start = 0;
					end = start + 2;
					eighthString();
					playseq();
					break;
				case 74:
					start = 0;
					end = start + 2;
					slicestrg();
					playseq();
					break;

				case 76:
					start = 0;
					end = start + 2;
					nextslice();
					playseq();
					break;

				case 77:
					start = 0;
					end = start + 2;
					wholeslice();
					playseq();
					break;

				case 79:
					start = 0;
					end = start + 2;
					halfslice();
					playseq();
					break;
			}

			return switches;
		});

	}
}

function clipslider() {
	// Clip Slider[0]
	var clipliders = document.getElementById("blocknav");
	var sliders = clipliders.getElementsByTagName('webaudio-slider');
	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[0];
		slider.addEventListener("change", function (e) {

			document.getElementById("testTB").value = this.value;
			start = this.value;
			end = this.value + 2;
		});
	}

}
function muteaudio() {
	stoptimeout();

	//if (Tone.Master.mute === false) {
	//	Tone.Master.mute === true;
	//} else {
	//	Tone.Master.mute === false;
	//}


}

function playallheights() {
	var n = nextslice();
	//var n = slicestrg();	
	var timeMenu = document.getElementById("time");
	delayTime = Number(timeMenu.options[timeMenu.selectedIndex].value);
	timeout = setTimeout(playallheights, delayTime);
	playstr();

	if (n === "") {
		stoptimeout();
		nextheight();
		noloopseq();
	}
}

function clickthruseq() {
	var n = nextslice();
	playstr(n);

	if (n === "") {
		resetslice();
		//nextheight();
	}
}
function clickbackseq() {
	var p = prevslice();
	playstr(p);

	//if (p === "") {
	//	resetslice();
	//	prevheight();
	//}
}

function metrostart() {

	var metro = new Tone.Player("/Metronome/Box_5_BD.mp3").toMaster();
	metro.autostart = true;
	Tone.Transport.bpm.value = 60;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, "4n");
		Tone.Transport.start();
	};
	Tone.Transport.start();
}
function metrostop() {


	Tone.Transport.stop();
}


function resetaudio() {	
	//Tone.context.close();
	Tone.context = new AudioContext();
	stoptimeout();
}
function submitbpm() {
	var bpm = 100;
	Tone.Transport.bpm.value = bpm;
}
function loadplayground() {
	document.getElementById("searchTB").value = gblock;
	getstring(gblock);
	changevolume();
	changePan();
	changeEQ();
	pRecorder();
	clipslider();
	play101273();
	midiSwitches();
}


