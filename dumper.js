var CONFIG = require('config').Twitter;
var async = require('async');
var Twit = require('twit');
var T = new Twit({
	  consumer_key:         CONFIG.consumer_key
	, consumer_secret:      CONFIG.consumer_secret
	, access_token:         CONFIG.access_token
	, access_token_secret:  CONFIG.access_token_secret
    });

var connectors = [
    require('./connectors/mongoDB'),
    require('./connectors/csv'),
];

run();

function run() {
	if (CONFIG.consumer_key === 'CONSUMERKEY')
	    throw 'you need to change the twitter keys in ./config/default.json or ./config/hostname.json';

    async.concat(connectors, function (c, cb) {
	    cb(null, c.init);
	}, function (err, results) {
	    async.parallel(results, function (err, results) {
		    var stream = T.stream('statuses/sample');
		    stream.on('tweet', listen);		    
		});
	});
}

function listen(tweet) {
    connectors.forEach(function (c) {
	c.save(tweet);
    });
}