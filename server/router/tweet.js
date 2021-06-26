import express from 'express';
import * as tweetController from '../controller/tweet.js';
const router = express.Router();
import { body, param, query } from 'express-validator'

// GET /tweets
// GET /tweets?username=:username
// Validation:
// Sanitization:
router.get('/', [query("username").trim()],tweetController.getTweets);

// GET /tweets/:id
// Validation: id valid
// Sanitization: id sanitization
router.get('/:id',[param('id').trim().notEmpty().withMessage("ID is empty")] , tweetController.getTweet);

// POST /tweeets
// Validation: body valid
// Sanitization: body sanitization
router.post('/', 
[
    body("text").notEmpty().withMessage("Tweet empty"), 
    body("username").trim().isLength({min: 2, max: 10}).withMessage("Username empty"),
    body("name").trim().notEmpty().withMessage("Name empty")
], 
tweetController.createTweet);

// PUT /tweets/:id
// Validation:
// Sanitization:
router.put('/:id', [body("text").notEmpty().withMessage("Tweet empty"), ],tweetController.updateTweet);

// DELETE /tweets/:id
// Validation
// Sanitization
router.delete('/:id', tweetController.deleteTweet);

export default router;
