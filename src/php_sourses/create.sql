CREATE TABLE IF NOT EXISTS `songs` (
  `SONG_ID` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `SINGER` VARCHAR(100) NOT NULL,
  `SONG` VARCHAR(100) NOT NULL,
  `GENRE` VARCHAR(100) NOT NULL,
  `YEAR` INT(4) NOT NULL
);