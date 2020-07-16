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

router.get('/reddit/cloud/:subreddit/:sort', (req, res) => {
    const subreddit = req.params.subreddit;
    const sort = req.params.sort;
    console.log(subreddit,sort);
    res.render("reddit", {page: "Reddit Cloud"});
});

router.get('/twitter/cloud/:twitter/:numTweets', (req, res) => {
    const twitterName = req.params.twitter;
    const numTweets = req.params.numTweets;
    res.render("reddit", {page: "Reddit Cloud"});
});

router.get("/cloud", (req, res) => {
    res.render(("cloud"), {page: "Test Cloud"});
});

module.exports = router;