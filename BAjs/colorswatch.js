var fstart = 0;
var fend = fstart + 6;
var h = 0;
var ht = 50;
var wt = 50;
function makecolorpads() {
	start = 0;
	end = start + 6;
	var m = document.getElementById("blockTB").value;

	$("canvas").remove();
	for (let i = 0; i < m.length; i++) {
		var w = document.getElementById("colorpads");
		//var wm = document.getElementById("colorpadsModal");
		var canvas = document.createElement("canvas");
		var color = m.slice(start, end);
		var ctx = canvas.getContext("2d");
		canvas.addEventListener('mouseover', playcolor);
		//canvas.addEventListener('mouseleave', stopSynth);
		//$(".center").css("background-color", "#" + color);
		canvas.id = color;
		canvas.width = wt;
		canvas.height = ht;
		//ctx.fillText("#" + f, 5, 50);
		ctx.fillStyle = "#" + color;
		//ctx.font = "bold 15px Arial";
		ctx.fillRect(0, 0, wt, ht);
		canvas.innerHTML = color;
		w.appendChild(canvas);
		//wm.appendChild(canvas);
		start++;
		end++;

	}
}
function makecolorpadsModal() {
	start = 0;
	end = start + 6;
	var m = document.getElementById("blockTB").value;

	$("canvas").remove();
	for (let i = 0; i < m.length; i++) {
		var wm = document.getElementById("colorpadsModal");
		var canvas = document.createElement("canvas");
		var color = m.slice(start, end);
		var ctx = canvas.getContext("2d");
		canvas.addEventListener('mouseover', playcolor);
		//canvas.addEventListener('mouseleave', stopSynth);
		//$(".center").css("background-color", "#" + color);
		canvas.id = color;
		canvas.width = wt;
		canvas.height = ht;
		//ctx.fillText("#" + f, 5, 50);
		ctx.fillStyle = "#" + color;
		//ctx.font = "bold 15px Arial";
		ctx.fillRect(0, 0, wt, ht);
		canvas.innerHTML = color;
		wm.appendChild(canvas);
		start++;
		end++;

	}
}
function makebeatpad() {
	start = 0;
	end = start + 6;
	var m = document.getElementById("blockTB").value;

	//$("canvas").remove();
	for (let i = 0; i < 16; i++) {
		var w = document.getElementById("pads-container");
		var canvas = document.createElement("canvas");
		var color = m.slice(start, end);
		var ctx = canvas.getContext("2d");
		//canvas.addEventListener('mouseover', playcolor);
		canvas.addEventListener('click', padclip);
		canvas.id = color;
		canvas.width = wt;
		canvas.height = ht;
		ctx.fillStyle = "#" + color;
		ctx.fillRect(0, 0, wt, ht);
		canvas.innerHTML = color;
		canvas.value = color;
		w.appendChild(canvas);
		start++;
		end++;

	}
}
function makemidibeatpad() {
	start = 0;
	end = start + 6;
	var m = document.getElementById("blockTB").value;
	$("webaudio-switch").remove();

	for (let i = 0; i < 16; i++) {
		var w = document.getElementById("pads-container");
		var beatpad = document.createElement("webaudio-switch");
		var color = m.slice(start, end);
		//var ctx = canvas.getContext("2d");
		//canvas.addEventListener('mouseover', playcolor);
		beatpad.addEventListener('click', padclip);
		beatpad.id = color;
		beatpad.setAttribute("midilearn", "true");
		beatpad.setAttribute("type", "kick");
		beatpad.setAttribute("width", 80);
		beatpad.setAttribute("height", 80);
		beatpad.setAttribute("colors", "#" + color + ";" + "#" + color + ";" + "#" + "fff");
		//beatpad.setAttribute("midicc", "");

		//ctx.fillStyle = "#" + color;
		//ctx.fillRect(0, 0, wt, ht);
		beatpad.innerHTML = color;
		beatpad.value = color;
		w.appendChild(beatpad);
		start++;
		end++;

	}

}

function clearCanvas() {
	start = 0;
	end = start + 6;
	stoptimeout();
	$("canvas").remove();
} 

function saveWallpaper() {
	
	var element = document.getElementById("colors-container");
	html2canvas(element, {backgroundColor: "null"}).then(canvas => {
		document.body.appendChild(canvas);				
	});

}
