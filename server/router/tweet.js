import express from 'express';
import * as tweetDB from '../data/tweet-data.js';

const router = express.Router();
const allTweets = tweetDB.tweets;

/**
 * Get all tweets.
 * Respose format: { [tweet, tweet, ...] }
 */
router.get('/', (req, res, next) => {
    console.log("Tweet: GET /");
    if(Object.keys(req.query).length === 0) {
        return res.status(200).send({
            allTweets
        })
    } else {
        next();
    }
});

/**
 * Get all tweets for a specified user in "username" query
 * Response format: { [tweet, tweet, ...] }
 */
router.get('/', (req, res, next) => {
    const username = req.query.username;
    // Check if any tweet of matching username exists
    const filteredTweet = allTweets.filter(tweet => tweet.username === username);
    if(filteredTweet.length === 0) {
        return res.sendStatus(404);
    } else {
        return res.status(200).send({
            filteredTweet
        })
    }
});

/**
 * Get a single tweet for a specified tweet ID
 * Response format: { tweet }
 */
router.get('/:id', (req, res, next) => {
    // search tweet with username
    const tweetId = req.params.id;

    const targetTweet = allTweets.filter(tweet => tweet.id === tweetId);
    if(targetTweet.length === 0) {
        return res.sendStatus(404);
    } else {
        return res.status(200).send(targetTweet[0]);
    }
});

/**
 * Create a new tweet
 * Request format: { text, name, username, url (optional) }
 * Response format: { tweet }
 */
router.post('/', (req, res, next) => {
    const newTweetFromUser = req.body;

    // created a new tweet in { tweet } format
    const newTweetCreated = { 
        ...newTweetFromUser, 
        id: new Date().valueOf().toString(), 
        createdAt: new Date().toDateString()
    }

    // add tweet to database
    allTweets.unshift(newTweetCreated);
    res.status(200).send(newTweetCreated);
});

/**
 * Update a tweet for a specified tweet ID
 * Request format: { text }
 * Response format: { tweet }
 */
router.put('/:id', (req, res, next) => {
    const tweetId = req.params.id;
    const updatedText = req.body.text;
    let filteredTweet;

    // find corressponding tweet
    const filteredTweetArr = allTweets.filter(tweet => tweet.id === tweetId);
    if (filteredTweetArr.length === 0) {
        return res.sendStatus(404);
    } else {
        filteredTweet = filteredTweetArr[0];
    }

    // update tweet text and update the tweet database
    filteredTweet.text = updatedText;
    allTweets.forEach(tweet => {
        if(tweet.id === tweetId) {
            tweet = filteredTweet;
        }
    });

    res.status(200).send(filteredTweet);
});

/**
 * Delete a tweet with a specified tweet ID
 */
router.delete('/:id', (req, res, next) => {
    const tweetId = req.params.id;

    // check if a tweet with such ID exists
    const filteredTweetArr = allTweets.filter(tweet => tweet.id === tweetId);
    if(filteredTweetArr.length === 0) {
        return res.sendStatus(404);
    }

    // delete tweet
    allTweets.forEach((tweet, index, array) => {
        if(tweet.id === tweetId) {
            array.splice(index, 1);
        }
    })
    
    res.sendStatus(204);
});

export default router;