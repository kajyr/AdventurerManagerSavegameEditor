(function() {

	save_paths = {
		'1': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata.txt',
		'2': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata2.txt',
		'3': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata3..txt'
	}

	var fs = require('fs');
	var _ = require('underscore');

	var $main = $('#main');

	function getUserHome() {
		return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	}

	function printProperty(name, value, $container) {

		var $li = $('<li />');
		
		if (_.isArray(value)) {
			var $ul = $('ul');
			$ul.append('<h3>' + name + '</h3>')
			if (value.length > 0) {
					_.each(value, function(innerValue, innerName) {
					printProperty(innerName, innerValue, $ul);
				})
			}
			$li.append($ul);
		} else {
			$li.text(name+': '+value);
		}

		
		$container.append($li);
	}

	function parseAndPrint(savegame) {
		$main.html('');
		_.each(savegame, function(section, title) {
			$main.append('<section id="'+ title +'"></section>');
			var $section = $('#'+title);
			$section.append('<h2 class="fold-handler">' + title + '</h2>');
			$section.append('<ul class="foldable"/>');
			$ul = $section.find('ul');

			_.each(section, function(value, name) {
				printProperty(name, value, $ul);
			})
		})
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

	$('body').on('click', '.fold-handler', function(e) {
		var $foldable = $(e.currentTarget).siblings('.foldable');
		if ($foldable.is(':visible')) {
			$foldable.hide();
		} else {
			$foldable.show();
		}
	})

})();