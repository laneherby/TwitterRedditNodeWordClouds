const twitter = require("twitter");
const fs = require("fs");

const initialize = async (username) => {
    const twitClient = new twitter({
        consumer_key: "JQjtyssiKnTzFkMA79S90t4PU",
        consumer_secret: "sRRrjSFJr5MMEW7LWCBD8M65DwUqfQZeei6VjZH5UmGaLQb2FI",
        access_token_key: "421317769-LWaNcsTwEt0StS3sh8qUwsR3E2sx8wth8DMpn9QK",
        access_token_secret: "nJrUnJJHL1C2MfcU8XOvE4qVlEsROzd9Zlv9qBZd9XuDD",
    });

    const twitParams = {
        screen_name: username,
        exclude_replies: false,
        include_rts: false,
        trim_user: true,
        count: 200
    };

    const END_OF_TWEETS = false;
    const allTweetsText = [];

    

    // twitClient.get("statuses/user_timeline", twitParams).then((tweets) => {
    //     console.log(tweets.length);
    // });

    while (!END_OF_TWEETS || allTweetsText.length <= 400) {
        twitClient.get("statuses/user_timeline", twitParams).then((tweets, error, res) => {
            if (!error) {
                for (tweet of tweets) {
                    allTweetsText.push(tweet.text);
                }
                twitParams.max_id=tweets[tweets.length-1];
                console.log(allTweetsText);
            } else { END_OF_TWEETS = true; }
        });
    }
};

exports.initialize = initialize;