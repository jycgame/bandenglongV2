<?php

$appid = "wx43b8f1a4c87a9f1f";
$secret = "b9722355705e917f848d98e0c4e7d6b3";

$user = "root";
$password = "password";
$host = "localhost";
$database = "dragon";

$mysqli = new mysqli($host, $user, $password, $database);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

$mysqli->set_charset("utf8");

/* change character set to utf8 */
// if (!$mysqli->set_charset("utf8")) {
//     printf("Error loading character set utf8: %s\n", $mysqli->error);
// } else {
//     printf("Current character set: %s\n", $mysqli->character_set_name());
// }
?>