import React from "react";
import "./Playlist.css"
import TrackList from "../Tracklist/TrackList";

function Playlist(props) {
    // only displays the save button if there are tracks added to the playlist
    const renderSavebutton = () => {
        if (props.playlistTracks.length === 0) {
            return;
        } else {
            return (
                <button className="submit" type="submit" onClick={props.onClick}>SAVE</button>
            )
        }
    }
    return (
        <div id="playlist-display">            
            <input id="playlist" name="playlist" type="text" value={props.playlistName} onChange={props.onPlaylistChange} placeholder="Enter a Playlist Name" />
            <TrackList tracks={props.playlistTracks} removeButton={true} removeTrack={props.removeTrack} />
            {renderSavebutton()}
        </div>
    )
}

export default Playlist;