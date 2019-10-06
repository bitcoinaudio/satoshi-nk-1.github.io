var colorstart = 0;
var colorend = colorstart + 2;
var count = 0;
function playcolor() {
	var c = this.id;
	var s = c.slice(colorstart, colorend);
	
	try {
		count++;
		//var synth = new Tone.Synth().toMaster();
		instrument.triggerAttackRelease(s, "4n");
	}
	catch (err) {
		this.height = 0;
		this.weight = 0;
		//synth.dispose();
	}
	//console.log(count);
}function playpad() {
	var c = this.id;
	var s = c.slice(colorstart, colorend);
	
	try {
		count++;
		var synth = new Tone.Synth().toMaster();
		synth.triggerAttackRelease(s, "4n");
	}
	catch (err) {
		//this.height = 0;
		//this.weight = 0;
		synth.dispose();
	}
	console.log(count);
}
