<?php
echo header("Access-Control-Allow-Origin: *");
//连接数据库
include_once "config.php";

//获取微信用户openid
$code = $_POST['code'];
$url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . $appid . '&secret=' . $secret . '&js_code=' . $code . '&grant_type=authorization_code';
// $postfields = array('appid' => $appid, 'secret' => $secret, 'js_code' => $code, 'grant_type' => 'authorization_code');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
// curl_setopt($ch, CURLOPT_POST, 1);
// Edit: prior variable $postFields should be $postfields;
// curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$data = curl_exec($ch);
$openid = json_decode($data)->openid;
curl_close($ch);

$query = "SELECT highscore FROM player WHERE id='$openid'";
$result = $mysqli->query($query);

$highscore = 0;
if ($result->num_rows != 0) {
    $row = $result->fetch_row();
    $highscore = $row[0];
} else { //注册
    $query = "INSERT INTO player VALUES ('$openid', 0)";
    $mysqli->query($query);
}

$res = array('openid' => $openid,
             'highScore' => $highscore
            );

echo (json_encode($res));
$mysqli->close();
?>