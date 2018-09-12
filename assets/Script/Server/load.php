<?php
echo header("Access-Control-Allow-Origin: *");
//连接数据库
include_once "config.php";

$openid = $_POST['openid'];

$query = "SELECT highscore FROM player WHERE id='$openid'";
$result = $mysqli->query($query);

$row = $result->fetch_row();
$highScore = $row[0];

$res = array(
             'highScore' => $highScore
            );

echo (json_encode($res));
$mysqli->close();
?>