<?php
/****************************************************
 * ASTRONAUTICA '16
 * Major: MultiMediaTechnology - FH Salzburg
 * Project: MultiMediaProject 1
 * Author: Patrick Obermueller
 * Nr.: fhs38596
 ****************************************************/

    $_SESSION = array();

    unset($_SESSION['USER']);
    unset($_SESSION['ID']);

    if (isset($_COOKIE[session_name()])) {
        setcookie(
            session_name(),  // Cookie-Name war gleich Name der Session
            '',             // Cookie-Daten. Achtung! Leerer String hier hilft nicht!
            time()-42000,  // Ablaufdatum in der Vergangenheit. Erst das löscht!
            '/'           // Wirkungsbereich des Cookies: der ganze Server
        );
    }

    unset($_SESSION);
    session_unset();
    session_destroy();

?>