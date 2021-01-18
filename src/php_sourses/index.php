<?php

header("Access-Control-Allow-Origin: *");

require_once 'connection.php';

$text = file_get_contents('php://input');
$assocArr = json_decode($text, true);
$singers = $assocArr['singers'];
$genres = $assocArr['genres'];
$years = $assocArr['years'];
$firstLetter = $singers[0];
$lastLetter = $singers[2];

$settingsArr = [$singers, $genres, $years];

if($singers == 'all' && $genres == 'all' && $years == 'all'){
	$stmt = $pdo->prepare("SELECT * FROM songs");
	$stmt->execute();	
}else if($singers == 'all' && $genres != 'all' && $years == 'all'){
    $stmt = $pdo->prepare("SELECT * FROM songs WHERE GENRE=:GENRE");
	$stmt->execute(['GENRE' => $genres]);
}else if($singers != 'all' && $genres == 'all' && $years == 'all'){
    $stmt = $pdo->prepare("SELECT * FROM songs WHERE LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST");
	$stmt->execute(['FIRST' => $firstLetter, 'LAST'=> $lastLetter]);
}else if($singers != 'all' && $genres != 'all' && $years == 'all'){
    $stmt = $pdo->prepare("SELECT * FROM songs 
    WHERE LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST
    AND GENRE=:GENRE" );
	$stmt->execute(['FIRST' => $firstLetter, 'LAST'=> $lastLetter, 'GENRE'=>$genres ]);
}else if($singers == 'all' && $genres == 'all' && $years != 'all'){
    if($years == 'before50'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR<:YEAR");
	    $stmt->execute(['YEAR' => 1950]);
    }else if($years == 'after00'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>:YEAR");
	    $stmt->execute(['YEAR' => 2000]);
    }else{
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>=:FROM AND YEAR<=:TO" );
        if($years =='50-80'){
           $stmt->execute(['FROM' => 1950, 'TO'=>1980]); 
        }else{
           $stmt->execute(['FROM' => 1981, 'TO'=>2000]); 
        }   
    }
}else if($singers != 'all' && $genres == 'all' && $years != 'all'){
    
}else if($singers == 'all' && $genres != 'all' && $years != 'all'){
    
}else{
    
}

$data = [];

if($stmt){
   while ($str = $stmt->fetch()) {
    $data[] = $str;
   }   
}
 
$json = json_encode($data);
echo $json;

?>
