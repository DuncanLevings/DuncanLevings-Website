exports.randomString = function (len) ***REMOVED***
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) ***REMOVED***
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    ***REMOVED***

    return buf.join('');
***REMOVED***;

function getRandomInt(min, max) ***REMOVED***
    return Math.floor(Math.random() * (max - min + 1)) + min;
***REMOVED***