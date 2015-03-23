var echo = require('./echo');
var spotify = require('./spotify');

module.exports = function(req, res) {
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

                        var json = {
                            name: item.name,
                            image: image,
                            id: item.id
                        };

                        return  json;
                    });
                    res.json({
                        status: true,
                        artists: artists
                    });
                }, function(err) {
                    res.json(err);
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
};
