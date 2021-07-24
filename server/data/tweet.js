import { getTweets } from '../database/database.js';
import * as userRepository from './auth.js'
import MongoDb from 'mongodb';
const ObjectID =  MongoDb.ObjectID;
import * as UserRepository from './auth.js';
import { getTweet } from '../controller/tweet.js';


// Initial Mock Data
// let tweets = [
//     {
//       id: '1',
//       text: '드림코더분들 화이팅!',
//       createdAt: new Date().toString(),
//       userId: '1'
//     },
//     {
//       id: '2',
//       text: '안뇽!',
//       createdAt: new Date().toString(),
//       userId: '1'
//     },
//   ];
  
// Functions for retrieving/inserting data to the database
export async function getAll() {
  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.getUserById(
  //       tweet.userId
  //     );
  //     return { ...tweet, username, name, url }
  //   })
  // )
  return getTweets()
    .find()
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweets);

}

export async function getAllByUsername(username) {
  // return getAll().then(tweets => 
  //   tweets.filter(tweet => tweet.username === username)  
  // )
  return getTweets()
    .find({username})
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  // const found = tweets.find(tweet => tweet.id === id);
  // if(!found) {
  //   return null
  // }

  // console.log(found.userId);

  // const { username, name, url } = await userRepository.getUserById(found.userId);

  // return { ...found, username, name, url };
  return getTweets()
    .find({_id: new ObjectID(id)})
    .next()
    .then(mapOptionalTweet);
}

// Text와 userid만 받아와서 트윗 만들기
export async function create(text, userId) {
  // const tweet = {
  //   id: Date.now().toString(),
  //   text,
  //   createdAt: new Date(),
  //   userId
  // }
  // tweets = [tweet, ...tweets];
  // return await getById(tweet.id)
  return UserRepository.findById(userId).then(user => 
    getTweets().insertOne({
      text,
      createdAt: new Date(),
      userId,
      name: user.name,
      username: user.username,
      url: user.url
    })
  )
  .then(result => result.ops[0])
  .then(mapOptionalTweet);
}

export async function update(id, text) {
  // const tweet = tweets.find((tweet) => tweet.id === id);
  // if (tweet) {
  //   tweet.text = text;
  // }
  // return getById(tweet.id);
  return getTweets().findOneAndUpdate(
    {_id: new ObjectID(id)},
    {$set: {text}},
    {returnOriginal: false}
  ).then(result => result.value)
  .then(mapOptionalTweet);
}

export async function remove(id) {
  // tweets = tweets.filter((tweet) => tweet.id !== id);
  return getTweets().deleteOne({_id: new ObjectID(id)});
}

function mapTweets(tweets) {
  return tweets.map(t => ({...t, id: t._id.toString()}));
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}