import express from 'express';
import * as authController from '../controller/auth.js'
import { body } from 'express-validator';

const router = express.Router();

// GET /users middleware is for test purposes
router.get('/users', authController.getAll)

// Signup Validation
// username more than 5 characters
// password more than 5 characters
// name more than 2 characters
// valid email
router.post('/signup', 
    [
        body('username').trim().isLength({min: 5, max: 12}).withMessage("Invalid Username"),
        body("password").trim().isLength({min: 5, max: 12}).withMessage("Invalid Password"),
        body("name").trim().isLength({min:2, max:10}).withMessage("Invalid name"),
        body("email").trim().isEmail().withMessage("invalid email")
    ],
    authController.signUp);

router.post('/login', authController.login);

router.get('/me', authController.checkTokenAvailable);


export default router;