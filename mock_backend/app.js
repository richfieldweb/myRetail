var express = require('express');
var app = express();

// start server
app.listen(3000, function () {
  console.log('Mock backend listening on port 3000...');
});

// route to pass back item-data.json file
app.get('/api/item-data', function (req, res) {
  var itemData = require(__dirname + '/item-data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(itemData));
});
