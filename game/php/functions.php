<?php
if (!isset($_SESSION['USER']) && !isset($_SESSION['ID'])) {
    session_start();
}

try {
	global $db;
	$db = parse_url(getenv("DATABASE_URL"));

	$pdo = new PDO("pgsql:" . sprintf(
			"host=%s;port=%s;user=%s;password=%s;dbname=%s",
			$db["host"],
			$db["port"],
			$db["user"],
			$db["pass"],
			ltrim($db["path"], "/")
		));

} catch (Exception $e) {
    die("Problem connecting to database: " . $e->getMessage());
}
?>
