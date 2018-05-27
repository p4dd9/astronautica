<?php

include "../functions.php";

    if (isset($_POST["_score"]) && (isset($_POST["_this-id"])) && (isset($_SESSION['ID']))&& (isset($_SESSION['USER']))) {

        $id = $_POST["_this-id"];
        $myScore = $_POST["_score"];

        $sth = $$db->prepare("SELECT
                              game.score
                            FROM game
                            WHERE game.played_by_id = ?
                            ");
        $sth->execute(array($id));
        $score_object = $sth->fetch();

        if ($score_object === false) {
            $sth = $$db->prepare("INSERT INTO game(played_by_id, score) VALUES (?, ?)");
            $update_went_ok = $sth->execute(
                array(
                    $id,
                    $myScore
                )
            );
        }

        else if($score_object->score < $myScore){
                $sth = $$db->prepare("UPDATE game SET score=? WHERE played_by_id=?");
                $update_went_ok = $sth->execute(
                    array(
                        $myScore,
                        $id,
                    )
                );
        }
    }
?>