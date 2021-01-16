import './App.css';
import FilterList from './components/FilterList';
import PlayList from './components/PlayList';

function App() {
  return (
    <div className="container">
        <PlayList />
        <FilterList />    
    </div>
  );
}

export default App;
