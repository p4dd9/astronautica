<?php

if ($_SERVER['HTTP_HOST'] == '') {
    $DB_NAME = "";
    $DB_USER = "";
    $DB_PASS = "";
    $DSN     = "pgsql:dbname=$DB_NAME;host=localhost";
} else {
    $DB_NAME = "";
    $DB_USER = "";
    $DB_PASS = "";
    $DSN     = "pgsql:dbname=$DB_NAME;host=localhost";
}
?>
