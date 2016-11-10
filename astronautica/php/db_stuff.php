<?php
/**
 * Created by PhpStorm.
 * User: pat
 * Date: 08.11.2016
 * Time: 20:03
 */


/*$hint_message = "";

if (!(isset($_SESSION['ID']))) {
    $hint_message = "Login via <strong>Google</strong> to play";
} else {
    $hint_message = "";
}

$sth = $dbh->query("SELECT max(game.score) as score, profile.firstname, profile.lastname, profile.id
                                FROM profile FULL JOIN game
                                    ON (profile.id = game.played_by_id)
                                WHERE score IS NOT NULL
                                GROUP BY profile.firstname, profile.lastname, profile.id
                                ORDER BY score
                                DESC LIMIT 20;
                                ");

$score_objects = $sth->fetchAll();


/*
                $i = 1;

                    foreach ($score_objects as $score_object) {
                        $firstname = htmlspecialchars($score_object->firstname);
                        $lastname = htmlspecialchars($score_object->lastname);
                        $score = htmlspecialchars($score_object->score);
                        $user_id = htmlspecialchars($score_object->id);
                        while ($i <= 20) {
                            if (isset($_SESSION['ID']) && $user_id === $_SESSION['ID']) {
                                echo "<tr><td class='$user_id'>$i." . "</td><td class='$user_id'>$firstname $lastname</td><td class='$user_id'>$score</td></tr>";
                            } else {
                                echo "<tr><td>$i." . "</td><td>$firstname $lastname</td><td>$score</td></tr>";
                            }
                            $i++;
                            break 1;
                        }
                    }

                while ($i <= 20) {
                    echo "<tr>
                                <td>$i." . "</td>
                                <td> - </td>
                                <td> - </td>
                              </tr>";
                    $i++;
                }

  /*var isLoggedIn = <?php/* echo (isset($_SESSION['USER'])) ? "true" : "false";?>;
    var noSound = <?php/* if(isset($_SESSION['SOUND'])) {
        echo $_SESSION['SOUND'];
    }  else {
        echo true; // no sound
    }
/*
        $id = $_POST["google-id"];

        $sth = $dbh->query("SELECT * FROM profile WHERE id = '$id'");
        $results = $sth->fetchAll();

        if (!$results) { //not first time play

            $sth = $dbh->prepare("INSERT INTO profile(id, firstname, lastname, username, email) VALUES (?,?,?,?,?)");

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
*/?>