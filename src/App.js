import './App.css';
import FilterList from './components/FilterList';
import PlayList from './components/PlayList';
import {useState} from 'react';

function App() {
    const[filterSettings, setFilterSettings] = useState({
        "singers":"all",
        "genres": "all",
        "years" : "all",
        "sort": "singer",
        "direction": "up"});
  return (
    <div className="container">
        <PlayList 
            filterSettings={filterSettings}
            setFilterSettings={setFilterSettings}
        />
        <FilterList
            filterSettings={filterSettings}
            setFilterSettings={setFilterSettings}
         />    
    </div>
  );
}

export default App;
