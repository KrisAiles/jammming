import React from "react";
import "./SearchResults.css"
import TrackList from "../Tracklist/TrackList";

function SearchResults(props) {

    return (
        <div id="search-results">
            <h2>Search Results</h2>
            <TrackList tracks={props.tracks} addTrack={props.addTrack} removeTrack={props.removeTrack} />
        </div>
    )
    
}

export default SearchResults;