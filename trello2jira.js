var fs = require('fs');
var csvWriter = require('csv-write-stream');
var trelloData = {};
var csvHeaders = [
 'Summary',
 'Assignee',
 'Reporter',
 'Issue Type',
 'Description',
 'Priority',
 'Project Name',
 'Project Key',
 'Attachment',
 'Comment',
 'Comment',
 'Comment'
];

if (process.argv.length > 2) {
  var jsonFile = process.argv.pop();
  fs.readFile(jsonFile, 'utf8', function (err, data) {
    if (err) {console.error(err);}
    var trelloData = JSON.parse(data);
    console.log(trelloData.cards.length + ' cards found');
    var writer = csvWriter({headers: csvHeaders});
    writer.pipe(fs.createWriteStream('out.csv'));
    trelloData.cards.forEach(function (card) {
      console.log(card.id, card.name);
      var label;
      if (card.labels.length > 0) {
        label = card.labels[0].name;
      } else {
        label = '';
      }
      // var issue = {
      //   Summary: '',
      //   Assignee: '',
      //   Reporter: '',
      //   IssueType: '',
      //   Description: '',
      //   Priority: '',
      //   ProjectName: '',
      //   ProjectKey: ''
      // };
      // issue.Summary = card.name;
      // issue.Description = card.desc;
      writer.write([card.name, '', '', label, card.desc]);
    });

  });


}
