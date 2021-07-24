import MongDb from 'mongodb';
import { config } from '../config.js';

let db;

export function connectDB() {
    return MongDb.MongoClient.connect(config.db.host, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(client => {
        db = client.db();
    });
}

export function getUsers() {
    return db.collection('users');
}

export function getTweets() {
    return db.collection('tweets');
}