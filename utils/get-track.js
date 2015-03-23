var spotify = require('./spotify');

module.exports = function(artistId, succes, error) {
    spotify.getArtistAlbums(artistId)
    .then(function(data) {
        if (data.body.items.length) {
            var firstAlbum = data.body.items[0];
            spotify.getAlbumTracks(firstAlbum.id).then(function(data) {
                if (data.body.items.length) {
                    if (typeof succes === 'function') {
                        succes(data.body.items[0].preview_url);
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
