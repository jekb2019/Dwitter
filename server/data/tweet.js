import * as userRepository from './auth.js'

// Initial Mock Data
let tweets = [
    {
      id: '1',
      text: '드림코더분들 화이팅!',
      createdAt: new Date().toString(),
      userId: '1'
    },
    {
      id: '2',
      text: '안뇽!',
      createdAt: new Date().toString(),
      userId: '1'
    },
  ];
  
  // Functions for retrieving/inserting data to the database
  export async function getAll() {
    return Promise.all(
      tweets.map(async (tweet) => {
        const { username, name, url } = await userRepository.getUserById(
          tweet.userId
        );
        return { ...tweet, username, name, url }
      })
    )
  }
  
  export async function getAllByUsername(username) {
    return getAll().then(tweets => 
      tweets.filter(tweet => tweet.username === username)  
    )
  }
  
  export async function getById(id) {
    const found = tweets.find(tweet => tweet.id === id);
    if(!found) {
      return null
    }

    console.log(found.userId);

    const { username, name, url } = await userRepository.getUserById(found.userId);

    return { ...found, username, name, url };
  }
  
  // Text와 userid만 받아와서 트윗 만들기
  export async function create(text, userId) {
    const tweet = {
      id: new Date().toString(),
      text,
      createdAt: new Date(),
      userId
    }

    tweets = [tweet, ...tweets];


    return await getById(tweet.id)
  }
  
  export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
      tweet.text = text;
    }
    return getById(tweet.id);
  }
  
  export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
  }
  