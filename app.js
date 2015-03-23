var template = require('./utils/template');
var express = require('express');
var getArtists = require('./utils/get-artists');
var getTrack = require('./utils/get-track');
var app = express();


app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(template('index.html'));
});

app.get('/find-similar/', function (req, res) {
    getArtists(req, res);
});

var spotify = require('./utils/spotify');

app.get('/get-artist-track/', function (req, res) {
    if (req.query.id) {
        getTrack(req.query.id, function(url){
            res.json({
                status: true,
                url: url
            });
        }, function(){
            res.json({
                status: false
            });
        });
    } else {
        res.json({
            status: false
        });
    }
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});
