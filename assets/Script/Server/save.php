<?php
echo header("Access-Control-Allow-Origin: *");
//连接数据库
include_once "config.php";
$openid = $_POST['openid'];
$highScore = $_POST['highScore'];

$query = "SELECT highscore FROM player WHERE id='$openid'";
$result = $mysqli->query($query);
$oldHighScore = $result->fetch_row()[0];

if ( $oldHighScore < $highScore ) {
    $query = "UPDATE player SET highscore = $highScore WHERE id='$openid'";
}

$mysqli->query($query);
// echo (json_encode($res));
$mysqli->close();
?>