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

//Parses through all the comments and gets the strings
//Ditched recursion, insted parsing from top down of each thread.
//Get body of top then get all children, then in those children get each body and all their children become next
const getComments = async (commentData) => {
    const commentsText = [];

    commentsText.push(commentData.data.body); //pushes the top string of the comment thread

    if (!['string', 'undefined'].includes(typeof(commentData.data.replies))) { //checking if the top comment of the thread has no replies
        let parentNodes = commentData.data.replies.data.children; //top array of children
        while (parentNodes.length>0) {        
            let tempNodes = [];

            for await (node of parentNodes) {
                if (typeof(node.data.body) !== "undefined") commentsText.push(node.data.body); //adding body of current comment to array
                if (!['string', 'undefined'].includes(typeof(node.data.replies))) tempNodes.push(...node.data.replies.data.children);
            }    

            parentNodes = [...tempNodes]; //reassigning parentNodes to the new set of children so we iterate downwards
        }
    }
    return commentsText;
};

const handlePosts = async (postData) => {
    let postText = [];

    postText.push(postData[0].data.children[0].data.title);    

    for (thread of postData[1].data.children) {
        const threadText = await getComments(thread);
        postText.push(...threadText);
    }    
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