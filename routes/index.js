const express = require('express');
const router = express.Router();
const reddit = require("../services/reddit");
const twitter = require("../services/twitter");

router.get('/', (req, res) => {
    res.render("index", {page: "Home"});
});

router.get('/twitter', (req, res) => {
    res.render("twitter", {page: "Twitter Cloud"});
});

router.get('/reddit', (req, res) => {
    res.render("reddit", {page: "Reddit Cloud"});
});

router.get('/reddit/cloud/:subreddit/:sort/:numWords', async (req, res) => {
    const subreddit = req.params.subreddit;
    const sort = req.params.sort;
    const numWords = req.params.numWords
    const wordList = await reddit.initialize(subreddit, sort, numWords)
    res.render("cloud", {page: "Reddit Cloud", type: "Reddit", identifier: subreddit, tempList:wordList});
});

router.get('/twitter/cloud/:twitter/:numTweets/:numWords', (req, res) => {
    const twitterName = req.params.twitter;
    const numTweets = req.params.numTweets;
    const numWords = requ.params.numWords
    res.render("cloud", {page: "Twitter Cloud", type: "Twitter", identifier: twitterName});
});

router.get("/cloud", (req, res) => {
    twitter.initialize("jericho", 1000, 25);
    res.render(("cloud"), {page: "Test Cloud", type: "Twitter", identifier: "Jericho"});
});

module.exports = router;