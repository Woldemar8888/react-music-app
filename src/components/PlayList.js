import {useState, useEffect} from 'react';
import SongRow from './SongRow';

function PlayList(){

    const[songs, setSongs] = useState({});
    const[first, setFirst] = useState(false);
    const[page, setPage] = useState(1);
    const[portion, setPortion] = useState(10);
   
    useEffect(()=>{
       if(!first){
              fetch("http://music", {
                method: "POST" 
            })
            .then(response=>response.text())
            .then(data=>{
            
            data = JSON.parse(data);
            setFirst(true);
            setSongs(data);
        });
       }        
    });
    
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
     setPage(e.target.value);
                    
 }

 const portionHandler = (e)=>{
        setPortion(+e.target.value);
 }

 const pageDown = () =>{
    if(page > 1){
        setPage( +page - 1);
    } 
 }

 const pageUp = () =>{
        if(page < 4){
            setPage( +page + 1);
        }
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
                    {songList[0]} 
                </tbody>
            </table>
            <div >
                <div id="pagination">
                    <button onClick={pageDown} className="left-arrow">	&lt;</button>
                    <button onClick={paginationHandler} className={+page ===1 ? "page-number activ" : "page-number"}  value="1">1</button>
                    <button onClick={paginationHandler} className={+page ===2 ? "page-number activ" : "page-number"}  value="2">2</button>
                    <button onClick={paginationHandler} className={+page ===3 ? "page-number activ" : "page-number"}  value="3">3</button>
                    <button onClick={paginationHandler} className={+page ===4 ? "page-number activ" : "page-number"}  value="4">4</button>
                    <button onClick={pageUp} className="right-arrow" >&gt;</button>
                    
          
                </div>
                <div id="count-panell">
                    <button onClick={portionHandler} value="10" className={portion ===10 ? "activ":""}>10</button>
                    <button onClick={portionHandler} value="25" className={portion ===25 ? "activ":""}>25</button>
                    <button onClick={portionHandler} value="50" className={portion ===50 ? "activ":""}>50</button>
                    <button onClick={portionHandler} value="100" className={portion ===100 ? "activ":""}>100</button>
                </div>
            </div>
        </div>
    );
}

export default PlayList;