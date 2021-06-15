


$(document).ready(function(){

  $('#tweet-text').on('input', function(){
    
    const length = this.value.length;
    
 
    const counter = $('#counter');



    counter[0].innerHTML = 140 - length;

  })

});












