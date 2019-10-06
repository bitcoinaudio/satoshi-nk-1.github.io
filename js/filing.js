require(['require', 'fs'],
	function saveThis(require) {

		var fs = require('fs');
		var songObject = {
			"height": 100000,
			"clip": "",
			"delay": "90",
			"instrument": "",
			"effect": ""
		};

		fs.writeFile("./songs/newsong.json", JSON.stringify(songObject, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			};
			console.log("File has been created");
		});
	});

//function saveThis(content, filename, contentType) {
//	var a = document.getElementById("testTB");
//	var file = new Blob([content], { type: contentType });
//	a.href = URL.createObjectURL(file);
//	a.download = filename;
//	a.click();
//}
//download(jsonData, 'json/txt', 'text/plain');