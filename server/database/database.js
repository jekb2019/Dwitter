import Mongoose from 'mongoose';
import { config } from '../config.js';

export function connectDB() {
    return Mongoose.connect(config.db.host, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

export function useVirtualId(schema) {
    schema.virtual('id').get(function() {
        return this._id.toString();
    });
    
    schema.set('toJSON', {virtuals: true});
    schema.set('toObject', {virtuals: true});
}

// TODO(Jason): Delete below

let db;
export function getUsers() {
    return db.collection('users');
}

export function getTweets() {
    return db.collection('tweets');
}