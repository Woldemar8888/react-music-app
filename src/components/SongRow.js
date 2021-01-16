function SongRow(props){
    return (
        <>
            <tr>
                <td>{props.singer}</td>
                <td>{props.song}</td>
                <td>{props.genre}</td>
                <td>{props.year}</td>
            </tr>
        </>
    );
}

export default SongRow;