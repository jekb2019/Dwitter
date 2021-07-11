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
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
}

// Update tweet specified by tweet id
export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

// Delete tweet specified by tweet id
export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
