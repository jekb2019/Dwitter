import express from 'express';
import tweetRouter from './router/tweet.js';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// redirect requests to router
app.use('/tweets', tweetRouter);

// 테스트용
app.get('/', (req, res, next) => {
    console.log("test GET /");
    res.send('hi');
});

// final error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: "Unexpected server error"});
});

app.listen(8080);