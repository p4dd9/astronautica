var enterEnd = function (playGame, initCharacterChoice, goToMenu, play_score, id) {
    var sendScore = function () {
        $.ajax({
            type: 'POST',
            url: '../../../php/game/score_handling.php',
            data: {
                '_score': play_score,
                '_this-id': id
            }
        });
    };

    sendScore();

    $game_canvas = $('#astronautica');

    $game_canvas.append("<div id='end-state-holder'></div>");
    $end_state_holder = $('#end-state-holder');

    $end_state_holder.append("<div id='score-box'></div>");
    $score_box = $('#score-box');

    $score_box.append("<p id='played-score-title'></p>");
    document.getElementById('played-score-title').innerHTML = "YOUR SCORE";
    $score_box.append("<p id='played-score'></p>");
    document.getElementById('played-score').innerHTML = play_score;

    $end_state_holder.append("<ul id='the-end-menu'></ul>");
    $the_end_menu = $('#the-end-menu');
    $the_end_menu.css('list-style', 'none');

    $the_end_menu.append("<li id='end-retry'>RETRY</li>");
    $the_end_menu.append("<li id='end-scoreboard-button'>SCOREBOARD</li>");
    $the_end_menu.append("<li id='end-character-button'>CHARACTERS</li>");
    $the_end_menu.append("<li id='end-menu-button'>MAIN</li>");
    $the_end_menu.css('margin-top', '30px');

    $end_menu_button = $('#end-menu-button');
    $end_menu_button.css('margin-top', '30px');

    $('#end-retry').click(function () {
        playGame();
    });

    $('#end-character-button').click(function () {
        initCharacterChoice();
    });

    $end_menu_button.click(function () {
        goToMenu();
    });

    $('#end-scoreboard-button').click(function () {
        window.open('../index.php#highscore',"_self","","");
    });
};
