/****************************************************
 * ASTRONAUTICA '16
 * Major: MultiMediaTechnology - FH Salzburg
 * Project: MultiMediaProject 1
 * Author: Patrick Obermueller
 * Nr.: fhs38596
 ****************************************************/

$game_canvas = $('#astronautica');

var enterMenu = function (playGame, initCharacterChoice,goFullScreen) {
    $game_canvas.append("<ul id='play-astronautica-menu'></ul>");
    $('#play-astronautica-menu').css('list-style', 'none');

    $('#play-astronautica-menu').append("<li id='play-welcome-button' style='margin-bottom: 20px;'>PLAY</li>");
    $('#play-astronautica-menu').append("<li id='introduction-welcome-button'>INTRODUCTION</li>");
    $('#play-astronautica-menu').append("<li id='character-welcome-button'>CHARACTERS</li>");
    $('#play-astronautica-menu').append("<li id='fullscreen-welcome-button'>FULLSCREEN</li>");
    $('#play-astronautica-menu').append("<li id='home-welcome-button'>HOME</li>");


    $('#home-welcome-button').css('margin-top', '30px');

    $('#fullscreen-welcome-button').click(function () {
        goFullScreen();
    });

    $('#introduction-welcome-button').click(function () {
        window.open('../index.php#introduction',"_self","","");
    });

    $('#play-welcome-button').click(function () {
        playGame();
    });

    $('#character-welcome-button').click(function () {
        initCharacterChoice();
    });

    $('#home-welcome-button').click(function () {
        window.open('../index.php',"_self","","");
    });
};