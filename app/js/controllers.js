app.controller("loaderController", function($scope) {
  var fs, getUserHome, save_paths;
  fs = require('fs');
  save_paths = {
    '1': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata.txt',
    '2': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata2.txt',
    '3': '/Library/Application Support/unity.Vigilant Addiction Studios.Adventurer Manager Beta/savedata3..txt'
  };
  getUserHome = function() {
    var homeVar;
    homeVar = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
    return process.env[homeVar];
  };
  return $scope.load = function(slot) {
    var path;
    path = getUserHome() + save_paths[slot];
    return fs.readFile(path, 'utf8', function(err, data) {
      var savegame;
      if (err) {
        return alert(err.message);
      }
      if (data === '') {
        return alert('This savegame seems empty');
      }
      data = data.replace(/\n/g, ' ');
      savegame = JSON.parse(data);
      return console.log(savegame);
    });
  };
});
