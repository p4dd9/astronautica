<?php
/**
 * Created by PhpStorm.
 * User: pat
 * Date: 12.06.2016
 * Time: 13:20
 */
    include "functions.php";

    if(isset($_POST['sound']))
    $_SESSION['SOUND'] = $_POST['sound'];

?>