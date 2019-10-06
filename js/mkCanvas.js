function mkCanvas() {
	clearCanvas();
    var m = currentstring.value;
    var w = document.getElementById("wallpaper");

	for (var i = 0; i < m.length; i++) {
        var canvas = document.createElement("canvas");
		var color = firstslice();
		ctx = canvas.getContext("2d");
		canvas.id = i;
		canvas.width = wt;
		canvas.height = ht;
		//ctx.fillText("#" + f, 5, 50);
		ctx.fillStyle = "#" + color;
		//ctx.font = "bold 15px Arial";
		ctx.fillRect(0, 0, wt, ht);
		canvas.innerHTML = color;
		nextslice();
        w.appendChild(canvas);
        $(".center").css("background-color", "#" + color);

	}
}

