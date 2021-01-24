<?php

header("Access-Control-Allow-Origin: *");

require_once 'connection.php';

$text = file_get_contents('php://input');
$assocArr = json_decode($text, true);
$singers = $assocArr['singers'];
$genres = $assocArr['genres'];
$years = $assocArr['years'];
$sort = $assocArr['sort'];
$direction = $assocArr['direction'] == 'up' ? 'ASC' : 'DESC';
$firstLetter = $singers[0];
$lastLetter = $singers[2];

if($singers == 'all' && $genres == 'all' && $years == 'all'){
	$stmt = $pdo->prepare("SELECT * FROM songs ORDER BY $sort $direction");
	$stmt->execute();	
}else if($singers == 'all' && $genres != 'all' && $years == 'all'){
    $stmt = $pdo->prepare("SELECT * FROM songs WHERE GENRE=:GENRE ORDER BY $sort $direction");
	$stmt->execute(['GENRE' => $genres]);
}else if($singers != 'all' && $genres == 'all' && $years == 'all'){
    $stmt = $pdo->prepare("SELECT * FROM songs WHERE LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST ORDER BY $sort $direction");
	$stmt->execute(['FIRST' => $firstLetter, 'LAST'=> $lastLetter]);
}else if($singers != 'all' && $genres != 'all' && $years == 'all'){
    $stmt = $pdo->prepare("SELECT * FROM songs 
    WHERE LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST
    AND GENRE=:GENRE ORDER BY $sort $direction" );
	$stmt->execute(['FIRST' => $firstLetter, 'LAST'=> $lastLetter, 'GENRE'=>$genres ]);
}else if($singers == 'all' && $genres == 'all' && $years != 'all'){
    if($years == 'before50'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR<:YEAR ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 1950]);
    }else if($years == 'after00'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>:YEAR ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 2000]);
    }else{
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>=:FROM AND YEAR<=:TO ORDER BY $sort $direction" );
        if($years =='50-80'){
           $stmt->execute(['FROM' => 1950, 'TO'=>1980]); 
        }else{
           $stmt->execute(['FROM' => 1981, 'TO'=>2000]); 
        }   
    }
}else if($singers != 'all' && $genres == 'all' && $years != 'all'){
    if($years == 'before50'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR<:YEAR AND LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 1950, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter ]);
    }else if($years == 'after00'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>:YEAR LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 2000, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter]);
    }else{
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>=:FROM AND YEAR<=:TO AND LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST ORDER BY $sort $direction" );
        if($years =='50-80'){
           $stmt->execute(['FROM' => 1950, 'TO'=>1980, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter]); 
        }else{
           $stmt->execute(['FROM' => 1981, 'TO'=>2000, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter]); 
        }   
    }
}else if($singers == 'all' && $genres != 'all' && $years != 'all'){
    if($years == 'before50'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR<:YEAR AND GENRE=:GENRE ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 1950, 'GENRE' => $genres]);
    }else if($years == 'after00'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>:YEAR AND GENRE=:GENRE ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 2000, 'GENRE' => $genres]);
    }else{
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>=:FROM AND YEAR<=:TO AND GENRE=:GENRE ORDER BY $sort $direction" );
        if($years =='50-80'){
           $stmt->execute(['FROM' => 1950, 'TO'=>1980, 'GENRE' => $genres]); 
        }else{
           $stmt->execute(['FROM' => 1981, 'TO'=>2000, 'GENRE' => $genres]); 
        }   
    }
}else{
    if($years == 'before50'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR<:YEAR AND LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST AND GENRE=:GENRE ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 1950, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter, 'GENRE' => $genres ]);
    }else if($years == 'after00'){
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>:YEAR LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST AND GENRE=:GENRE ORDER BY $sort $direction");
	    $stmt->execute(['YEAR' => 2000, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter, 'GENRE' => $genres]);
    }else{
        $stmt = $pdo->prepare("SELECT * FROM songs WHERE YEAR>=:FROM AND YEAR<=:TO AND LEFT(SINGER, 1)>=:FIRST AND LEFT(SINGER, 1)<=:LAST AND GENRE=:GENRE ORDER BY $sort $direction" );
        if($years =='50-80'){
           $stmt->execute(['FROM' => 1950, 'TO'=>1980, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter, 'GENRE' => $genres]); 
        }else{
           $stmt->execute(['FROM' => 1981, 'TO'=>2000, 'FIRST' => $firstLetter, 'LAST'=> $lastLetter, 'GENRE' => $genres]); 
        }   
    }
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
