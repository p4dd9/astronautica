<?php
/****************************************************
 * ASTRONAUTICA '16
 * Major: MultiMediaTechnology - FH Salzburg
 * Project: MultiMediaProject 1
 * Author: Patrick Obermueller
 * Nr.: fhs38596
 ***************************************************/
if ($_SERVER['HTTP_HOST'] == 'users.multimediatechnology.at') {
    $DB_NAME = "";
    $DB_USER = "";
    $DB_PASS = "";  // fill in password here!!
    $DSN     = "pgsql:dbname=$DB_NAME;host=localhost";
} else {
    $DB_NAME = "";
    $DB_USER = ""; // fill in your local db-username here!!
    $DB_PASS = ""; // fill in password here!!
    $DSN     = "pgsql:dbname=$DB_NAME;host=localhost";
}
?>
