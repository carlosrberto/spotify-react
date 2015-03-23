var echojs = require('echojs');

var echo = echojs({
    key: process.env.ECHONEST_KEY
});

module.exports = echo;
