import {useState, useEffect} from 'react';
import SongRow from './SongRow';

function PlayList(props){

    const[songs, setSongs] = useState([]);
    const[page, setPage] = useState(1);
    const[portion, setPortion] = useState(10);
   
    useEffect(()=>{
        fetch("http://music", {
            method: "POST",
            headers: {
                "Content-type": "text/plain"
            },
            body: JSON.stringify({'singers': props.filterSettings.singers,
                                       'genres' : props.filterSettings.genres,
                                       'years': props.filterSettings.years
                      }) 
        })
        .then(response=>response.text())
        .then(data=>{
        try{
            data = JSON.parse(data);
                 setSongs(data);
            }catch(e){
                 console.log("error");
            }       
        });               
},[props]);
    
let songList = [];
let pagitionList = [];
let portionCount = Math.ceil(songs.length / portion);

const paginationHandler =(e)=>{
     setPage(e.target.value);                
 }

for(let i = 0; i < songs.length; i++){
    
    if( i % portion === 0){
        songList.push([]);
    }
    songList[Math.floor(i / portion )].push(<SongRow
                        key = {songs[i].SONG_ID}
                        singer = {songs[i].SINGER}
                        song = {songs[i].SONG}
                        genre = {songs[i].GENRE}
                        year = {songs[i].YEAR}
                      />
    );
}

 let startPage = page <=4 ? 0 : page - 4;
 let endPage = (startPage + 4) <= portionCount ? startPage + 4 : portionCount;

for(let i = startPage; i < endPage; i++){
    pagitionList.push(<button
            key= {i + 1}
            onClick={paginationHandler}
            className={+page === i + 1 ? "page-number activ" : "page-number"}
            value= {i + 1}>{i+1}
            </button>);
}

 

 const portionHandler = (e)=>{
        setPortion(+e.target.value);
        if(+e.target.value !== +portion){
            setPage(1);
        }   
 }

 const pageDown = () =>{
    if(page > 1){
        setPage( +page - 1);
    } 
 }

 const pageUp = () =>{
        if(page < portionCount){
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
                    {songList[page - 1]} 
                </tbody>
            </table>
            <div >
                <div id="pagination">
                    <button onClick={pageDown} className="left-arrow">	&lt;</button>
                    {pagitionList}
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