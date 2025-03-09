import React from "react";
import './TrackDisplay.css';
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function TrackDisplay(props) {

    return (
        <div id='track-display'>
            <SearchResults tracks={props.tracks} addTrack={props.addTrack} removeTrack={props.removeTrack} />
            <Playlist tracks={props.tracks} addTrack={props.addTrack} removeTrack={props.removeTrack} playlistTracks={props.playlistTracks} onPlaylistChange={props.onPlaylistChange} playlistName={props.playlistName} onClick={props.onClick} />
        </div>
    );
};

export default TrackDisplay;