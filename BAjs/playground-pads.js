var gblock = 7559;
var vol = new Tone.Volume(-12);
var eq3 = new Tone.EQ3({
	
	"lowFrequency": 120,
	"highFrequency": 2500
});
var searchstr = document.getElementById("searchTB").value;

var currentstring = document.getElementById('blockTB');
var currentstringlength = currentstring.length;
var start = 0;
var end = start + 2;
var blockstream = "https://blockstream.info/api/";
var notation = "1n";
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
			instrument.triggerAttackRelease(slice, notation);

			break;

		case "next":
			slice = nextslice();
			instrument.triggerAttackRelease(slice, notation);
			break;

		case "whole":
			slice = wholeslice();
			instrument.triggerAttackRelease(slice, notation);
			break;

		case "half":
			slice = halfslice();
			instrument.triggerAttackRelease(slice, notation);

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


function getstring(stringtype, merkleroot, hash, getblocktip) {
	searchstr = document.getElementById("searchTB").value;
	stringtype = document.getElementById("stringtype").value;
	//GET block tip
	$.get(blockstream + "blocks/tip/height", function (data) {
		getblocktip = `${data}`;
		document.getElementById('blocksTB').value = "Highest Block: " + getblocktip;
		if (searchstr < 0) {

			alert("TOO LOW! Please select Height 0 to " + getblocktip);
			document.getElementById("searchTB").value = 0;
		}
		if (searchstr > parseInt(getblocktip)) {
			alert("TOO HIGH! Please select Height 0 to " + getblocktip);
			document.getElementById("searchTB").value = 0;
		}
	});


	//GET Root and Hash of Height
	$.get(blockstream + "block-height/" + searchstr, function (data) {
		hash = `${data}`;
		$.get(blockstream + "block/" + hash, function (block) {
			merkleroot = `${block.merkle_root}`;
			var timestamp = `${block.timestamp}`;
			var ts = timestamp.toString();
			var info = `Now Playing: Height ${block.height}	Timestamp: ${ts}<br>				
				Merkle Root: ${block.merkle_root}<br>
						Hash: ${hash}<br>
							Calling on Blockstream for blockchain info`;
			$(".blockinfo").html(info);



			switch (stringtype) {


				case "root":

					document.getElementById('blockTB').value = merkleroot;
					document.getElementById('clipTB').value = merkleroot;

					break;

				case "hash":
					document.getElementById('blockTB').value = hash;
					document.getElementById('clipTB').value = hash;
					break;

			}


		});
	});


}

function slicestrg() {	
	var m = document.getElementById('clipTB').value;
	var strgslice = m.slice(start, end);
	document.getElementById("stringindex").value = start + "," + end;
	return strgslice;

}
function nextslice() {
	var nextstart = start++;
	var nextend = end++;
	var nextindex = slicestrg(nextstart, nextend);
	return nextindex;
}
function prevslice() {
	var prevstart = start--;
	var prevend = end--;
	var previndex = slicestrg(prevstart, prevend);
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

function saySSML(conv) {
		const ssml = '<speak>' +
			'Here are <say-as interpret-as="characters">SSML</say-as> samples. ' +
			'I can pause <break time="3" />. ' +
			'I can play a sound <audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. ' +
			'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. ' +
			'Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. ' +
			'Or I can even speak in digits. Your position in line is <say-as interpret-as="digits">10</say-as>. ' +
			'I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. ' +
			'Finally, I can speak a paragraph with two sentences. ' +
			'<p><s>This is sentence one.</s><s>This is sentence two.</s></p>' +
			'</speak>';
		conv.ask(ssml);
	}

function bd() {
	saySSML();
	//var metro = new Tone.Player("/Metronome/Box_5_BD.mp3").toMaster();
	//metro.autostart = true;

	//Tone.Buffer.onload = function () {
	//	Tone.Transport.setInterval(function (time) {
	//		metro.start(time);
	//	}, notation);
	//	Tone.Transport.start();
	//};
	//Tone.Transport.start();

	
}
function ClsdHH() {
	var metro = new Tone.Player("/Metronome/Box_5_ClsdHH.mp3").toMaster();
	metro.autostart = true;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, notation);
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function OpenClsd() {
	var metro = new Tone.Player("/Metronome/Box_5_OpenClsd.mp3").toMaster();
	metro.autostart = true;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, notation);
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function OpenHH() {
	var metro = new Tone.Player("/Metronome/Box_5_OpenHH.mp3").toMaster();
	metro.autostart = true;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, notation);
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function RimShot() {
	var metro = new Tone.Player("/Metronome/Box_5_RimShot.mp3").toMaster();
	metro.autostart = true;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, notation);
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}
function RimShot_2() {
	var metro = new Tone.Player("/Metronome/Box_5_RimShot_2.mp3").toMaster();
	metro.autostart = true;

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, notation);
		Tone.Transport.start();
	};
	Tone.Transport.start();
	
}

