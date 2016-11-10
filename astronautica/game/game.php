<!DOCTYPE html>
<html lang="en">
<head>
<!--
/****************************************************
* ASTRONAUTICA '16
* Major: MultiMediaTechnology - FH Salzburg
* Project: MultiMediaProject 1
* Author: Patrick Obermueller
* Nr.: fhs38596
****************************************************/-->

    <meta charset="UTF-8">
    <title>ASTRONAUTICA</title>
    <link rel="shortcut icon" type="image/png" href="../game/assets/blueship.png"/>

    <meta name="description" content="Astronautica - An addicting highscore game for all ages.">
    <meta name="keywords"
          content="game, highscore, astronautica, fhs, fh salzburg, mmp1, mmp">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Patrick Obermueller">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/menu.css">
    <link rel="stylesheet" href="../css/theend.css">
    <link rel="stylesheet" href="../css/game.css">
    <link rel="stylesheet" href="../css/fonts.css">
    <link rel="stylesheet" href="../css/characterchoice.css">
    <link rel="stylesheet" href="../css/pause.css">
    <link rel="stylesheet" href="../css/mobilecontrols.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script> <!--CDN-->

    <?php/*
        include "../php/functions.php";

        if(!(isset($_SESSION['USER']) || isset($_SESSION['ID']))) {
            header("Location: ../index.php");
        }*/
    ?>

</head>

<body>

    <div id="game-holder">
        <div style="display:inline-block; position: relative; z-index: 999;" id="astronautica"></div>
    </div>
    <div id="title-game">
        <!--<h1>/ ASTRONAUTICA \</h1>-->
    </div>

<form>
    <input type="hidden" id="this-id" name="this-id" value="<?php /*echo $_SESSION['ID'];*/ ?>"/>
</form>

<script src="../js/game/theEnd.js"></script>
<script src="../js/game/thePause.js"></script>
<script src="../js/game/theCharacters.js"></script>
<script src="../js/phaser.min.js"></script>
<script src="../js/game/game.js"></script>
<script src="../js/game/theMenu.js"></script>

</body>
</html>
