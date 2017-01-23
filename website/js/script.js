/*global $*/

// comments targets the code to left or up.




$("#Bot-Nav").hide();  // we want bot nav hidden until media page is called


//Start animation----------------------------------------------------------------------------
(function () { // this is called as soon as the site is loaded
    "use strict";
    if (!document.cookie) { // if theres no cookies, then page is fresh and we will run the animation.
        $("#main").before("<div id='startImg'><div id='startLogo'></div></div>"); // set up the image containers
                
        $("#startImg").delay(2500).animate({height: "0px"}, 1000, function () { $(this).hide(); });
        $("#startLogo").delay(2500).animate({height: "0px"}, 1000, function () { $(this).hide(); });
        // these 2 makes it look like it fade up, fadeOut makes if go left, we animate it to 0 px height then removes it
        // because there will be an invisible box with height if not removed.
        
        $("#Top-Nav").css("height", "0px").hide().delay(3500).show().animate({height: "50px"}, 500);
        // brings down the top menu.
        
        $("#main").hide().delay(3500).show(500);
        $("#banner a").hide().delay(4500).fadeIn(1000);
        $("#footerContainer").hide().css({height: "300px"}).delay(3500).fadeIn(1000);
        // we want the content hidden until the animations are done
        // but the logo will have a 1s extra delay
        
        document.cookie = "StartAnimation = played ; max-age = 3600";
        // clear cookie: document.cookie = "StartAnimation = played ; max-age = -1";
    }
}());
//--------------------------------------------------------------------------------------------

//History controls----------------------------------------------------------------------------
(function () { // when page is reloaded we collect the stored state and load it
    "use strict";
    
    if (history.state !== null) {                               // if there's a state stored
        $("#main").load("_pag/" + history.state + " #content", function () {
        // here we need to call all the apis in a callback so that everything have time to finish loading
        //or it wont appear
            if (history.state === "youtube.html") {
                youtubeAPI();
                $("#Bot-Nav").delay(3500).fadeIn(1000);
            }
            if (history.state === "twitter.html") {
                twitterApi();
                $("#Bot-Nav").delay(3500).fadeIn(1000);
            }
            if (history.state === "google.html") {
                googlePlusApi();
                $("#Bot-Nav").delay(3500).fadeIn(1000);
            }
        // then load our api we want.
        });
    } else {
        $("#main").load("_pag/news.html #content");              // if there's no history stored we load news.html
    }
}());

window.addEventListener("popstate", function (event) {          // popstate is the event back and forth.
    "use strict";
    if (event.state === null) {                                 // if there's no history "event"
        $("#main").load("_pag/news.html #content");             // we'll load news.html
    } else {
        $("#main").load("_pag/" + event.state + " #content");   // if there is a history      
        if (event.state === "youtube.html") {                   // then load our api we want.
            youtubeAPI();
            $("#Bot-Nav").fadeIn(1000);                         // if the history is any of these media links, fade in the menu.
        }
        if (event.state === "twitter.html") {
            twitterApi();
            $("#Bot-Nav").fadeIn(1000);
        }
        if (event.state === "google.html") {
            googlePlusApi();
            $("#Bot-Nav").fadeIn(1000);
        }
    }
});
//------------------------------------------------------------------------------------------------

// URL Finder ------------------------------------------------------------------------------------
function URL(e) { // here we need to extract the last part of the url "name.html" so we can use it to make history state
    "use strict";
    var link = e.split("/"), // splitting the url by / in our case, we will always get the part we want
        currentPage = link[link.length - 1]; // since we made an array, we pick out the last bit with -1
    return currentPage;
}
//------------------------------------------------------------------------------------------------

//loading animation-------------------------------------------------------------------------------
$(document).on({            // loads the animation when ajax is loading, twitter does not use ajax. 
    ajaxStart: function () { "use strict"; $("#loading").css("display", "flex"); },
    ajaxStop: function () { "use strict"; $("#loading").hide(); }
    // when ajax starts loading we play animation, when it stops loading we remove it
});
//------------------------------------------------------------------------------------------------

// navigation-------------------------------------------------------------------------------------
$("#Top-Nav a").on("click", function (e) {
    "use strict";
    e.preventDefault();
    var url = URL(e.target.href);
    history.pushState(url, url);
    // when a link in top navigation is clicked, we use URL finder, and then push the results to history,
    // and prevent it from loading a page the normal way
    
    $("#Bot-Nav").fadeOut(500).animate({height: "50px"}, 500);
    // to make sure bot nav fades out when we use a page other then media
    // we allow bot nav to show when any of these links is called
       
    $("#main").load("_pag/" + url + " #content");
    // then we load the called page to main div.
    if (url === "youtube.html") {// if the history is any of these media links, fade in the menu.
        youtubeAPI();
        $("#Bot-Nav").fadeIn(1000);
    }
    
});

