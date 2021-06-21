import express from 'express';
import tweetRouter from './router/tweet.js';

const app = express();

app.use(express.json());

// redirect requests to router
app.use('/tweets', tweetRouter);

// 테스트용
app.get('/', (req, res, next) => {
    console.log('request');
    res.send('hi');
});

// final error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: "Unexpected server error"});
});

app.listen(8080);