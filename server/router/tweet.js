import express from 'express';
import * as tweetController from '../controller/tweet.js';
const router = express.Router();
import { body, param, query, validationResult } from 'express-validator'

// Validation Handler
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: errors.array()[0].msg })
}

// GET /tweets
// GET /tweets?username=:username
// Validation:
// Sanitization:
router.get('/', [query("username").trim()], tweetController.getTweets);

// GET /tweets/:id
// Validation: id valid
// Sanitization: id sanitization
router.get('/:id',[param('id').trim()], tweetController.getTweet);

// POST /tweeets
// Validation: body valid
// Sanitization: body sanitization
router.post('/', 
[
    body("text").trim().isLength({ min:3 }).withMessage("Tweet needs to be at least 3 characters"), 
    body("username").trim().isLength({min: 2, max: 10}).withMessage("Username empty"),
    body("name").trim().notEmpty().withMessage("Name empty"),
    validate
], 
tweetController.createTweet);

// PUT /tweets/:id
// Validation:
// Sanitization:
router.put('/:id', 
    [
        body("text").notEmpty().withMessage("Tweet empty"),
        validate 
    ], 
tweetController.updateTweet);

// DELETE /tweets/:id
// Validation
// Sanitization
router.delete('/:id', tweetController.deleteTweet);

export default router;
