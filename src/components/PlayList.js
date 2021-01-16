import {useState, useEffect} from 'react';
import SongRow from './SongRow';

function PlayList(){

    const[songs, setSongs] = useState({});
   
    useEffect(()=>{
       
            fetch("http://music", {
                method: "POST" 
            })
            .then(response=>response.text())
            .then(data=>{
            
            data = JSON.parse(data);
            setSongs(data);
        });
                 
    }, []);
    
let songList = [];
for(let i = 0; i < songs.length; i++){
        songList.push(<SongRow
                        key = {songs[i].SONG_ID}
                        singer = {songs[i].SINGER}
                        song = {songs[i].SONG}
                        genre = {songs[i].GENRE}
                        year = {songs[i].YEAR}
                      />
        );
    }
    

 const paginationHandler =(e)=>{
        e.preventDefault();     
 }
 
    
    return (
        <div className ="playlist">
            <div className="playlist-title">Плейлист</div>
            <table>
                <thead>
                    <tr>
                        <th id="singer">Исполнитель</th>
                        <th id="song">Песня</th>
                        <th id="genre">Жанр</th>
                        <th id="year">Год</th>
                    </tr>
                </thead>
                <tbody>
                    {songList}
                 
                    
                </tbody>
            </table>
            <div >
                <div id="pagination">
                    <button className="left-arrow">	&lt;</button>
                    <button className="page-number activ" onClick={paginationHandler}>1</button>
                    <button className="page-number" onClick={paginationHandler}>2</button>
                    <button className="page-number" onClick={paginationHandler}>3</button>
                    <button className="page-number" onClick={paginationHandler}>4</button>
                    <button className="right-arrow">&gt;</button>
                    
          
                </div>
                <div id="count-panell">
                    <button className="activ">10</button>
                    <button>25</button>
                    <button>50</button>
                    <button>100</button>
                </div>
            </div>
        </div>
    );
}

export default PlayList;