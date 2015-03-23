var spotify = require('./spotify');
var randomArray = require('./random-array');

module.exports = function(artistId, succes, error) {
    spotify.getArtistAlbums(artistId)
    .then(function(data) {
        if (data.body.items.length) {
            var randomAlbum = randomArray(data.body.items);
            spotify.getAlbumTracks(randomAlbum.id).then(function(data) {
                if (data.body.items.length) {
                    if (typeof succes === 'function') {
                        succes(randomArray(data.body.items).preview_url);
                    }
                } else {
                    if (typeof error === 'function') {
                        error();
                    }
                }
            });
        }
    }, function(err) {
        if (typeof error === 'function') {
            error(err);
        }
    });
};
