import express from 'express';
import * as authController from '../controller/auth.js'
import { body, validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCredential = [
    body('username').trim().isLength({ min: 5, max: 12 }).withMessage("Invalid Username"),
    body("password").trim().isLength({ min: 5 }).withMessage("Invalid Password"),
    validate
]

const validateSignUp = [
    ...validateCredential,
    body("name").trim().isLength({min:2, max:10}).withMessage("Invalid name"),
    body("email").trim().isEmail().withMessage("invalid email").normalizeEmail(),
    body("url").isURL().withMessage("invalid URL").optional({ nullable: true, checkFalsy: true }),
    validate
]


// GET /users middleware is for test purposes
router.get('/users', authController.getAll)

// Signup Validation
router.post('/signup', validateSignUp, authController.signUp);

router.post('/login', validateCredential, authController.login);

router.get('/me', authController.checkTokenAvailable);


export default router;