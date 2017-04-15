<?php
session_start();
$lotname = $_SESSION['userId'];
$height = $_GET['height'];
$age = $_GET['age'];
$weight = $_GET['weight'];
$target = $_GET['target'];

$mysqli = new MySQLi('localhost', 'root', 'sdjzu123', 'body_building');
$mysqli->set_charset('utf8');

$stmt = $mysqli->prepare('UPDATE `userInfo` SET `height`=?,`weight`=?,`age`=?,`targetCalories`=? WHERE `openId` =?');
$stmt->bind_param('iiiis', $height,$weight,$age,$target,$lotname);

if($stmt->execute() == true)
{
    echo 1;
}
else
{
    echo 0;
}



