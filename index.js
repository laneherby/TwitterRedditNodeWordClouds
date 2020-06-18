const axios = require("axios");

let subredditPostURLs = [];

let subreddit = "node"
let sort = "top"
let timePeriod = "all"
let numPosts = 50;
let limit = (numPosts>100) ? 100 : numPosts;

let redditURL = `https://www.reddit.com`;
let subredditURL = `/r/${subreddit}/${sort}.json?t=${timePeriod}&limit=${limit}`;
let postsURL = redditURL + subredditURL;

const setPostURLs = async (postsData) => {
    for (const redditPost of postsData) subredditPostURLs.push(redditPost.data.permalink);
};

const getPostURLS = async (postsURL) => {
    try{ 
        const fullPostData = await axios.get(postsURL); 
        const postURLsFinished = await setPostURLs(fullPostData.data.data.children);
    } catch (err) { console.log(err); }
};

const main = async () => {
    const temp = await getPostURLS(postsURL);
    console.log(subredditPostURLs);
};

main();