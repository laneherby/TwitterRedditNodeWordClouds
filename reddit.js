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

const createAxiosRequests = async (allPostURLs) => {
    let axiosRequests = [];
    let titleStrings = [];
    let commentStrings = [];

    for (const url of allPostURLs) {
        const getRedditPost = axios.get(`https://www.reddit.com${url}.json`).catch(error => {return error});
        axiosRequests.push(getRedditPost);
    }

    axios.all(axiosRequests).then(axios.spread((...responses) => {
       for (res of responses) {
           
           titleStrings.push(res.data[0].data.children[0].data.title);
           commentStrings.push(res.data[1].data.children[0].data.body);


       }
        console.log(responses[0].data[1].data.children[0].data.body);
    }));
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