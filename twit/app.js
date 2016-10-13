$(document).ready(function() {
    //render quotes function

    function renderTweets(stream) {
        var index = stream.length - 1;
      //  console.log(index);


        while (index > 0) {
            var tweet = stream[index];
            $('.tweets-container').append(
                `<div class ="tweet-container">
                  <div class = "left-tweet-column">
                    <img class ="tweet-user" src= "pictures/${tweet.user}.jpg">
                  </div>
                  <div class = "right-tweet-column">
                    <div class ="username-and-post-date">
                      <strong class="id"></strong> <small class ="time"></small>
                    </div>
                    <div class = "tweet-content">
                  </div>
                  </div>
                </div> `
            )//.animate({opacity: '.20'}, 100)
            $('.tweet-container').find('.id').last().append(`<a href = "#" class="id2" data-name="${tweet.user}">@${tweet.user} </a>`);
            $('.tweet-container').find('.tweet-content').last().append(tweet.message);
            $('.tweet-container').find('.time').last().prepend(moment(tweet.created_at).fromNow());
            index--;
        }
    }

    renderTweets(streams.home);


  $('.id2').on("click", function(){

    var user = $(this).data('name');
    console.log(user);
    console.log(streams.users[user].length);

    $('.tweets-container').html('');
    renderTweets(streams.users[user]);
  //  $('.tweets-container').html('');

})

    // button logic below

    // simple refresh button

    $('#refresh').on('click', function() {
        $('.tweets-container').html('');
        renderTweets(streams.home);
    });

    // auto refresh code
    var toggle = false

    $('#auto-refresh').on('click', function() {
        if (toggle === false) {
            $('.tweets-container').html('');
            renderTweets(streams.home);
            toggle = true;
            $('#auto-refresh').addClass('highlight');
            $('p').append('<img id="spinner" src ="http://i.giphy.com/u2Prjtt7QYD0A.gif">');
        } else {
            toggle = false;
            $('#auto-refresh').removeClass('highlight');
            $('p').find('img').remove();
            return;
        }
        function autoRefresh() {
            setTimeout(function() {
                if (toggle === true) {
                    $('.tweets-container').html('');
                    renderTweets(streams.home);
                    autoRefresh();
                }
            }, 1500);
        }
        autoRefresh();
    });


    // highlight tweets on mouseenter/leave
    $('.tweet-container').on('mouseenter', function() {
        $(this).addClass('highlight');
    });
    $('.tweet-container').on('mouseleave', function() {
        $(this).removeClass('highlight');
    });




// document closing tag
});



/// to do

//find pictures of person
// fix bug on highlighting
// fix time
// add ability to filter
