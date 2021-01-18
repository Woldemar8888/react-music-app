
function FilterList(props){
  
    const setOptions = (e) => {
        
        const obj = {...props.filterSettings};
        obj[e.target.id] = e.target.value;
        props.setFilterSettings(obj);
    }

    return (
        <div className="filter">
            <div className="filter-title">Фильтр</div>
            <div className="filter-body">
                <div className="filter-item">
                    <div className="label">Исполнитель</div>
                    <select id="singers" onChange={setOptions}>
                        <option value="all">Все</option>
                        <option value="A-H">A - H</option>
                        <option value="I-P">I-P</option>
                        <option value="Q-Z">Q-Z</option>
                    </select>
                </div>
                <div className="filter-item">
                    <div className="label">Жанр</div>
                    <select id="genres" onChange={setOptions}>
                        <option value="all">Все</option>
                        <option value="Folk">Folk</option>
                        <option value="Juzz">Juzz</option>
                        <option value="Rock">Rock</option>
                        <option value="Blues">Blues</option>
                        <option value="Lyrics">Lyrics</option>
                    </select>
                </div>
                <div className="filter-item">
                    <div className="label" >Год</div>
                    <select id="years" onChange={setOptions}>
                        <option value="all">Все</option>
                        <option value="before50">До 50-x</option>
                        <option value="50-80">50 - 80</option>
                        <option value="81-00">81 - 00</option>
                        <option value="after00">После 2000</option>
                    </select>
                </div>   
            </div>
        </div>
    );
}

export default FilterList;