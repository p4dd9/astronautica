<?php
if (!isset($_SESSION['USER']) && !isset($_SESSION['ID'])) {
    session_start();
}

try {
	$dbh = parse_url(getenv("DATABASE_URL"));

	$pdo = new PDO("pgsql:" . sprintf(
			"host=%s;port=%s;user=%s;password=%s;dbname=%s",
			$dbh["host"],
			$dbh["port"],
			$dbh["user"],
			$dbh["pass"],
			ltrim($dbh["path"], "/")
		));

	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

} catch (Exception $e) {
    die("Problem connecting to database: " . $e->getMessage());
}
?>
