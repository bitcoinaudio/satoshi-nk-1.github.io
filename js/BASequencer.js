//setup a polyphonic sampler
console.log("sequencer loaded");
var str = getstring();
console.log(str);

var keys = new Tone.Players({
	"BD": "audio/Box_5_BD.[mp3|ogg]",
	"RimShot": "audio/Box_5_RimShot.[mp3|ogg]",
	"ClsdHH": "audio/Box_5_ClsdHH.[mp3|ogg]",
	"OpenHH": "audio/Box_5_OpenHH.[mp3|ogg]",
	"RimShot_2": "audio/Box_5_RimShot_2.[mp3|ogg]",
	"OpenClsd": "audio/Box_5_OpenClsd.[mp3|ogg]"
}, {
		"volume": 5,
		"fadeOut": "64n"
	}).toMaster();

var pads = new Tone.Players({}, {}).toMaster();

//the notes
var noteNames = ["BD", "RimShot", "ClsdHH", "OpenHH", "RimShot_2", "OpenClsd"];

var loop = new Tone.Sequence(function (time, col) {
	var column = document.querySelector("tone-step-sequencer").currentColumn;
	column.forEach(function (val, i) {
		if (val) {
			//slightly randomized velocities
			var vel = Math.random() * 0.5 + 0.5;
			keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);
		}
	});
	//set the columne on the correct draw frame
	Tone.Draw.schedule(function () {
		document.querySelector("tone-step-sequencer").setAttribute("highlight", col);
	}, time);
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);

//bind the interface
document.querySelector("tone-transport").bind(Tone.Transport);

Tone.Transport.on("stop", () => {
	setTimeout(() => {
		document.querySelector("tone-step-sequencer").setAttribute("highlight", "-1");
	}, 100);
});