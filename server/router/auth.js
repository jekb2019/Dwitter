import express from 'express';

const router = express.Router();

router.post('/signup', (req, res, next) => {
    res.status(201).send("signup")
});

router.post('/login', (req, res, next) => {
    res.status(200).send("login")
});

router.get('/me', (req, res, next) => {
    res.status(200).send("token avail")
});


export default router;