(function() {

	save_paths = {
		'1': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata.txt',
		'2': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata2.txt',
		'3': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata3..txt'
	}

	var fs = require('fs');

	var $main = $('#main');
	$main.html('<pre />');
	$output = $main.find('pre');

	function getUserHome() {
		return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	}

	$('header button').on('click', function(e) {
		var slot = $(e.currentTarget).data('slot');
		var path = getUserHome() + save_paths[slot];

		
		fs.readFile(path, 'utf8', function (err,data) {
			if (err) {
				return $output.html(err.message);
			}
			data = data.replace(/\n/g, ' ');
			var savegame = JSON.parse(data);
			$output.html(savegame.length);
		});

	})

})();