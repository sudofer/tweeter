/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {
  // hide elements that need to be hidden 
  $('.new-tweet').hide();
  $("#hideMe").hide();
  

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
    .done((res)=> {
    
          
          renderTweets(res)

    })
    .fail((err) => console.log(`fail to get`, err))
  }
              // async call for tweets
  loadTweets();
              // generate html articles from tweets
  const createTweetElement = tweet => {
              // sanitize user input 
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
            //clear current generated articles to prevent duplicates
    $('.tweetList').empty()
             // make use of our tweets and html template by rendering an article for each tweet
    arrayOfTweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      
      $('.tweetList').prepend($tweet);
      
    }) 
  }
            //watch user input for errors
  $('#tweet-text').on('input', function (event) {
    const val = $(this).val();
    const error = $("#hideMe");
  const errorMsg = $("#error"); 

   if (val.length > 140) {
      errorMsg.text('Too many characters.')
      error.slideDown('slow')
  } else {
    error.hide();
  

  }}) 
          // TWEET!!!!
  $('.tweetForm').on('submit', (event) => {
    event.preventDefault();
    const errorMsg = $("#error"); 
    const error = $("#hideMe")
    const val = $('.tweetText').val();
              //prevent empty input
    if (val.length === 0){
      errorMsg.text('Cannot tweet an empty tweet.');
      error.slideDown('slow');
    }         //prevent lengthy input
      else if (val.length > 140) {
        errorMsg.text('Too many characters.')
        error.slideDown('slow');
    } else {
      error.hide();
      
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets", 
        data: $(event.target).serialize(),
      })
      .done(()=>{
        //reset tweetbox variables
        $('textarea').val("")
        const counter = $('#counter');
        counter[0].innerHTML = 140
        //display newest tweet at the top of the page
        loadTweets();
      }) 
      .fail((err)=> console.log(`Fail to post`, err))
      
    }
    
    

  })

  

  $('.dropdown').on('click', () => {

    const newTweet = $('.new-tweet');
    // hide error if it's not already hidden
    if (!$('#errorPop').is(':hidden')){
      $('#errorPop').hide();
    }


    if (newTweet.is(":hidden")){
     newTweet.slideDown('slow');
     newTweet.find("textarea").focus();
    } else {
      newTweet.slideUp('slow');
    }


  })
  


})

