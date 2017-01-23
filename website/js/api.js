/*global $*/

//youtube API


function youtubeAPI() {
    "use strict";
    window.console.log("loaded API");
    $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDJ_OYzUewmczuVw2VOr1OV-86zZGCxLe8&channelId=UC7hDxVb2UNs2-aloJl1FCvQ&part=snippet,id&order=date&maxResults=1",
    // first collects the api data, taking the latest video posted (snippet - id - order max result 1)      
        
        function (data) {
            $.each(data.items, function (i, item) { // here we create an i frame for each items we found, in this case 1.
                var createVid = "<iframe class='player' src='https://www.youtube.com/embed/" + item.id.videoId + "' allowfullscreen></iframe>";
                $("#youtubeContainer").append(createVid);
                //appends it to premade divs in youtube.html
            });
        }
        );
}

// Twitter Api

function twitterApi() {
    "use strict";
    $("#twitter-wjs").remove(); 
    /*twitter appends a script tag and src everytime you call it.
    to be able to call it again, it had to be removed*/
    
    
    window.twttr = (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) {return t; }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
        t._e = [];
        t.ready = function (f) {
            t._e.push(f);
        };
        return t;
    }(document, "script", "twitter-wjs"));
    // twitter api code. necessary to get the feed----
}

//Google+ api
function googlePlusApi() {
    "use strict";
    $.get("https://www.googleapis.com/plus/v1/activities?query=%2BRio2016&key=AIzaSyDJ_OYzUewmczuVw2VOr1OV-86zZGCxLe8", function (data) {
        // first collects the api data, this time finding any post tagged with +Rio2016
        $.ajax({
            url: "https://apis.google.com/js/plusone.js",
            dataType: "script"
        });
        // we also need to reload the api script google + uses by using $.ajax
    
        $.each(data.items, function (i, item) {
            var createFeed = "<div class='g-post' data-href='" + data.items[i].url + "'></div>";
            $("#Googlefeed").append(createFeed);
                        
        });
    });
}








