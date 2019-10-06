//var b = document.getElementById("record");
//var clicked = false;
//var chunks = [];


//var ac = new Tone.Context();
//var actx = new AudioContext(ac);
////var osc = ac.createOscillator();
//var osc = new Tone.MembraneSynth().toMaster();

//var dest = actx.createMediaStreamDestination();
//var mediaRecorder = new MediaRecorder(dest.stream);

//osc.connect(dest);

//b.addEventListener("click", function (e) {

//	if (!clicked) {
//		mediaRecorder.start();
//		osc.start();		
//		b.value = "Stop Playing";
//		clicked = true;
//	} else {
//		mediaRecorder.requestData();
//		mediaRecorder.stop();
//		osc.stop();
//		e.target.disabled = true;
//	}
//});

//mediaRecorder.ondataavailable = function (evt) {
//	// push each chunk (blobs) in an array
//	chunks.push(evt.data);
//};

//mediaRecorder.onstop = function (evt) {
//	// Make blob out of our blobs, and open it.
//	var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
//	var audioTag = document.createElement('audio');
//	document.querySelector("audio").src = URL.createObjectURL(blob);
//};





console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
var started = false;
document.documentElement.addEventListener('mousedown', () => {
	if (started) return;
	started = true;
	const audio = document.querySelector("audio");
	const synth = new Tone.Synth();
	const actx = Tone.context;
	const dest = actx.createMediaStreamDestination();
	const recorder = new MediaRecorder(dest.stream);

	synth.connect(dest);
	synth.toMaster();

	const chunks = [];

	const notes = 'CDEFGAB'.split('').map(n => `${n}4`);
	let note = 0;
	Tone.Transport.scheduleRepeat(time => {
		if (note === 0) recorder.start();
		if (note > notes.length) {
			synth.triggerRelease(time);
			recorder.stop();
			Tone.Transport.stop();
		} else synth.triggerAttack(notes[note], time);
		note++;
	}, '4n');

	recorder.ondataavailable = evt => chunks.push(evt.data);
	recorder.onstop = evt => {
		let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
		audio.src = URL.createObjectURL(blob);
	};

	Tone.Transport.start();
});
