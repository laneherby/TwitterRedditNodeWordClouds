const Twit = require("twit");
const textHandler = require("./textHandler")

const initialize = async (username, includeReplies, numWords) => {
    const twitClient = new Twit({
        consumer_key: "JQjtyssiKnTzFkMA79S90t4PU",
        consumer_secret: "sRRrjSFJr5MMEW7LWCBD8M65DwUqfQZeei6VjZH5UmGaLQb2FI",
        access_token: "421317769-LWaNcsTwEt0StS3sh8qUwsR3E2sx8wth8DMpn9QK",
        access_token_secret: "nJrUnJJHL1C2MfcU8XOvE4qVlEsROzd9Zlv9qBZd9XuDD",
    });

    const twitParams = {
        screen_name: username,
        exclude_replies: !includeReplies,
        include_rts: false,
        trim_user: true,
        count: 200
    };

    let endOfTweets = false;
    const allTweetsText = []; 
    let twitError = "";

    while (!endOfTweets && twitError.length==0 && allTweetsText.length<5000) {
        const tweets = await twitClient.get("statuses/user_timeline", twitParams)
            .catch((error) => {
                switch (error.code) {
                    case 34:
                        twitError = "User doesn't exist";
                        break;
                    case 50:
                        twitError = "User doesn't exist";
                        break;
                    case 63:
                        twitError = "User is suspended";
                        break;
                    default:
                        twitError = "There was an error fetching tweets";
                        break;
                }
        });

        if (twitError.length == 0) {
            for (tweet of tweets.data) {
                allTweetsText.push(tweet.text);
            }   

            if (tweets.data.length==0 || twitParams.max_id === tweets.data[tweets.data.length-1].id) endOfTweets = true;
            else twitParams.max_id = tweets.data[tweets.data.length-1].id;
        }
    }

    if (twitError.length==0) {
        const cleanText = textHandler.cleanText(allTweetsText);
        const allWordsArray = cleanText.toLowerCase().split(/(\s+)/);
        const wordCounts = textHandler.countWords(allWordsArray);
        const topWords = textHandler.createTopWordObject(wordCounts, numWords);
        console.log(topWords);
    } else {
        return twitError;
    }
};

exports.initialize = initialize;