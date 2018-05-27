<?php
include "../functions.php";

if (isset($_POST["google-id"]) && (isset($_POST["firstname"])) && (isset($_POST["lastname"]))) {
    $_SESSION['USER'] = $_POST["firstname"];
    $_SESSION['ID'] = $_POST["google-id"];

	echo $_SESSION['USER'];
	echo $_SESSION['ID'];

}

?>