var Twitter = require("twitter");
var axios = require("axios");
require("dotenv").config();

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

axios
  .get(process.env.API_END_POINT)
  .then(function(response) {
    console.log(response.data.articles[0]);
    let body =
      response.data.articles[0].title + " " + response.data.articles[0].url;

    let msg = {
      status: body
    };
    postTweet(msg);
  })
  .catch(function(error) {
    console.error(error);
  });

function postTweet(msg) {
  client
    .post("statuses/update", msg)
    .then(function(tweet) {
      console.log("Msg tweeté!");
    })
    .catch(function(error) {
      throw error;
    });
}
