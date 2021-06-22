export default class TweetService {
  async getTweets(username) {
    if(username) {
      
      const url = new URL(process.env.REACT_APP_TWEET_URL)
      url.search = new URLSearchParams({username}).toString();

      const userTweets = fetch(url)
      .then(
        response => {
          if (response.status !== 200) {
            throw new Error(response.status);
          }
          return response.json();
        }
      )
      .then(data => data["filteredTweet"])
      .catch(console.error)

      return await userTweets;

    } else {
      const allTweets = fetch(process.env.REACT_APP_TWEET_URL)
      .then(
        response => {
          if (response.status !== 200) {
            throw new Error(response.status);
          }
          return response.json();
        }
      )
      .then(data => data["allTweets"])
      .catch(console.error);

      return await allTweets;
    }
  }

  async postTweet(text) {
    const tweet = {
      id: Date.now(),
      createdAt: new Date(),
      name: 'Ellie',
      username: 'ellie',
      text,
    };

    const postedTweet = fetch(process.env.REACT_APP_TWEET_URL, {
      method: "POST",
      body: JSON.stringify(tweet),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())

    return await postedTweet;
  }

  async deleteTweet(tweetId) {
    const url = new URL(process.env.REACT_APP_TWEET_URL + tweetId);
    fetch(url, {
      method: "DELETE"
    });
  }

  async updateTweet(tweetId, text) {
    //fetch tweet with tweetId
    const url = new URL(process.env.REACT_APP_TWEET_URL + tweetId);
    const tweetById = fetch(url)
    .then(response => response.json());

    if (!tweetById) {
      throw new Error('tweet not found!');
    }

    const fetchedTweet = await tweetById;
    fetchedTweet.text = text;

    // update tweet in the server
    const updatedTweet = fetch(url, {
      method: "PUT",
      body: JSON.stringify({text}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json());

    return await updatedTweet;
  }
}
