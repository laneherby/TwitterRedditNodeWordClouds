const axios = require("axios");
const textHandler = require("./textHandler");

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
    } catch (err) { return false }
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
    
    return postText;
};

const getAllPostText = async (allPostURLs) => {
    let axiosRequests = [];
    let postsTextArray = [];

    //creating an array of axios get requests for each post
    for (const url of allPostURLs) {
        const getRedditPost = axios.get(`https://www.reddit.com${url}.json`).catch(error => {return error});
        axiosRequests.push(getRedditPost);
    }

    //Making each get request and storing responses in array
    const allResponses = await Promise.all(axiosRequests);

    //iterating through each response and getting all the text from each post
    for (post of allResponses) {
        const textOnPost = await handlePosts(post.data);
        postsTextArray.push(...textOnPost);
    }

    return postsTextArray;
};

//starter function with params of name of subreddit and how the posts are sorted
const initialize = async (subreddit, sort, numWords) => {    
    
    //Setting reddit URLS default to all posts instead of hot,top,new.
    //Limit set to 100 may change for custom amounts later
    let redditURL = `https://www.reddit.com/r/${subreddit}/${sort}.json?t=all&limit=100`;
    
    //gets array of post URLs
    const allPostURLs = await getPostURLS(redditURL);

    //if false the subreddit doesn't exist
    if (allPostURLs==false) {
        return "Trouble finding that subreddit.";
    } else {        
        //Gets an array of strings of all comments and titles
        const allPostText = await getAllPostText(allPostURLs);
        const cleanText = textHandler.cleanText(allPostText);
        const allWordsArray = cleanText.toLowerCase().split(/(\s+)/);
        const wordCounts = textHandler.countWords(allWordsArray);
        const topWords = textHandler.createTopWordObject(wordCounts, numWords);

        return topWords;
    }
};

exports.initialize = initialize;