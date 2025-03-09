import React from "react";
import "./Track.css"

function Track(props) {
    const addToPlaylist = () => {
        props.addTrack(props.track);
    }
    const removeFromPlaylist = () => {
        props.removeTrack(props.track);
    }
    const renderButton = () => {
        // checks to see if a track is in the sesrch results or the playlist and dispalys an add to playlist button if it is in the search results and a remove button if it is in the playlist
        if(props.removeButton) {
            return (<button className="add-remove" onClick={removeFromPlaylist}><span id="remove">-</span></button>);
        } else {
            return (<button className="add-remove" onClick={addToPlaylist}><span id="add">+</span></button>);
        }
    }
    return (
        <div className='track'>
            <div>
                <img src={props.track.album.images[1].url} alt={`${props.track.artists[0].name}, ${props.track.album.name} album cover`} />
            </div>
            <div>
                <p>Track name: {props.track.name}<br />
                Artist Name: {props.track.artists[0].name}<br />
                Album Name: {props.track.album.name}<br />
                <a href={props.track.external_urls.spotify} rel="noreferrer" target="_blank">Play On Spotify</a></p>
            </div>
            <div className="button-container">
                {renderButton()}
            </div>
        </div> 
    )
}

export default Track;