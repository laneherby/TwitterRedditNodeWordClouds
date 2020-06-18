const axios = require("axios");

let subredditPostURLs = [];

const setPostURLs = async (postsData) => {
    for (const redditPost of postsData) subredditPostURLs.push(redditPost.data.permalink);
};

const getPostURLS = async (postsURL) => {
    try { 
        const fullPostData = await axios.get(postsURL); 
        const postURLsFinished = await setPostURLs(fullPostData.data.data.children);
    } catch (err) { console.log(err); }
};

const initialize = async (subreddit, sort) => {    
    let redditURL = `https://www.reddit.com`;
    let subredditURL = `/r/${subreddit}/${sort}.json?t=all&limit=100`;
    let postsURL = redditURL + subredditURL;
    
    const temp = await getPostURLS(postsURL);
    console.log(subredditPostURLs);
};

exports.initialize = initialize;