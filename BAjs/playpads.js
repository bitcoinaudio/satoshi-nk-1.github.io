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
var padstart = -1;
var padend = padstart + 1;

function padclip(c) {
	c = this.id;
	let s = c.slice(padstart, padend);
	var timeMenu = document.getElementById("time");
	delayTime = Number(timeMenu.options[timeMenu.selectedIndex].value);
	var padtimeout = setTimeout(padclip.bind(this), delayTime);
	try {
		console.log(padstart, padend, s);
		instrument.triggerAttackRelease(s, "4n");
	}
	catch (err) {
		//this.height = 0;
		//this.weight = 0;
		//bd();
	}
	if (padend === 7) {
		clearTimeout(padtimeout);
		padstart = 0;
		padend = padstart + 2;
	}
	padstart++;
	padend++;
	return c;
}

