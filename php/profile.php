<?php
session_start();
//$_SESSION['userId']="oWPLlvsHX0Hq7rIUCM-JXZ7LtW3A";
header('Content-Type:text/event-stream');
header('Cache-Control:no-cache');
$lotname = $_SESSION['userId'];
//$mysqli = new MySQLi('localhost', 'root', '', 'body_building');
$mysqli = new MySQLi('localhost', 'root', 'sdjzu123', 'body_building');
$mysqli->set_charset('utf8');
$stmt = $mysqli->prepare('SELECT * FROM `userInfo`WHERE `openId`=?');
$stmt->bind_param('s', $lotname);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {

    $nickName = $row['nickname'];
    $avatar = $row['avatar'];
    $sex = $row['sex'];
    $height = $row['height'];
    $weight = $row['weight'];
    $age = $row['age'];
    $targetCalories = $row['targetCalories'];
    $arr = array('nickName'=>$nickName,'avatar'=>$avatar,'sex'=>$sex,'height'=>$height,'weight'=>$weight,'age'=>$age,'targetCalories'=>$targetCalories);
    $i=0;
    if ($i === 0) {
        $i = 1;
    } else {
        echo "\n";
    }
    echo json_encode($arr);

}
