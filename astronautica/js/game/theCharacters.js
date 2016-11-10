/****************************************************
 * ASTRONAUTICA '16
 * Major: MultiMediaTechnology - FH Salzburg
 * Project: MultiMediaProject 1
 * Author: Patrick Obermueller
 * Nr.: fhs38596
 ****************************************************/

$game_canvas = $('#astronautica');

var chooseCharacter = function (playGame, graphicAssets, goToMenu) {

    //CHANGES URL/NAME OF USED CHARACTER GRAPHIC
    var setAstronautSprite = function (index) {
        switch(index) {
            case 0:
                graphicAssets.astronautName = "astronaut";
                graphicAssets.astronautURL = "assets/pinkship.png";
                break;
            case 1:
                graphicAssets.astronautName = graphicAssets.astronautBlueName;
                graphicAssets.astronautURL = graphicAssets.astronautBlueURL;
                break;
            case 2:
                graphicAssets.astronautName = graphicAssets.astronautGreenName;
                graphicAssets.astronautURL = graphicAssets.astronautGreenURL;
                break;
            case 3:
                graphicAssets.astronautName = graphicAssets.astronautYellowName;
                graphicAssets.astronautURL = graphicAssets.astronautYellowURL;
                break;
        }
    };

    setAstronautSprite(0);
    
    $game_canvas.append("<div id='character-holder'></div>");
    $character_holder = $('#character-holder');

    $character_holder.append("<h3 id='characters-title'>CHOOSE CHARACTER</h3>");

    $character_holder.append("<div id='characters-slider'></div>");
    $character_slider = $('#characters-slider');

    $character_slider.append("<i id='left' class='fa fa-angle-left'></i>");
    $character_slider.append("<i id='right' class='fa fa-angle-right'></i>");

    $character_slider.append("<ul id='slide-list'></ul>");
    $slide_list = $('#slide-list');

    $slide_list.append("<li class='show'><img alt='character' src='../game/assets/pinkship.png'></li>");
    $slide_list.append("<li ><img alt='character' src='../game/assets/blueship.png'></li>");
    $slide_list.append("<li><img alt='character' src='../game/assets/greenship.png'></li>");
    $slide_list.append("<li><img alt='character' src='../game/assets/yellowship.png'></li>");

    //GET CURRENT INDEX
    var getCurrentIndex = function num_i() {
        var elements = $('#slide-list li');//JQuery collection
        var current_show_index;
        elements.each(function (index) {
            if (($(this).attr('class')) === 'show') {
                current_show_index = index;
            }
        });
        return current_show_index;
    };

    //SET IMAGE INDEX
    var setClassOnIndex = function (index) {
        var elements = $('#slide-list li');
        elements.each(function (element_i) {
            if (element_i === index) {
                $(this).attr('class', 'show');
            } else {
                $(this).attr('class', '');
            }
        });
    };

    var elements = $('#slide-list li');
    var elements_length = elements.length;

    //NEXT CHARACTER
    $('#right').click(function () {
        var index = getCurrentIndex();
        index++;
        if (index >= elements_length) {
            index = 0;
        }
        setAstronautSprite(index);
        setClassOnIndex(index);
        return false; //satisfying
    });

    //PREVIOUS CHARACTER
    $('#left').click(function () {
        var index = getCurrentIndex();
        index--;

        if (index < 0) {
            index = elements_length - 1;
        }

        setAstronautSprite(index);
        setClassOnIndex(index);
        return false;
    });

    $character_holder.append("<p id='play-button-character'>PLAY</p>");
    $character_holder.append("<p id='menu-button-character'>HOME</p>");

    $('#play-button-character').click(function () {
        playGame();
    });

    $('#menu-button-character').click(function () {
        goToMenu();
    });

};

