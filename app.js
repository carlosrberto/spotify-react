var template = require('./utils/template');
var express = require('express');
var app = express();
var echojs = require('echojs');
var SpotifyWebApi = require('spotify-web-api-node');

var spotify = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_CLIENT_ID,
  clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri : 'http://localhost:3000/spotify-callback'
});

var echo = echojs({
    key: process.env.ECHONEST_KEY
});

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(template('index.html'));
});

app.get('/find-similar/', function (req, res) {
    // res.sendFile(template('index.html'));
    if (!req.query.name) {
        res.json({
            status: false
        });
        return;
    }
    echo('artist/similar').get({
        name: req.query.name,
        bucket: 'id:spotify'
    }, function (err, echoData) {
        if (echoData.response && echoData.response.artists) {
            var artists = echoData.response.artists.map(function(item){
                if (item.foreign_ids && item.foreign_ids.length) {
                    return item.foreign_ids[0].foreign_id.replace('spotify:artist:', '');
                }
            });
            if (artists.length) {
                spotify.getArtists(artists).then(function(data) {
                    var artists = data.body.artists.map(function(item){
                        var image = item.images[2] || item.images[1] || item.images[0];
                        return  {
                            name: item.name,
                            image: image
                        };
                    });
                    res.json({
                        status: true,
                        artists: artists
                    });
                }, function(err) {
                    res.json(err);
                    console.error(err);
                });
            } else {
                res.json({
                    status: false
                });
            }
        } else {
            res.json({
                status: false
            });
        }
    });
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
