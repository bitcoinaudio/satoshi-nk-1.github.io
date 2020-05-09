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
		//var grd = ctx.createRadialGradient(238, 50, 10, 238, 50, 300);
		//grd.addColorStop(0, "#" + color);
		//grd.addColorStop(1, "#" + color);
		canvas.addEventListener('mouseover', playcolor);
		//canvas.addEventListener('mouseleave', stopSynth);
		
		canvas.id = color;
		canvas.width = wt;
		canvas.height = ht;
		//ctx.fillText("#" + f, 5, 50);
		ctx.fillStyle ="#" + color;
		//ctx.font = "bold 15px Arial";
		ctx.fillRect(0, 0, wt, ht);
		//ctx.strokeStyle = "#ffffffff";
		//ctx.strokeRect(0, 0, wt, ht);
		canvas.innerHTML = color;
		w.addEventListener('click', makecolorpads);
		w.appendChild(canvas);
		//wm.appendChild(canvas);
		//$("#colorpads").css("background-color", "#" + color);
		start++;
		end++;

	}
	makemidibeatpad();
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
		var w = document.getElementById("beatpads");
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
		var w = document.getElementById("beatpads");
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

		//ctx.fillStyle = "#" + color;
		//ctx.fillRect(0, 0, wt, ht);
		beatpad.innerHTML = color;
		beatpad.value = color;
		w.addEventListener('click', makemidibeatpad);
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
