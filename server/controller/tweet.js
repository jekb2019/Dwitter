import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';

// Get tweets by usernamae. If no username specified, get all tweets
export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

// Get tweet by tweet id
export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

// Create new tweet
export async function createTweet(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit('tweets', tweet);
}

// Update tweet specified by tweet id
export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;

  // Check if the user is authorized to update the tweet
  const tweet = await tweetRepository.getById(id);
  if(!tweet) {
    return res.sendStatus(404);
  }
  if(tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}

// Delete tweet specified by tweet id
export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  
  // Check if the user is authorized to delete the tweet
  const tweet = await tweetRepository.getById(id)
  if(!tweet) {
    return res.sendStatus(404);
  }
  if(tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
