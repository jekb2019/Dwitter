import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body, param, query, validationResult } from 'express-validator'
import {validate} from '../middleware/validator.js';

const router = express.Router();
const validateTweet = [
    body("text").trim().isLength({ min:3 }).withMessage("Tweet needs to be at least 3 characters"), 
    validate
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', [query("username").trim()], tweetController.getTweets);

// GET /tweets/:id
router.get('/:id',[param('id').trim()], tweetController.getTweet);

// POST /tweeets
router.post('/',validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
