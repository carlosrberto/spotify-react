var SpotifyWebApi = require('spotify-web-api-node');
var spotify = new SpotifyWebApi({
    clientId : process.env.SPOTIFY_CLIENT_ID,
    clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri : 'http://localhost:3000/spotify-callback'
});

module.exports = spotify;
