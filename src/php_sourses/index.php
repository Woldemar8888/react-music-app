<?php

header("Access-Control-Allow-Origin: *");

require_once 'connection.php';

$text = file_get_contents('php://input');
$assocArr = json_decode($text, true);
$singers = $assocArr['singers'];
$genres = $assocArr['genres'];
$years = $assocArr['years'];

$settingsArr = [$singers, $genres, $years];

if($singers =='all' && $genres=='all' && $years=='all'){
	$stmt = $pdo->prepare("SELECT * FROM songs");
	$stmt->execute();	
}else{
	$stmt = $pdo->prepare("SELECT * FROM songs".queryParser($settingsArr));
	$stmt->execute(['GENRE' => $genres]);
}

$data = [];
while ($str = $stmt->fetch()) {
	$data[] = $str;
}

$json = json_encode($data);
echo $json;


function queryParser($settingsArr){
	$queryOption = " WHERE ";
	
	if($settingsArr[1] != 'all' ){
		$queryOption = $queryOption.'GENRE = :GENRE';
	}
	return $queryOption;
}

?>
