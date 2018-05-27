<?php

		$hint_message = "";

		if (!(isset($_SESSION['ID']))) {
		    $hint_message = "Login via <strong>Google</strong> to play";
		} else {
		    $hint_message = "";
		}


?>