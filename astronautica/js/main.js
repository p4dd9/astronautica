/****************************************************
 * ASTRONAUTICA '16
 * Major: MultiMediaTechnology - FH Salzburg
 * Project: MultiMediaProject 1
 * Author: Patrick Obermueller
 * Nr.: fhs38596
 ****************************************************/

$(document).ready(function () {

    $welcome_intro = $(".welcome_box");
    $welcome_intro.hide();
    $welcome_intro.fadeIn(7000);

    $soundIcon = $("#sound_icon");
    $login_music = $("#login_music");

    $login_music.trigger('play');

    var handleSound = function (noSound) {
        if (noSound) {
            $soundIcon.attr("class", "fa fa-volume-off");
            $login_music.trigger('pause');
            noSound = true;

            $.ajax({
                type: 'POST',
                url: 'php/handleSound.php',
                data: {
                    'sound': noSound
                }
            });
        } else {
            $soundIcon.attr("class", "fa fa-volume-up");
            $login_music.trigger('play');
            noSound = false;

            $.ajax({
                type: 'POST',
                url: 'php/handleSound.php',
                data: {
                    'sound': noSound
                }
            });
        }
    };
    handleSound(noSound);

    $soundIcon.click(function () {
        noSound = !noSound;
        handleSound(noSound);
    });

    $playCreditsButton = $("#play-credits");
    $closingCreditsContainer = $("#closing-credits");

    $playCreditsButton.click(function () {
        if ($closingCreditsContainer.css("display") === "inline-block") {
            $playCreditsButton.css({"animation": "none"});
            $closingCreditsContainer.css({"display": "none"});
        }
        else {
            $playCreditsButton.css({"animation": "spin 50s linear"});
            $closingCreditsContainer.css({"display": "inline-block"});
        }
    });

    $profileInformation = $('header');

    $(document).scroll(function () {
        if ($(document).width() > 904) {

            var y = $(this).scrollTop();
            if (y > 100) {
                $profileInformation.fadeOut();
            } else {
                $profileInformation.fadeIn();
            }
        }

    });

    $goTopButton = $('#gotop');

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 800) {
            $goTopButton.fadeIn();
        } else {
            $goTopButton.fadeOut();
        }
    });

    $goTopButton.click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    $scrollToIntroduction = $("#to-introduction-scroller");

    $scrollToIntroduction.click(function () {
        $('html, body').animate({
            scrollTop: $("#introduction").offset().top
        }, 2000);
    });

    $scrollToHighscore = $("#to-highscore-scroller");

    $scrollToHighscore.click(function () {
        $('html, body').animate({
            scrollTop: $("#highscore").offset().top
        }, 2000);
    });

    $scrollToCredits = $("#to-credits-scroller");

    $scrollToCredits.click(function () {
        $('html, body').animate({
            scrollTop: $("#credits").offset().top
        }, 2000);
    });

    $navbar = $("#nav_bar");
    $nav = $('.nav');

    $nav.mouseenter(function () {
        $('.navigation-list-items').attr("style", "display: inline-block;");
    });

    $nav.mouseleave(function () {
        $('.navigation-list-items').attr("style", "display: none;");
    });

});