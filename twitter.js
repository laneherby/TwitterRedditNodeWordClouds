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
        //max_id: 1280210947014119400
    };

    twitClient.get("statuses/user_timeline", twitParams, (error, tweets, res) => {
        if (!error) {
            for (tweet of tweets){
                console.log(`${tweet.id}: ${tweet.text}`);
            }
        }
    });
};

exports.initialize = initialize;