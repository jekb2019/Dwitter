import MongDb from 'mongodb';
import { config } from '../config.js';

export function connectDB() {
    return MongDb.MongoClient.connect(config.db.host, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}