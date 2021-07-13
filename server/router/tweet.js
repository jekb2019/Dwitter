import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body, param, query } from 'express-validator'
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// Validator for update & create tweet
const validateTweet = [
    body("text").trim().isLength({ min:3 }).withMessage("Tweet needs to be at least 3 characters"), 
    validate
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', [query("username").trim()], tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, [param('id').trim()], tweetController.getTweet);

// POST /tweeets
router.post('/',isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id',isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id',isAuth, tweetController.deleteTweet);

export default router;
