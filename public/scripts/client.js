/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
    .done((res)=> {
    
          console.log(`success`)
          renderTweets(res)

    })
    .fail((err) => console.log(`fail to get`, err))
  }
  
  loadTweets();

  const createTweetElement = tweet => {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const template = `<article class="tweetListArticle">
    <header class="tweetListHeader">
      <img class="tweetListImage" src="${escape(tweet.user.avatars)}" alt="user_image">
  
      <p class="tweetListName">${escape(tweet.user.name)}</p>
      <p>${escape(tweet.user.handle)}</p>
      

    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer class="tweetListFooter">
      <p class="tweetListTime">${escape(timeago.format(tweet.content.created_at))}</p>
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
      //console.log($tweet);
      $('.tweetList').prepend($tweet);
      
    }) 
  }

  $('.tweetForm').on('submit', (event) => {
    event.preventDefault();
    const val = $('.tweetText').val();
    if (val.length === 0){
      window.alert('error! no input')
    }
      else if (val.length > 140) {
        window.alert('Your tweet is too long my friend')
     
    } else {


      
      
      console.log(`click`, event.target);
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets", 
        data: $(event.target).serialize(),
      })
      .done(()=>{
        $('textarea').val("")
        console.log(`done.`);
        loadTweets();
      }) 
      .fail((err)=> console.log(`Fail to post`, err))
      
    }
    

  })

  

 






})