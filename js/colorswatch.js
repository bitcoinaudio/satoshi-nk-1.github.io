var fstart = 0;
var fend = fstart + 6;
var h = 0;
var ht = 50;
var wt = 50;
function makecolorpads() {
	start = 0;
	end = start + 6;
	var m = document.getElementById("dataString").value;

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


	//Make Circles
}
function makecolorarcs() {
	start = 0;
	end = start + 6;
	var m = document.getElementById("dataString").value;

	$("canvas").remove();
	for (let i = 0; i < m.length; i++) {
		var w = document.getElementById("colorpads");
		//var wm = document.getElementById("colorpadsModal");
		var canvas = document.createElement("canvas");
		var color = m.slice(start, end);
		var ctx = canvas.getContext("2d");
		
		canvas.addEventListener('mouseover', playcolor);
		
		canvas.id = color;
		canvas.width = wt;
		canvas.height = ht;
		//ctx.fillText("#" + f, 5, 50);
		ctx.fillStyle ="#" + color;
		//ctx.font = "bold 15px Arial";
		ctx.arc(20, 25, Math.PI * 6, 0, 360)
		ctx.fill();
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


function makevisuals() {
	start = 0;
	end = start + 6;
	
	$("canvas").remove();
	var w = document.getElementById("colorpads");
	var canvas = document.createElement("canvas");
	
	var ctx = canvas.getContext("2d");
	let freqs;
	
	navigator.mediaDevices.enumerateDevices().then(devices => {
		devices.forEach((d, i) => console.log(d.label, i));
		navigator.mediaDevices
			.getUserMedia({
				audio: {
					deviceId: devices[4].deviceId
				}
			})
			.then(stream => {
				const context = new (window.AudioContext || window.webkitAudioContext)();
				const analyser = context.createAnalyser();
				const source = context.createMediaStreamSource(stream);
				source.connect(analyser);
				analyser.connect(context.destination);

				freqs = new Uint8Array(analyser.frequencyBinCount);
				console.log(freqs);
				function draw() {
					let radius =50;
					let bars = 64;

					// Draw Background
					ctx.fillStyle = "black";
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					// Draw circle
					ctx.beginPath();
					ctx.arc(
						canvas.width / 2,
						canvas.height / 2,
						radius,
						0,
						2 * Math.PI
					);
					ctx.stroke();
					analyser.getByteFrequencyData(freqs);

					// Draw label
					ctx.font = "500 14px Orbitron";
					const avg =
						[...Array(255).keys()].reduce((acc, curr) => acc + freqs[curr], 0) / 255;
					ctx.fillStyle = "rgb(" + 200 + ", " + (200 - avg) + ", " + avg + ")";
					ctx.textAlign = "center";
					ctx.textBaseline = "top";
					ctx.fillText("Bitcoin", canvas.width / 2, canvas.height / 2 - 24);
					ctx.fillText("Audio", canvas.width / 2, canvas.height / 2 + 6);
					let m = document.getElementById("dataString").value;
					let c = m.slice(start, end);
					// Draw bars
					for (var i = 0; i < bars; i++) {

						let radians = (Math.PI * 2) / bars;
						let bar_height = freqs[i] * 0.5;
						let x = canvas.width / 2 + Math.cos(radians * i) * radius;
						let y = canvas.height / 2 + Math.sin(radians * i) * radius;
						let x_end =
							canvas.width / 2 + Math.cos(radians * i) * (radius + bar_height);
						let y_end =
							canvas.height / 2 + Math.sin(radians * i) * (radius + bar_height);
						let color =
							"rgb(" + 200 + ", " + (200 - freqs[i]) + ", " + freqs[i] + ")";
						console.log("i= " + i);
							//ctx.strokeStyle = "#" + c;
							ctx.strokeStyle = color;
							ctx.lineWidth = 3;
							ctx.beginPath();
							ctx.moveTo(x, y);
							ctx.lineTo(x_end, y_end);
							ctx.stroke();
							
						
						

					}
					start += 1;
					w.appendChild(canvas);
					requestAnimationFrame(draw);
					
				}
				w.appendChild(canvas);
				requestAnimationFrame(draw);
					
			});
	});
}
function makecolorpadsModal() {
	start = 0;
	end = start + 6;
	var m = document.getElementById("dataString").value;

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
	var m = document.getElementById("dataString").value;

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
	var m = document.getElementById("dataString").value;
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
		start +=4;
		end+=4;

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
