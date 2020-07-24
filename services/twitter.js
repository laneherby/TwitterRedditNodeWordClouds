const Twit = require("twit");
const textHandler = require("./textHandler")
require("dotenv").config();

const initialize = async (username, numTweets, numWords) => {
    const twitClient = new Twit({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    const twitParams = {
        screen_name: username,
        exclude_replies: true,
        include_rts: false,
        trim_user: true,
        count: 200
    };

    let endOfTweets = false;
    const allTweetsText = []; 
    let twitError = "";

    while (!endOfTweets && twitError.length==0 && allTweetsText.length<numTweets) {
        const tweets = await twitClient.get("statuses/user_timeline", twitParams)
            .catch((error) => {
                twitError = "Couldn't find tweets for that user.";
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
        return topWords
    } else {
        return twitError;
    }
};

exports.initialize = initialize;