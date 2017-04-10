<?php
session_start();
//$_SESSION['userId']="oWPLlvsHX0Hq7rIUCM-JXZ7LtW3A";
header('Content-Type:text/event-stream');
header('Cache-Control:no-cache');
$lotname = $_SESSION['userId'];
//$mysqli = new MySQLi('localhost', 'root', '', 'body_building');
    $mysqli = new MySQLi('localhost', 'root', 'sdjzu123', 'body_building');
$mysqli->set_charset('utf8');
$stmt = $mysqli->prepare('SELECT DATE_FORMAT(startingTime,\'%Y/%c/%e\') days,SUM(`trainingDuration`)AS "trainTime",SUM(`totalWeight`)AS"totalWeight",SUM(`calorie`)AS "calorie",SUM(`times`)AS "times",AVG(`heartRate`)AS "heartRate",AVG(`frequency`)AS "frequency" FROM `business` WHERE `openId`= ? GROUP BY days');
$stmt->bind_param('s', $lotname);
$stmt->execute();
$result = $stmt->get_result();
$i = 0;
while ($row = $result->fetch_assoc()) {
    $days = $row['days'];
    $trainingDuration = $row['trainTime'];
    $totalWeight = $row['totalWeight'];
    $calorie = $row['calorie'];
    $times = $row['times'];
    $heartRate = $row['heartRate'];
    $frequency = $row['frequency'];
    $arr = array('days' => $days, 'trainTime' => $trainingDuration, 'totalWeight' => $totalWeight, 'calorie' => $calorie, 'times' => $times,'frequency'=>$frequency,'heartRate'=>$heartRate);
    if ($i === 0) {
        $i = 1;
    } else {
        echo "\n";
    }
    echo json_encode($arr);
}

