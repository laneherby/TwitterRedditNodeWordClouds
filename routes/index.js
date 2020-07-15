const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {page: "Home"});
});

router.get('/twitter', (req, res) => {
    res.render("twitter", {page: "Twitter Cloud"});
});

router.get('/reddit', (req, res) => {
    res.render("reddit", {page: "Reddit Cloud"});
});

module.exports = router;