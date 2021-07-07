import express from 'express';
import * as authController from '../controller/auth.js'

const router = express.Router();

// GET /users middleware is for test purposes
router.get('/users', authController.getAll)

router.post('/signup', authController.signUp);

router.post('/login', authController.login);

router.get('/me', authController.checkTokenAvailable);


export default router;