const axios = require("axios");

//returns array of links of subreddit posts with parameters of objects of each post
const setPostURLs = async (postsData) => {
    let subredditPostURLs = [];
    for (const redditPost of postsData) subredditPostURLs.push(redditPost.data.permalink);
    return subredditPostURLs;
};

//function with params of a full subreddit URL
//returns an array of post URLs with path starting after base URL
const getPostURLS = async (postsURL) => {
    try { 
        //Calling axios get function to return all the posts' data in JSON format
        const fullPostData = await axios.get(postsURL); 

        //Calls setPostURLs and sets the array returned to a variable
        const postURLsFinished = await setPostURLs(fullPostData.data.data.children);

        //returns false if subreddit doesn't exist causing all reddit function to exit
        //if subreddit does exist it returns all the post URLs
        if (postURLsFinished===undefined || postURLsFinished.length==0) return false;
        else return postURLsFinished;
    } catch (err) { console.log("here"); }
};

const getComments = async (commentData) => {
    console.log(commentData.data.replies.data.children);
    if (commentData.replies === ""){
        console.log(commentData.body);
    } else {
        for (reply of commentData.data.replies.children) {
            const tempComments = getComments(reply);
        }
    }
};

const handlePosts = async (postData) => {
    let postText = [];

    postText.push(postData[0].data.children[0].data.title);    

    for (thread of postData[1].data.children) {
        const temp = await getComments(thread);
    }
};

const createAxiosRequests = async (allPostURLs) => {
    let axiosRequests = [];

    for (const url of allPostURLs) {
        const getRedditPost = axios.get(`https://www.reddit.com${url}.json`).catch(error => {return error});
        axiosRequests.push(getRedditPost);
    }

    const allResponses = await Promise.all(axiosRequests);

    for (post of allResponses) {
        const textOnPost = await handlePosts(post.data);
    }
};

//starter function with params of name of subreddit and how the posts are sorted
const initialize = async (subreddit, sort) => {    
    
    //Setting reddit URLS default to all posts instead of hot,top,new.
    //Limit set to 100 may change for custom amounts later
    let redditURL = `https://www.reddit.com`;
    let subredditURL = `/r/${subreddit}/${sort}.json?t=all&limit=100`;
    let postsURL = redditURL + subredditURL;
    
    //gets array of post URLs
    const allPostURLs = await getPostURLS(postsURL);

    //if false the subreddit doesn't exist
    if (allPostURLs==false){
        return;
    } else {        
        const postRequests = await createAxiosRequests(allPostURLs);
    }
};

exports.initialize = initialize;