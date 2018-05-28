<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>ASTRONAUTICA</title>
    <link rel="shortcut icon" type="image/png" href="assets/characters/blueship.png">

    <meta name="description" content="Astronautica - An addicting highscore game.">
    <meta name="keywords"
          content="">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Patrick Obermueller">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/scoretable.css">
    <link rel="stylesheet" href="css/credits.css">
    <link rel="stylesheet" href="css/navigation.css">
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

    <!--GOOGLE LOGIN API-->
    <meta name="google-signin-client_id"
          content="489958636717-uqdvoh3uh3mubbrrs62cklnk11tfs0a2.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>

	<?php include "./php/user/login.php" ?>
	<?php include "./php/functions.php" ?>

</head>

<body>

<div class="holder">
    <header id="header-main">

        <!--NAVIGATION-->
        <nav class="nav">
            <i class="fa fa-bars" id="nav_bar" aria-hidden="true"></i>

            <ul class="navigation-list-items">
                <li><a href="#welcome">Welcome</a></li>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#highscore">Scorelist</a></li>
                <li><a href="#credits" style="padding-right: 10px"">Credits</a></li>
            </ul>
        </nav>

        <!--PROFILE-->
        <div id="profile-information">

            <div id="left_content">
                <?php
                if (!(isset($_SESSION['ID']))) {
                    echo "<i class=\"fa fa-long-arrow-right\" id=\"tipp-arrow\" aria-hidden=\"true\"></i>";
                }
                 ?>

                <p id="profile-name"></p>
                <div class="login-button-container">
                    <div data-theme="dark" data-width="110px" data-height="30px" id="login-button" class="g-signin2"
                         data-onsuccess="onSignIn"></div>
                    <div id="logout_button" onclick="signOutUser();"><i class="fa fa-sign-out" aria-hidden="true"></i>
                    </div>
                </div>
            </div>

            <div id="right_content">
                <img id="profile-image" src="" onerror="if (this.src !== 'assets/landingpage/profile_pic_default.png') this.src = 'assets/landingpage/profile_pic_default.png';">
                <i class="fa fa-volume-off" id="sound_icon" aria-hidden="true" about="start"></i>
            </div>
        </div>

    </header>

    <div id="gotop"><p>TOP</p></div>

    <!--WELCOME-->
    <section id="welcome" class="template-section">
        <div style="display: inline-block" class="welcome_box">
            <div class="intro"><h2>ASTRONAUTICA</h2>
            </div>

            <div id="login-play">
                <?php
                if (!(isset($_SESSION['ID']))) {
	                echo "Login via <strong>Google</strong> to play";
                } else {
	                echo "<a href='game.php' onclick='openGame()'>Play Game</a>";
                }
                ?>
            </div>

        </div>

        <hr class="line_left">
             <a id="to-introduction-scroller"><i class="fa fa-chevron-down down" aria-hidden="true"></i></a>
        <hr class="line_right">
    </section>

    <!--INTRODUCTION-->
    <section id="introduction">
        <div class="section-content">
            <div class="intro-area">
                <img src="assets/characters/pinkship.png">
                <p>Press <span class="highlight-color">LEFT</span>, <span class="highlight-color">RIGHT</span> or <span
                        class="highlight-color">A</span>,  <span class="highlight-color">D</span><br>to navigate through space.</p>
            </div>

            <div class="intro-area-side" id="intro-area-side-yellow">
                <img src="assets/characters/yellowship.png">
                <p> <span class="highlight-color">SPACEBAR</span> and  <span class="highlight-color">W</span> will boost you up.</p>
            </div>

            <div class="intro-center">
                <h5>GAMEPLAY</h5>
            </div>

            <div class="intro-area-side">
                <img src="assets/characters/blueship.png">
                <p>Press <span class="highlight-color">M</span> to<br>enter pause menu.</p>
            </div>

            <div class="intro-area">
                <img src="assets/characters/greenship.png">
                <p><span class="highlight-color">ENTER</span> enables<br>Fullscreenmode.</p>
            </div>
        </div>

        <!--DIVIDER-->
        <hr class="line_left">
        <a id="to-highscore-scroller"><i class="fa fa-chevron-down down" aria-hidden="true"></i></a>
        <hr class="line_right">
    </section>

    <!--SCOREBOARD-->
    <section id="highscore">
        <div id="score-table">
            <table cellspacing="10">
                <caption class="scoreboard-title">SCOREBOARD</caption>
                <tr class="over-row">
                    <th>PLACE</th>
                    <th>SPIELERNAME</th>
                    <th>SCORE</th>
	                <?php

	                $sth = $pdo->query( "SELECT max(game.score) as score, player.firstname, player.lastname, player.id
                                FROM player FULL JOIN game
                                    ON (player.id = game.played_by_id)
                                WHERE score IS NOT NULL
                                GROUP BY player.firstname, player.lastname, player.id
                                ORDER BY score
                                DESC LIMIT 20;
                                ");

	                $score_objects = $sth->fetchAll();

	                $i = 1;

	                foreach ( $score_objects as $score_object ) {
		                $firstname = htmlspecialchars( $score_object['firstname'],ENT_QUOTES);
		                $lastname  = htmlspecialchars( $score_object->lastname,ENT_QUOTES );
		                $score     = htmlspecialchars( $score_object->score,ENT_QUOTES );
		                $user_id   = htmlspecialchars( $score_object->id,ENT_QUOTES );

		                var_dump($score_object);
		                var_dump(isset( $_SESSION['ID']));
		                var_dump($user_id === $_SESSION['ID']);
		                var_dump($score_object->firstname);
		                var_dump($firstname);
		                var_dump($lastname);
		                var_dump($score);
		                var_dump($user_id);

		                while ( $i <= 20 ) {
			                if ( isset( $_SESSION['ID'] ) && $user_id === $_SESSION['ID'] ) {
				                echo "<tr><td class='$user_id'>$i." . "</td><td class='$user_id'>$firstname $lastname</td><td class='$user_id'>$score</td></tr>";
			                } else {
				                echo "<tr><td>$i." . "</td><td>$firstname $lastname</td><td>$score</td></tr>";
			                }
			                $i ++;
			                break 1;
		                }
	                }

	                while ( $i <= 20 ) {
		                echo "<tr>
                                <td>$i." . "</td>
                                <td> - </td>
                                <td> - </td>
                              </tr>";
		                $i ++;
	                }
	                ?>
                </tr>
            </table>
        </div>

        <!--DIVIDER-->
        <hr class="line_left">
        <a id="to-credits-scroller"><i class="fa fa-chevron-down down" aria-hidden="true"></i></a>
        <hr class="line_right">
    </section>

    <!--CREDITS-->
    <section id="credits">

        <h2>
            Credits
        </h2>

        <i class="fa fa-undo" id="play-credits" aria-hidden="true"></i><br>

        <!--ABSPANN-->
        <div id="closing-credits">
            <span id="closing-credits-content">

                <span><strong id="credits-title">ASTRONAUTICA</strong></span><br>

                <br> A game developed by <br><strong>Patrick Obermueller</strong><br>
                in the course <br>
                web and game studies<br>
                at FH Salzburg -
                University of applied sciences.<br>

                <br>Thanks to<br>

                <strong>Matthew Pablo</strong> (Logintrack)<br>
                <a class="credits-link" href="http://www.matthewpablo.com">www.matthewpablo.com</a><br><br>

                <strong>jervyhoumusic</strong> (Gametrack)<br>
                <a class="credits-link"
                   href="http://jervyhoumusic.newgrounds.com/">www.jervyhoumusic.newgrounds.com/</a><br><br>

                <strong>StaneStane</strong> (SFX)<br>
                <a class="credits-link" href="https://www.freesound.org/people/StaneStane/">www.freesound.org/people/StaneStane</a><br><br>

                <strong>LloydEvans09</strong> (SFX)<br>
                <a class="credits-link" href="https://www.freesound.org/people/LloydEvans09">www.freesound.org/people/LloydEvans09</a><br><br>

                <strong>WebTreatsETC</strong> (Space Pattern)<br>
                <a class="credits-link"
                   href="http://webtreatsetc.deviantart.com/art/Classic-Nebula-Space-Patterns-141741066">www.webtreatsetc.deviantart.com</a><br><br>

                <strong>Rawdanitsu</strong> (Game Background)<br>
                <a class="credits-link" href="http://opengameart.org/users/rawdanitsu">www.opengameart.org/users/rawdanitsu</a><br><br>

                <strong>kenney.nl</strong> (Characters)<br>
                <a class="credits-link" href="http://kenney.nl/assets/alien-ufo-pack">www.kenney.nl/assets/alien-ufo-pack</a><br><br>

                <strong>prdatur</strong> (Diamonds)<br>
                <a class="credits-link"
                   href="http://opengameart.org/users/prdatur">www.opengameart.org/users/prdatur</a><br><br>

                <strong>GameArtForge</strong> (Asteroids)<br>
                <a class="credits-link" href="http://opengameart.org/users/gameartforge">www.opengameart.org/users/gameartforge</a><br><br>

                <br>ASTRONAUTICA

            </span>
        </div>

    </section>

    <footer>
        <p>ASTRONAUTICA 2016 - Student's project</p>
    </footer>

</div>

<audio id="login_music" src="assets/audio/space_sprinkles.mp3" loop></audio>

<!--SCRIPTS -->
<script>
    var isLoggedIn = <?php echo (isset($_SESSION['USER'])) ? "true" : "false"; ?>;
    var noSound = <?php if(isset($_SESSION['SOUND'])) {
        echo $_SESSION['SOUND'];
    }  else {
        echo true;
    }?>;
</script>

<script src="js/main.js"></script>
<script src="js/google-login.js"></script>

<!--RENDER BUTTON NEW-->
<script>
    function onFailure(error) {
        console.log(error);
    }

    function renderButton() {
        gapi.signin2.render('login-button', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    }
</script>

</body>
</html>