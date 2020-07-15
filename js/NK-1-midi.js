var vol = new Tone.Volume(-12);
var eq3 = new Tone.EQ3({

	"lowFrequency": 120,
	"highFrequency": 2500
});
var searchstr = document.getElementById("searchTB").value;

var currentstring = document.getElementById('dataString');
var currentstringlength = currentstring.length;
var start = 0;
var end = start + 2;

var iStart = 0;
var iEnd = iStart +1;
var blockstream = "https://blockstream.info/api/";

var notation = quarternote;

var halfnote = "2n";
var wholenote = "8n";
var quarternote = "4n";
var sixteenthnote = "16n";

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

			document.getElementById('consoleTB').value = merkleroot;
		});
	});
}

var mcp = document.getElementById("makecolorpads");
var mbp = document.getElementById("makebeatpad");
function getstring(stringtype, merkleroot, hash, getblocktip, dataString) {
	searchstr = document.getElementById("searchTB").value;
	stringtype = document.getElementById("stringtype").value;
	//GET block tip
	$.get(blockstream + "blocks/tip/height", function (data) {
		getblocktip = `${data}`;
		document.getElementById('blocksTB').value = getblocktip;
		
		
		if (searchstr < 0) {

			alert("TOO LOW! Please select Height 0 to " + getblocktip);
			document.getElementById("searchTB").value = 0;
		}
		if (searchstr > parseInt(getblocktip)) {
			alert("TOO HIGH! Please select Height 0 to " + getblocktip);
			document.getElementById("searchTB").value = getblocktip;
		}
	});

	
	//GET Root and Hash of Height
	$.get(blockstream + "block-height/" + searchstr, function (data) {
		hash = `${data}`;
		$.get(blockstream + "block/" + hash, function (block) {
			merkleroot = `${block.merkle_root}`;
			var timestamp = `${block.timestamp}`;
			var ts = timestamp.toString();
			//var info = `Merkle Root: ${block.merkle_root}<br>
			//			Hash: ${hash}<br>`;
			//$(".blockinfo").html(info);

			switch (stringtype) {


				case "root":

					document.getElementById('dataString').value = merkleroot;
					document.getElementById('dataStringModal').value = merkleroot;
					document.getElementById('clipTB').value = merkleroot;
					var msplit = merkleroot.split("");
					console.log(msplit);
					dataString = msplit;
					break;

				case "hash":
					document.getElementById('dataString').value = hash;
					document.getElementById('dataStringModal').value = hash;
					document.getElementById('clipTB').value = hash;
					var hsplit = hash.split("");
					console.log(hsplit);
					dataString = hsplit;
					break;

			}
			splitstring();
			//for (i = 0, i < dataString.length; i++;) {

			//	console.log(dataString[1] + dataString[i += 1]);
			//}
		});
	});
	
	setTimeout(makecolorpads, 30);
	
}



