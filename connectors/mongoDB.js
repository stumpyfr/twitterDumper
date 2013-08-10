var CONFIG = require('config').MongoDB;
var mongoose = require('mongoose');

var db;
var tweetSchema;
var tweetModel;

var init = function (cb) {
    db = mongoose.connection;
    mongoose.connect(CONFIG.host);
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
	    console.log('MongoDB connected');
	    CreateSchema();
	    CreateModel();
	    cb();
	});
};

var save = function (tweet) {
    var t = new tweetModel();
    t.id_user = tweet.user.id;
    if (tweet.source != null)
        t.source = tweet.source;
    t.screen_name = tweet.user.screen_name;
    if (tweet.user.location != null)
        t.location = tweet.user.location;
    if (tweet.user.url != null)
        t.url = tweet.user.url;
    if (tweet.user.description != null)
        t.description = tweet.user.description;
    t.followers_count = tweet.user.followers_count;
    t.friends_count = tweet.user.friends_count;
    t.user_created_at = new Date(tweet.user.created_at).getTime();

    t.date = new Date(tweet.created_at).getTime();
    t.text = tweet.text;
    t.lang = tweet.lang;
    t.retweeted_count = tweet.retweeted_count;
    t.retweeted = tweet.retweeted;
    if (tweet.place != null && tweet.place.country_code != null)
        t.country = tweet.place.country_code;
    if (tweet.geo && tweet.geo.coordinates[0] != 0)
        t.position = {long : tweet.geo.coordinates[0], lat: tweet.geo.coordinates[1]};

    t.save(function (err, t) {
            if (err)
                console.log('error');
        });
};

exports.init = init;
exports.save = save;

function CreateSchema()
{
    tweetSchema = mongoose.Schema({
	    id_user: Number,
	    screen_name: String,
	    text: String,
	    lang : String,
	    country : String,
	    date : Number,
	    retweet_count: Number,
	    retweeted: Boolean,
	    location: String,
	    url: String,
	    description: String,
	    followers_count: Number,
	    friends_count: Number,
	    user_created_at: Date,
	    source : String,
	    position : {long: Number, lat: Number},
	})
};

function CreateModel()
{
    tweetModel = mongoose.model('tweets', tweetSchema)
};



