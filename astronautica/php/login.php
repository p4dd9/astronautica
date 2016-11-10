<?php
/****************************************************
 * ASTRONAUTICA '16
 * Major: MultiMediaTechnology - FH Salzburg
 * Project: MultiMediaProject 1
 * Author: Patrick Obermueller
 * Nr.: fhs38596
 ****************************************************/

    include "functions.php";

    if (isset($_POST["google-id"]) && (isset($_POST["firstname"])) && (isset($_POST["lastname"]))) {
        $_SESSION['USER'] = $_POST["firstname"];
        $_SESSION['ID'] = $_POST["google-id"];
    }
?>