var CONFIG = require('config').CSV;
var fs = require('fs');

var init = function (cb) {
    cb();
};

var save = function (tweet) {
    var sep = ';';
    fs.appendFile(CONFIG.file, tweet.user.id
		  + sep + tweet.user.screen_name
		  + sep + tweet.user.location
		  + sep + tweet.user.followers_count
		  + sep + tweet.user.friends_count
		  + sep + tweet.user.created_at
		  + sep + tweet.user.lang
		  + sep + tweet.source
		  + sep + tweet.lang
		  + '\n', function (err) {

    });
};

exports.init = init;
exports.save = save;