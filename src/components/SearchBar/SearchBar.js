import React from "react";
import './SearchBar.css'

function SearchBar(props) {
    
    return (
        <div id="search-bar">
            <input id="search" name="search" type="text" value={props.search} onChange={props.onChange} placeholder="Search for songs..." />
            <button className="search-submit" type="submit" onClick={props.onClick}>SEARCH</button>     
            <p>OR GENERATE RANDOM SONGS TO EXPLORE NEW MUSIC</p>
            <button className="search-submit" type="submit" onClick={props.onRandom}>RANDOM</button>              
        </div>
    )
}

export default SearchBar;