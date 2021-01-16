<?php
header("Access-Control-Allow-Origin: *");
require_once 'connection.php';



$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
	
if(count($_POST) == 0){
	$query ="SELECT * FROM songs LIMIT 10";
	$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
	if($result)
	{
    for ($data = []; $row = mysqli_fetch_assoc($result);
    $data[] = $row);
    $json = json_encode($data);
    echo $json;

	}
}



mysqli_close($link);