/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {
  $('.new-tweet').hide();

  $("#hideMe").hide();

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
    $('.tweetList').empty()
    arrayOfTweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      //console.log($tweet);
      $('.tweetList').prepend($tweet);
      
    }) 
  }

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
  $('.tweetForm').on('submit', (event) => {
    event.preventDefault();
    const errorMsg = $("#error"); 
    const error = $("#hideMe")
    const val = $('.tweetText').val();
    if (val.length === 0){
      errorMsg.text('Cannot tweet an empty tweet.');
      error.slideDown('slow');
    }
      else if (val.length > 140) {
        errorMsg.text('Too many characters.')
        error.slideDown('fast');
    } else {
      error.hide();
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

  

  $('.dropdown').on('click', () => {

    const newTweet = $('.new-tweet');

    if (newTweet.is(":hidden")){
     newTweet.slideDown('slow');
     newTweet.find("textarea").focus();
    } else {
      newTweet.slideUp('slow');
    }


  })
  
  const $myBtn = $('#myBtn');

  $myBtn.on('click', () => {

    topFunction();

  })
  //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}




})

