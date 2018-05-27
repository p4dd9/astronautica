<?php

if ($_SERVER['HTTP_HOST'] == 'users.multimediatechnology.at') {
    $DB_NAME = "";
    $DB_USER = "";
    $DB_PASS = "";  // fill in password here!!
    $DSN     = "pgsql:dbname=$DB_NAME;host=localhost";
} else {
    $DB_NAME = "astronautica";
    $DB_USER = "postgres"; // fill in your local db-username here!!
    $DB_PASS = "postgres"; // fill in password here!!
    $DSN     = "pgsql:dbname=$DB_NAME;host=localhost";
}
?>
