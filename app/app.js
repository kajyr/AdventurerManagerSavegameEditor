(function() {

	save_paths = {
		'1': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata.txt',
		'2': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata2.txt',
		'3': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata3..txt'
	}

	var fs = require('fs');

	var $main = $('#main');

	function getUserHome() {
		return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	}

	function parseAndPrint(savegame) {
		$main.html('');
		for (var key in savegame) {
			if(savegame.hasOwnProperty(key)){
				$main.append('<h2>' + key + '</h2>');
			}
		}
	}

	$('header button').on('click', function(e) {
		var slot = $(e.currentTarget).data('slot');
		var path = getUserHome() + save_paths[slot];

		fs.readFile(path, 'utf8', function (err,data) {
			if (err) {
				return $output.html(err.message);
			}
			if (data === '') {
				return $main.html('<p>This savegame seems empty</p>');
			}
			data = data.replace(/\n/g, ' ');
			var savegame = JSON.parse(data);
			parseAndPrint(savegame);
		});

	})

})();