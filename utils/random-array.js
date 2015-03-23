module.exports = function(arr) {
    if (arr.length) {
        return arr[Math.floor(Math.random()*arr.length)];
    } else {
        return -1;
    }
}