function splitstring() {
	var s = document.getElementById("dataString").value;
	var data = s.split("");
	console.log(data[0] + data[1] + data[3] + data[4]);
	

	for (i = 0; i < s.length; i++) {
		var note = data[i] + data[i += 1];
		
		instrument.triggerAttackRelease("c4", "8n");

		console.log(note);
	}
	
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
	start = -1;
	end = start + 1;

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
var t2stb = document.getElementById('t2sbox');
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

//function saySSML(conv) {
//		const ssml = '<speak>' +
//			'Here are <say-as interpret-as="characters">SSML</say-as> samples. ' +
//			'I can pause <break time="3" />. ' +
//			'I can play a sound <audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. ' +
//			'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. ' +
//			'Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. ' +
//			'Or I can even speak in digits. Your position in line is <say-as interpret-as="digits">10</say-as>. ' +
//			'I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. ' +
//			'Finally, I can speak a paragraph with two sentences. ' +
//			'<p><s>This is sentence one.</s><s>This is sentence two.</s></p>' +
//			'</speak>';
//		conv.ask(ssml);
//	}

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

	var speaktext = document.getElementById("t2sbox").value;
	var msg = new SpeechSynthesisUtterance(speaktext);
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[4]; //[4] = "Google UK English Female"	
	msg.lang = 'en-US';
	window.speechSynthesis.speak(msg);
	msg.volulme = 1;
	console.log(msg.voice);
	//speaktext = "";
	//responsiveVoice.speak("For those who don't know me, I'm Hal Finney. ");
	//responsiveVoice.enableWindowClickHook();
	//responsiveVoice.speak(speaktext, "UK English Female", { volume: 1 });
	t2stb.blur();
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
	var bpmTime = Tone.Transport.bpm.value;
	var timeTime = (bpmTime);
	//var timeTime = speedvariable/(bpmTime / 600);

	var time = 333 / bpmTime;
	timeout = setTimeout(playseq, timeTime );

	document.getElementById("consoleTB").value = "bpmTime = " + bpmTime + " time = " + timeTime;
	try {
		playstr();
		Tone.Transport.start();
	}
	catch (err) {
		//bd();
	}
	if (n === "") {
		loopseq();
	}
}
function playstr(string) {
	selectslice();
	var s = slicestrg();
	nextslice();
	instrument.triggerAttackRelease(s, quarternote);
	console.log(s);
	return string;
}
function changeKnobs() {

	// knob control
	var knob = document.getElementById("knob-controls");
	var knobs = knob.getElementsByTagName('webaudio-knob');
	for (var i = 0; i < knobs.length; i++) {

		var knob0 = knobs[0];
		knob0.addEventListener("change", function (e) {
			document.getElementById("consoleTB").value = this.value + " " + this.id;
			//notation = this.value;
		});

		var knob1 = knobs[1];
		knob1.addEventListener("change", function (e) {
			document.getElementById("consoleTB").value = this.value + " " + this.id;
			//speedvariable = this.value;
		});
		var knob2 = knobs[2];
		knob2.addEventListener("change", function (e) {

			document.getElementById("consoleTB").value = this.value + " " + this.id;
			//notation = this.value;
		});

		var knob3 = knobs[3];
		knob3.addEventListener("change", function (e) {
			document.getElementById("consoleTB").value = this.value + " " + this.id;
			//speedvariable = this.value;
		});
	}
	//playstr();


}


function changevolume() {
	// Volume Slider[0]
	var audiosliders = document.getElementById("left-panel");
	var sliders = audiosliders.getElementsByTagName('webaudio-slider');

	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[0];
		slider.addEventListener("change", function (e) {

			document.getElementById("consoleTB").value = this.value + " " + this.id;
			vol.volume.value = this.value;
			instrument.chain(vol, Tone.Master);

			//vol.volume.rampTo(1, 1);
		});
	}

}
function changeEQ() {

	var eqbase = document.getElementById("left-panel");
	var eq = eqbase.getElementsByTagName('webaudio-slider');
	//document.getElementById("consoleTB").value = eq.length;
	for (var i = 0; i < eq.length; i++) {

		var eqlow = eq[3];
		var eqmid = eq[4];
		var eqhigh = eq[5];
		eqlow.addEventListener("change", function (e) {
			document.getElementById("consoleTB").value = this.value + " " + this.id;
			eq3.low.value = this.value;
			instrument.chain(eq3, Tone.Master);
		});
		eqmid.addEventListener("change", function (e) {
			document.getElementById("consoleTB").value = this.value + " " + this.id;
			eq3.mid.value = this.value;
			instrument.chain(eq3, Tone.Master);
		});
		eqhigh.addEventListener("change", function (e) {
			document.getElementById("consoleTB").value = this.value + " " + this.id;
			eq3.high.value = this.value;
			instrument.chain(eq3, Tone.Master);
		});


	}
	instrument.chain(eq3, Tone.Master);
}
function changePan() {
	// Pan Slider[6]
	var audiosliders = document.getElementById("left-panel");
	var sliders = audiosliders.getElementsByTagName('webaudio-slider');
	var panVol = new Tone.Panner();
	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[6];
		slider.addEventListener("change", function (e) {

			document.getElementById("consoleTB").value = this.value + " " + this.id;
			panVol.pan.value = this.value;
			instrument.chain(panVol, vol, Tone.Master);
		});
	}

}
function loopslider() {
	// Clip Slider[7]
	var clipliders = document.getElementById("left-panel");
	var sliders = clipliders.getElementsByTagName('webaudio-slider');
	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[7];
		slider.addEventListener("change", function (e) {

			document.getElementById("consoleTB").value = this.value + " " + this.id;
			start = this.value;
			end = this.value + 2;
		});
	}

}