$("#Bot-Nav a").on("click", function (e) {
    "use strict";
    e.preventDefault();
    var url = URL(e.target.parentElement.href);
    history.pushState(url, url);
    // when a link in top navigation is clicked, we use URL finder, and then push the results to history,
    // and prevent it from loading a page the normal way
    
    $("#main").load("_pag/" + url + " #content", function () {
        // we load the clicked link in bot nav, 
        // when that is done we load the API depending on what link is targeted
        
        if (url === "youtube.html") {// if the history is any of these media links, fade in the menu.
            youtubeAPI();
        }
        if (url === "twitter.html") {// if the history is any of these media links, fade in the menu.
            twitterApi();
        }
        if (url === "google.html") {// if the history is any of these media links, fade in the menu.
            googlePlusApi();
        }
    });
});
//------------------------------------------------------------------------------------------------

// Form controls --------------------------------------------------------------------------------
var reEnterForm = false, // to prevent it from re enter stored values
    nameError = false,
    emailError = false,
    msgError = false;

$("#main").on("mouseenter", function () { //reloads the DOM to find the form
    "use strict";
    if (!reEnterForm) { // checks if form have been filled from local save
        $("#formFullName").val(sessionStorage.getItem("name"));
        $("#formEmail").val(sessionStorage.getItem("email"));
        $("#formMessage").val(sessionStorage.getItem("message"));
        reEnterForm = true; // tells the form we have collected saved data
    }
    // on mouseenter it insert data into the fields from the local storage
    
    $("input, textarea, input:not('#submit')").on("blur", function (e) {
        // when we leave the form field controls will apply, exept for the button submit 
        
        var regex$ = /[^a-z0-9\s]/gi, // checks if theres any illegal characters
            regexEmail = /\.[a-z]{2,4}$/i,  // checks if the value ends with .com .se etc
            val = $(this).val(),
            attr = $(this).attr("name");
            
            // name-email-msg-error is to control if the submit button can be clicked
                
        if (attr === "name") {                  // is the attribute name of the target "name"
            if (val === "" || regex$.test(val)) {
                // check if regex is true or if the field is empty
                
                $("#formSpanName").show();      // show the error msg
                nameError = true;               // disable the submit btn
            } else {
                $("#formSpanName").hide();      // hide the error msg
                nameError = false;              // enable the submit btn
            }
            sessionStorage.setItem(attr, val);    // temp save the value of the target
            
        } else if (attr === "email") {          // is the attribute name of the target "name"
            if (val === "" || regexEmail.test(val) === false) {
                // check if regex is true or if the field is empty
                
                $("#formSpanEmail").show();     // show the error msg
                emailError = true;              // disable the submit btn
            } else {
                $("#formSpanEmail").hide();     // hide the error msg
                emailError = false;
            }
            sessionStorage.setItem(attr, val);    // temp save the value of the target
            
        } else if (attr === "message") {        // is the attribute name of the target "name"
            if (val === "") {                   // check if the field is empty
                
                $("#formSpanMsg").show();       // show the error msg
                msgError = true;                // disable the submit btn
            } else {
                $("#formSpanMsg").hide();       // hide the error msg
                msgError = false;               // enable the submit btn
            }
            sessionStorage.setItem(attr, val);    // temp save the value of the target
        }
        if (nameError === true || emailError === true || msgError === true) {
            $("#submit").prop("disabled", true);
        } else {
            $("#submit").prop("disabled", false);
        }
        // here we check if any error is displayed or not, if so we disable/enable(true / false) the submit button using .prop("disabled", true/false)   
    });

    $("form").on("submit", function (e) {
        e.preventDefault(); // we disable it from using actions
        $("input, textarea").each(function () {
            sessionStorage.setItem($(this).attr("name"), "");
        });
        // removes the sessionStorage entries when submitted
        
        $("#sentmsg").remove(); // the message kept duplicating
        $("#contactForm").append("<div id='sentmsg'>Your Message has been sent. redirecting you to front page</div>");
        //display a msg that we sent info
        $("#main").delay(4000).queue(function () {$("#main").load("_pag/news.html #content"); });
        // redirects to news.html after 4 sec
        $("#submit").val("Sending");
        // showing on button that we sent the msg
    });
});
//------------------------------------------------------------------------------------------------






















