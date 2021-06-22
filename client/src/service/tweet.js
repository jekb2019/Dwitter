export default class TweetService {
  tweets = [
    {
      id: 1,
      text: '드림코딩에서 강의 들으면 너무 좋으다',
      createdAt: '2021-05-09T04:20:57.000Z',
      name: 'Bob',
      username: 'bob',
      url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
  ];

  async getTweets(username) {
    if(username) {
      
      const url = new URL(process.env.REACT_APP_TWEET_URL)
      url.search = new URLSearchParams({username}).toString();
      console.log(url);

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
    console.log(tweetId);
    //fetch tweet with tweetId
    const url = new URL(process.env.REACT_APP_TWEET_URL + tweetId);
    const tweetById = fetch(url)
    .then(response => response.json());

    if (!tweetById) {
      throw new Error('tweet not found!');
    }

    const fetchedTweet = await tweetById;
    fetchedTweet.text = text;

    console.log(fetchedTweet);
    console.log({text});

    // update tweet
    console.log("put");
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
