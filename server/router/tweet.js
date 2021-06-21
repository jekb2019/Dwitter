import express from 'express';

const router = express.Router();

/**
 * Get all tweets.
 * Respose format: { [tweet, tweet, ...] }
 */
router.get('/', (req, res, next) => {
    if(!Object.keys(req.query).length !== 0) {
        next();
    } else {
        res.status(404).send("get all tweet")
    }
})

/**
 * Get all tweets for a specified user in "username" query
 * Response format: { [tweet, tweet, ...] }
 */
router.get('/', (req, res, next) => {
    const query = req.query;
    res.status(404).send(query);
})

/**
 * Get a single tweet for a specified tweet ID
 * Response format: { tweet }
 */
router.get('/:id', (req, res, next) => {
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