function TempoSlider() {
	// Clip Slider[7]
	var tempoSlider = document.getElementById("left-panel");
	var sliders = tempoSlider.getElementsByTagName('webaudio-slider');
	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[8];
		slider.addEventListener("change", function (e) {

			document.getElementById("consoleTB").value = this.value + " " + this.id;
			Tone.Transport.bpm.value = this.value;
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

			console.log("midiswitches() event hook: data:[" + data + "] channel:" + channel + " cN:" + controlNumber);


			// do whatever you want with the event
			// ...
			switch (controlNumber) {
				case 60:
					//padclip();
					console.log("case:60");
					break;

				case 62:
					start = 0;
					end = start + 2;
					halfString();
					playseq();
					break;

				case 64:
					start = 0;
					end = start + 2;
					quarterString();
					playseq();
					break;

				case 65:
					start = 0;
					end = start + 2;
					eighthString();
					playseq();
					break;

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

function midicanvasSwitches() {
	var clipstart = -1;
	var clipend = 2;

	var midiswitches = document.getElementById("pads-container");
	var switches = midiswitches.getElementsByTagName("webaudio-switch");


	for (var i = 0; i < 1; i++) {
		//var midiswitch = switches[i];
		//midiswitch.addEventListener('click', function (e) {
		//console.log(i);
		//});

		webAudioControlsMidiManager.addMidiListener(function (event) {
			var data = event.data;
			var channel = data[0] & 0xf;
			var controlNumber = data[1];
			console.log("midicanvasSwitches() event hook: data:[" + data + "] channel:" + channel + " cN:" + controlNumber);
			// do whatever you want with the event
			// ...

			var padstart = 0;
			var padend = 2;

			function playcase(s) {
				var clip = switches[i].id;
				s = clip.slice(padstart, padend);


				try {
					console.log("playcase():" + padstart, padend, s);
					instrument.triggerAttackRelease(s, "4n");
				}
				catch (err) {

					//bd();
				}
				if (padend === 6) {
					clearTimeout(padtimeout);
					padstart = 0;
					padend = 2;
				}
				padstart++;
				padend++;
			}




			switch (controlNumber) {

				case 60:
					var sixty = switches[0];
					sixty.setAttribute("midicc", "1." + controlNumber);
					console.log("midicanvasSwitches() " + sixty.id + " " + controlNumber);
					var timeMenu = document.getElementById("time");
					delayTime = Number(timeMenu.options[timeMenu.selectedIndex].value);
					padtimeout = setTimeout(playcase.bind(this), delayTime);



					//try {
					//	console.log("case 60: " + clipstart + ", " + clipend + " " + s + " " );
					//	instrument.triggerAttackRelease(s, "4n");
					//}
					//catch (err) {
					//	//
					//	//this.weight = 0;
					//	bd();
					//}
					//if (s === "") {
					//	clearTimeout(padtimeout);
					//	clipstart = 0;
					//	clipend =  2;
					//}
					//clipstart++;
					//clipend++;
					break;

				case 62:

					var sixty2 = switches[1];
					sixty2.setAttribute("midicc", "1." + controlNumber);
					playcase();
					break;

				case 64:
					var sixty4 = switches[2];
					sixty4.setAttribute("midicc", "1." + controlNumber);
					console.log(sixty4.id);
					break;

				case 65:
					var sixty5 = switches[3];
					sixty5.setAttribute("midicc", "1." + controlNumber);
					console.log(sixty5.id);
					break;
				case 67:
					var sixty7 = switches[4];
					sixty7.setAttribute("midicc", "1." + controlNumber);
					console.log(sixty7.id);
					break;

				case 69:
					var sixty9 = switches[5];
					sixty9.setAttribute("midicc", "1." + controlNumber);
					console.log(sixty9.id);
					break;

				case 71:
					var seventy1 = switches[6];
					seventy1.setAttribute("midicc", "1." + controlNumber);
					console.log(seventy1.id);
					break;

				case 72:
					var seventy2 = switches[7];
					seventy2.setAttribute("midicc", "1." + controlNumber);
					console.log(seventy2.id);
					break;
				case 74:

					break;
				case 76:

					break;
				case 77:

					break;
				case 79:

					break;
				case 81:

					break;

				case 83:

					break;

				case 84:

					break;

				case 86:

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

			return controlNumber;
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
	try {
		playstr();
		//document.getElementById("makebeatpad").click();

	}
	catch (err) {
		//
	}

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

	if (p === "") {
		resetslice();
		prevheight();
	}
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
var cp = document.getElementById("makecolorpads");


	


function loadplayground() {
	var gblock = 0;
	document.getElementById("searchTB").value = gblock;
	getstring(gblock);
	changevolume();
	changePan();
	changeEQ();
	pRecorder();
	loopslider();
	TempoSlider();
	//midiSwitches();
	changeKnobs();

	midicanvasSwitches();




}