function playtext() {
	//responsiveVoice.speak("For those who don't know me, I'm Hal Finney. ");
	responsiveVoice.speak("A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double spending problem using a peer  to  peer network.The network timestamps transactions by hashing them into an ongoing chain of hash  based proof of work, forming a record that cannot be changed without redoing the proof of work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power.As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.");
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
var speedvariable = 32;
function playseq() {
	stoptimeout();
	var n = nextslice();
	//var n = slicestrg();	
	var timeMenu = document.getElementById("time");
	// Delay Time
	//var timeTime = Number(timeMenu.options[timeMenu.selectedIndex].value);
	var bpmTime = Tone.Transport.bpm.value;
	//var timeTime = (60000 / bpmTime);
	var timeTime = speedvariable/(bpmTime / 600);
	timeout = setTimeout(playseq, timeTime);	
	document.getElementById("testTB").value = "bpmTime = " + bpmTime + " timeTime = " + timeTime;
	try {
		playstr();
		Tone.Transport.start();
	}
	catch (err) {
			// error
	}

	if (n === "") {
		loopseq();
	}
}

function playstr(string) {
	selectslice();
	var s = slicestrg();
	nextslice();
	instrument.triggerAttackRelease(s, notation);
	
	return string;
}
function changespeed() {
	
	// knob control
	var timeknob = document.getElementById("right-panel");
	var knobs = timeknob.getElementsByTagName('webaudio-knob');
	for (var i = 0; i < knobs.length; i++) {

		var notationKnob = knobs[0];		
		notationKnob.addEventListener("change", function (e) {	
			
			document.getElementById("testTB").value = this.value;
			notation = this.value;
		});

		var speedknob = knobs[1];
		speedknob.addEventListener("change", function (e) {
			document.getElementById("testTB").value = this.value;		
			speedvariable = this.value;
		});
	}
	playstr();
	
	
}


function changevolume() {
	// Volume Slider[0]
	var audiosliders = document.getElementById("slider-controls");
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

	var eqbase = document.getElementById("slider-controls");
	var eq = eqbase.getElementsByTagName('webaudio-slider');
	//document.getElementById("testTB").value = eq.length;
	for (var i = 0; i < eq.length; i++) {

		var eqlow = eq[1];
		var eqmid = eq[2];
		var eqhigh = eq[3];
		eqlow.addEventListener("change", function (e) {
			document.getElementById("testTB").value = this.value;
			eq3.low.value = this.value;
			instrument.chain(eq3, Tone.Master);
		});
		eqmid.addEventListener("change", function (e) {
			document.getElementById("testTB").value = this.value;
			eq3.mid.value = this.value;
			instrument.chain(eq3, Tone.Master);
		});
		eqhigh.addEventListener("change", function (e) {
			document.getElementById("testTB").value = this.value;
			eq3.high.value = this.value;
			instrument.chain(eq3, Tone.Master);
		});


	}

	//instrument.chain(eq3, Tone.Master);

}
function changePan() {
	// Pan Slider[1]
	var audiosliders = document.getElementById("slider-controls");
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


function midiSwitches() {
	var midiswitches = document.getElementById("midiswitches");
	var switches = midiswitches.getElementsByTagName("webaudio-switch");
	for (var i = 0; i < switches.length; i++) {
		//var midiswitch = switches[1];
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

				case 117:
					Tone.Transport.stop();
					stoptimeout();
					break;

				case 118:
					Tone.Transport.start();
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
	Tone.Transport.stop();
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
function recallheights() {
	var n = nextslice();
	//var n = slicestrg();	
	var timeMenu = document.getElementById("time");
	delayTime = Number(timeMenu.options[timeMenu.selectedIndex].value);
	timeout = setTimeout(recallheights, delayTime);
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

	Tone.Buffer.onload = function () {
		Tone.Transport.setInterval(function (time) {
			metro.start(time);
		}, notation);
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
function loadplayground() {
	document.getElementById("searchTB").value = gblock;
	getstring(gblock);
	changevolume();
	//changePan();
	changeEQ();
	pRecorder();
	//clipslider();
	//play101273();
	midiSwitches();
	//changespeed();
	
}


