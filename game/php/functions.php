<?php
if (!isset($_SESSION['USER']) && !isset($_SESSION['ID'])) {
    session_start();
}

try {
	$dsn = "pgsql:"
	       . "host=ec2-54-83-204-6.compute-1.amazonaws.com"
	       . "dbname=d2etb958b2n1bs;"
	       . "user=lalxvbsluyzclg;"
	       . "port=5432;"
	       . "password=ef39ee9f480c34b45d3a4e99ebbbd84d5158de0393e4ebbf07a370ee0e5465f5";

	$db = new PDO($dsn);

} catch (Exception $e) {
    die("Problem connecting to database: " . $e->getMessage());
}
?>
