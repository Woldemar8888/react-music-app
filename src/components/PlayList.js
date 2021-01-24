import {useState, useEffect} from 'react';
import SongRow from './SongRow';

function PlayList(props){

    const[songs, setSongs] = useState([]);
    const[page, setPage] = useState(1);
    const[portion, setPortion] = useState(10);
   
    useEffect(()=>{
        fetch("https://woldemar.h1n.ru/music/", {
            method: "POST",
            headers: {
                "Content-type": "text/plain"
            },
            body: JSON.stringify({'singers': props.filterSettings.singers,
                                  'genres' : props.filterSettings.genres,
                                  'years': props.filterSettings.years,
                                  'sort': props.filterSettings.sort,
                                  'direction': props.filterSettings.direction
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

 const sort = (e) => {
    let obj = {...props.filterSettings};
    obj.sort = e.target.value;
    obj.direction = e.target.getAttribute('direction');
    props.setFilterSettings(obj);
 }

 const changeDirection = (e) =>{
    let obj = {...props.filterSettings};
    let direction = obj.direction;
    direction = obj.direction === 'up' ? 'down' : 'up';
    obj.direction = direction;
    props.setFilterSettings(obj);
 }

    return (
        <div className ="playlist">
            <div className="playlist-title">Плейлист</div>
            <table>
                <thead>
                    <tr>
                        <th id="singer">
                            Исполнитель
                            <span className="sortArrows">
                                {props.filterSettings.sort === 'singer' ? 
                                    <button 
                                        value="singer"
                                        className="activ"
                                        direction={props.filterSettings.direction === 'up' ? 'up' : 'down'}
                                        onClick={changeDirection}>{props.filterSettings.direction === 'up' ? <>&#9650;</> : <>&#9660;</>}
                                    </button>
                                    :
                                    <>
                                    <button 
                                        value="singer"
                                        direction="up"
                                        onClick={sort}>&#9650;
                                    </button>
                                    <button
                                        value="singer"
                                        direction="down"
                                        onClick={sort}>&#9660;
                                    </button>
                                    </>
                                }
                            </span>
                        </th>
                        <th id="song">
                            Песня
                            <span className="sortArrows">
                                {props.filterSettings.sort === 'song' ? 
                                    <button 
                                        value="song"
                                        className="activ"
                                        direction={props.filterSettings.direction === 'up' ? 'up' : 'down'}
                                        onClick={changeDirection}>{props.filterSettings.direction === 'up' ? <>&#9650;</> : <>&#9660;</>}
                                    </button>
                                    :
                                    <>
                                    <button 
                                        value="song"
                                        direction="up"
                                        onClick={sort}>&#9650;
                                    </button>
                                    <button
                                        value="song"
                                        direction="down"
                                        onClick={sort}>&#9660;
                                    </button>
                                    </>
                                }
                            </span>
                        </th>
                        <th id="genre">
                            Жанр
                            <span className="sortArrows">
                                {props.filterSettings.sort === 'genre' ? 
                                    <button 
                                        value="genre"
                                        className="activ"
                                        direction={props.filterSettings.direction === 'up' ? 'up' : 'down'}
                                        onClick={changeDirection}>{props.filterSettings.direction === 'up' ? <>&#9650;</> : <>&#9660;</>}
                                    </button>
                                    :
                                    <>
                                    <button 
                                        value="genre"
                                        direction="up"
                                        onClick={sort}>&#9650;
                                    </button>
                                    <button
                                        value="genre"
                                        direction="down"
                                        onClick={sort}>&#9660;
                                    </button>
                                    </>
                                }
                            </span>
                        </th>
                        <th id="year">
                            Год
                            <span className="sortArrows">
                                {props.filterSettings.sort === 'year' ? 
                                    <button 
                                        value="year"
                                        className="activ"
                                        direction={props.filterSettings.direction === 'up' ? 'up' : 'down'}
                                        onClick={changeDirection}>{props.filterSettings.direction === 'up' ? <>&#9650;</> : <>&#9660;</>}
                                    </button>
                                    :
                                    <>
                                    <button 
                                        value="year"
                                        direction="up"
                                        onClick={sort}>&#9650;
                                    </button>
                                    <button
                                        value="year"
                                        direction="down"
                                        onClick={sort}>&#9660;
                                    </button>
                                    </>
                                }
                            </span>
                        </th>
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