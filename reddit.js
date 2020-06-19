const axios = require("axios");

const setPostURLs = async (postsData) => {
    let subredditPostURLs = [];
    for (const redditPost of postsData) subredditPostURLs.push(redditPost.data.permalink);
    return subredditPostURLs;
};

const getPostURLS = async (postsURL) => {
    try { 
        const fullPostData = await axios.get(postsURL); 
        const postURLsFinished = await setPostURLs(fullPostData.data.data.children);
        return postURLsFinished;
    } catch (err) { return "error"; }
};

const createAxiosRequests = async (allPostURLs) => {
    let axiosRequests = [];

    for (const url of allPostURLs) {
        const getRedditPost = axios.get(`https://www.reddit.com${url}.json`).catch(error => {return error});
        axiosRequests.push(getRedditPost);
    }

    return axiosRequests;
};

const initialize = async (subreddit, sort) => {    
    let redditURL = `https://www.reddit.com`;
    let subredditURL = `/r/${subreddit}/${sort}.json?t=all&limit=100`;
    let postsURL = redditURL + subredditURL;
    
    const allPostURLs = await getPostURLS(postsURL);
    const postRequests = await createAxiosRequests(allPostURLs);
};

exports.initialize = initialize;