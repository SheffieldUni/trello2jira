var fs = require('fs');
var trelloData = {};

if (process.argv.length > 2) {
  var jsonFile = process.argv.pop();
  fs.readFile(jsonFile, 'utf8', function (err, data) {
    if (err) {console.error(err);}
    var trelloData = JSON.parse(data);
    console.log(trelloData.cards.length + ' cards found');
  });


}
