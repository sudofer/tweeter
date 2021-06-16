/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {

  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1623635661424
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1623722061424
    }
  ];

  const createTweetElement = tweet => {

    const template = `<article class="tweetListArticle">
    <header class="tweetListHeader">
      <img class="tweetListImage" src="${tweet.user.avatars}" alt="user_image">
  
      <p class="tweetListName">${tweet.user.name}</p>
      <p>${tweet.user.handle}</p>
      

    </header>
    <p>${tweet.content.text}</p>
    <footer class="tweetListFooter">
      <p class="tweetListTime">${timeago.format(tweet.content.created_at)}</p>
      <div class="tweetListIcons"> 
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
    </div>
    </footer>
 </article> `

    return template;

  }
  



  const renderTweets = arrayOfTweets => {

    arrayOfTweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      $('.tweetList').append($tweet);
      
    }) 
  }


  renderTweets(data);

})