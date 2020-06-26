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
    } catch (err) { console.log(err); }
};

// const getComments = async (commentData) => {
//     if (typeof(commentData.data.replies) != "object") {
//         if(typeof(commentData.data.replies) != "string") {
//             return [''];
//         } else {
//             return [commentData.data.body];
//         }
//     } else {
//         let tempComments = [];
//         for (reply of commentData.data.replies.data.children) {
//             let returnArrayComments = await getComments(reply);
//             tempComments.concat(returnArrayComments);
//             tempComments.push(reply.data.body);
//         }
//         return tempComments;
//     }
// };

const getComments = async (commentData) => {
    let parentNodes = commentData.data.replies.children
};

const handlePosts = async (postData) => {
    let postText = [];

    postText.push(postData[0].data.children[0].data.title);    

    // for (thread of postData[1].data.children) {
    //     const threadText = await getComments(thread);
    //     postText.concat(threadText);
    // }
    const threadText = await getComments(postData[1].data.children[0]);
    console.log(threadText);
};

const createAxiosRequests = async (allPostURLs) => {
    let axiosRequests = [];
    let postsTextArray = [];

    for (const url of allPostURLs) {
        const getRedditPost = axios.get(`https://www.reddit.com${url}.json`).catch(error => {return error});
        axiosRequests.push(getRedditPost);
    }

    const allResponses = await Promise.all(axiosRequests);

    // for (post of allResponses) {
    //     const textOnPost = await handlePosts(post.data);
    //     console.log(textOnPost);
    //     postsTextArray.push(textOnPost);
    // }
    const textOnPost = await handlePosts(allResponses[0].data);

    return postsTextArray;
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