app = angular.module("myNoteApp", [])


app.controller("loaderController", ($scope) ->
	fs = require('fs')

	save_paths = {
		'1': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata.txt',
		'2': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata2.txt',
		'3': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata3..txt'
	}


	getUserHome = () ->
		homeVar = if process.platform == 'win32' then 'USERPROFILE' else 'HOME'
		process.env[ homeVar ];

	$scope.load = (slot) ->
		

		path = getUserHome() + save_paths[slot];

		fs.readFile(path, 'utf8', (err,data) ->
			if err
				return $output.html(err.message)
			if data == ''
				return $main.html('<p>This savegame seems empty</p>')

			data = data.replace(/\n/g, ' ')
			savegame = JSON.parse(data)
		
		)
)