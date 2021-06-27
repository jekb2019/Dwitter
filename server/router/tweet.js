import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body, param, query, validationResult } from 'express-validator'
import {validate} from '../middleware/validator.js';

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', [query("username").trim()], tweetController.getTweets);

// GET /tweets/:id
router.get('/:id',[param('id').trim()], tweetController.getTweet);

// POST /tweeets
router.post('/', 
[
    body("text").trim().isLength({ min:3 }).withMessage("Tweet needs to be at least 3 characters"), 
    body("username").trim().isLength({min: 2, max: 10}).withMessage("Username empty"),
    body("name").trim().notEmpty().withMessage("Name empty"),
    validate
], 
tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', 
    [
        body("text").notEmpty().withMessage("Tweet empty"),
        validate 
    ], 
tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
