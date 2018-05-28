var login_button = document.getElementById('login-button');
var logout_button = document.getElementById('logout_button');

var profile_name = document.getElementById('profile-name');
var profile_image = document.getElementById('profile-image');

var google_user_id;
var first_name;
var last_name;
var email;
var profile_image_url;

var tipp_arrow = document.getElementById('tipp-arrow');

var onSignIn = function (googleUser) {
    var profile = googleUser.getBasicProfile();
    var auth1 = gapi.auth2.getAuthInstance();

    if (auth1.isSignedIn.get()) {
        google_user_id = profile.getId();
        first_name = profile.getGivenName();
        last_name = profile.getFamilyName();
        email = profile.getEmail();
        profile_image_url = profile.getImageUrl();
        display_user_information(profile);
        // log_user_information(profile);
    }

    $.ajax({
            type: 'POST',
            url: '../php/user/login.php',
            data: {
                'google-id': google_user_id,
                'firstname': first_name,
                'lastname': last_name,
                'username': "astronautica_player",
                'email': email
            }
        }).done(function () {
            if(!isLoggedIn) {
                location.reload();
            }
    });

    $my_score_row = $('.' + google_user_id);
    $my_score_row.css('color','gold');
    $my_score_row.css('font-family','\"JuraLight\", \"Courier New\", sans-serif;');
    $my_score_row.css('font-weight','bold');

};

var signOutUser = function () {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();

    google_user_id = null;
    first_name = null;
    last_name = null;
    email = null;
    profile_image_url = null;

    logout_button.style.display = "none";
    profile_name.style.display = "none";
    profile_image.style.display = "none";
    login_button.style.display = "inline-block";

    console.log("please");
    $.get("../php/user/logout.php").done(function () {
        location.reload();
    });
};

var display_user_information = function (profile) {

    if (profile_image_url === undefined) {
        profile_image_url = "game/assets/default_image.png";
        profile_image.style.height = "80px";
    }
    profile_image.style.display = "inline-block";
    profile_image.setAttribute('src', profile_image_url);

    profile_name.style.display = "block";
    profile_name.innerHTML = "Hallo <strong>" + profile.getName() + "</strong>";

    login_button.style.display = "inline-block";
    logout_button.style.display = "inline-block";

};

var openGame = function () {
    window.open("../game.php", "_self");
};

var log_user_information = function (profile) {
 console.log('Name: ' + profile.getName());
 console.log("Your ID  = " + google_user_id);
 console.log('Given Name: ' + first_name);
 console.log('Family Name: ' + last_name);
 console.log("Email: " + email);
 console.log('Image URL: ' + profile.getImageUrl());
 };