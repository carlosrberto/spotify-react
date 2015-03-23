var template = require('./utils/template');
var express = require('express');
var getArtists = require('./utils/get-artists');
var app = express();


app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(template('index.html'));
});

app.get('/find-similar/', function (req, res) {
    getArtists(req, res);
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});
