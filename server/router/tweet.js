import express from 'express';
import * as tweetDB from '../data/tweet-data.js';

const router = express.Router();
const allTweets = tweetDB.tweets;

/**
 * Get all tweets.
 * Respose format: { [tweet, tweet, ...] }
 */
router.get('/', (req, res, next) => {
    if(Object.keys(req.query).length === 0) {
        return res.sendStatus(200).send({
            allTweets
        })
    } else {
        next();
    }
})

/**
 * Get all tweets for a specified user in "username" query
 * Response format: { [tweet, tweet, ...] }
 */
router.get('/', (req, res, next) => {
    const username = req.query.username;
    // Check if any tweet of matching username exists
    const filteredTweet = allTweets.filter(tweet => tweet.username === username);
    console.log(filteredTweet.length);
    if(filteredTweet.length === 0) {
        return res.sendStatus(404);
    } else {
        res.status(200).send({
            filteredTweet
        })
    }
})

/**
 * Get a single tweet for a specified tweet ID
 * Response format: { tweet }
 */
router.get('/:id', (req, res, next) => {
    // search tweet with username
    const tweetId = req.params.id;
    res.status(404).send(tweetId);
})

/**
 * Create a new tweet
 * Request format: { text, name, username, url (optional) }
 * Response format: { tweet }
 */
router.post('/', (req, res, next) => {
    const newTweet = req.body;
    console.log(newTweet);
    res.sendStatus(404);
})

/**
 * Update a tweet for a specified tweet ID
 * Request format: { text }
 * Response format: { tweet }
 */
router.put('/:id', (req, res, next) => {
    const tweetId = req.params.id;
    const updatedText = req.body;
    res.sendStatus(404);
})

/**
 * Delete a tweet with a specified tweet ID
 */
router.delete('/:id', (req, res, next) => {
    const tweetId = req.params.id;
    res.sendStatus(404);
})

export default router;