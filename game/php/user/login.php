<?php
define('ROOT_PATH', dirname(__DIR__) . '/');
include(ROOT_PATH .'functions.php');

if (isset($_POST["google-id"]) && (isset($_POST["firstname"])) && (isset($_POST["lastname"]))) {
    $_SESSION['USER'] = $_POST["firstname"];
    $_SESSION['ID'] = $_POST["google-id"];

	$id = $_POST["google-id"];

	$sth = $pdo->query("SELECT * FROM player WHERE player.id = '$id'");
	$results = $sth->fetchAll();

	if (!$results) { // not first time play

		$sth = $pdo->prepare("INSERT INTO player(id, firstname, lastname, username, email) VALUES (?,?,?,?,?)");

		$id = strip_tags($_POST['google-id']);
		$firstname = strip_tags($_POST['firstname']);
		$lastname = strip_tags($_POST['lastname']);
		$username = strip_tags($_POST['username']);
		$email = strip_tags($_POST['email']);

		$secure_execute = $sth->execute(
			array(
				$id,
				$firstname,
				$lastname,
				$username,
				$email
			)
		);
	}
}

?>