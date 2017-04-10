<?php
//$_SESSION['userId']="oWPLlvsHX0Hq7rIUCM-JXZ7LtW3A";
header('Content-Type:text/event-stream');
header('Cache-Control:no-cache');
//$mysqli = new MySQLi('localhost', 'root', '', 'body_building');
$mysqli = new MySQLi('localhost', 'root', 'sdjzu123', 'body_building');
$mysqli->set_charset('utf8');
$stmt = $mysqli->prepare('SELECT userInfo.nickname,userInfo.avatar,business.openId,SUM(`business`.`calorie`)AS rank FROM business JOIN userInfo ON business.openId=userInfo.openId  GROUP BY `business`.`openId` DESC');
$stmt->execute();
$result = $stmt->get_result();
$i = 0;
while ($row = $result->fetch_assoc()) {
    $nickName=$row['nickname'];
    $avatar =$row['avatar'];
    $calorie = $row['rank'];
    $arr = array('nickName'=>$nickName,'avatar'=>$avatar,'calorie'=>$calorie);
    if ($i === 0) {
        $i = 1;
    } else {
        echo "\n";
    }
    echo json_encode($arr);
}

