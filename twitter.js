const Twit = require("twit");

const parseTweets = async (tweets) => {
    const text = [];
    for (tweet of tweets) {
        text.push(tweet.text);
    }

    return text;
};

const initialize = async (username) => {
    const twitParams = {
        screen_name: username,
        exclude_replies: false,
        include_rts: false,
        trim_user: true,
        count: 200
    };

    const twitClient = new Twit({
        consumer_key: "JQjtyssiKnTzFkMA79S90t4PU",
        consumer_secret: "sRRrjSFJr5MMEW7LWCBD8M65DwUqfQZeei6VjZH5UmGaLQb2FI",
        access_token: "421317769-LWaNcsTwEt0StS3sh8qUwsR3E2sx8wth8DMpn9QK",
        access_token_secret: "nJrUnJJHL1C2MfcU8XOvE4qVlEsROzd9Zlv9qBZd9XuDD",
    });

    const END_OF_TWEETS = false;
    const allTweetsText = [];

    const temp = await twitClient.get("statuses/user_timeline", twitParams, (err, tweets, res) => {
        return tweets;
    });

    setTimeout(() => {console.log(temp)}, 2000)
    

    // twitClient.get("statuses/user_timeline", twitParams, (error, tweets, res) => {
    //     for (tweet of tweets) {
    //         allTweetsText.push(tweets.text);
    //         console.log(tweet.text);
    //     }
    // });

    // console.log(allTweetsText);

    // while (!END_OF_TWEETS || allTweetsText.length <= 400) {
    //     const batchReturn = await getTweetBatch(twitParams);
    //     console.log(batchReturn);
    //     // if (batchReturn==false) {
    //     //     END_OF_TWEETS=true;
    //     // } else {
    //     //     allTweetsText.push(...batchReturn[0]);
    //     //     twitParams.max_id = batchReturn[1];
    //     // }
    // }
};

exports.initialize = initialize;