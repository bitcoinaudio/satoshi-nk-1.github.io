var colorstart = 0;
var colorend = colorstart + 2;

function playcolor() {
	var c = this.id;
	var s = c.slice(colorstart, colorend);
	try {
		//var synth = new Tone.Synth().toMaster();
		instrument.triggerAttackRelease(s, "4n");
	}
	catch (err) {
		this.height = 0;
		this.weight = 0;
		
		//synth.dispose();
	}
}
var padstart = 0;
var padend = 2;

function padclip() {
	var c = this.id;
	let s = c.slice(padstart, padend);
	var timeMenu = document.getElementById("time");
	delayTime = Number(timeMenu.options[timeMenu.selectedIndex].value);
	padtimeout = setTimeout(padclip.bind(this), delayTime);

	try {
		console.log("padclip(c) " + padstart, padend, s);
		instrument.triggerAttackRelease(s, "4n");
	}
	catch (err) {
		//this.height = 0;
		//this.weight = 0;
		//bd();
	}
	if (padend === 6) {
		clearTimeout(padtimeout);
		padstart = 0;
		padend = padstart + 2;
	}
	padstart++;
	padend++;
	return c;
}

