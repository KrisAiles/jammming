import React from "react";
import "./TrackList.css"
import Track from "../Track/Track";

function TrackList(props) {
    return (
        <div className='track-list'>
            {props.tracks.map((track) => {
                return (
                        <Track 
                            track={track}
                            key={track.id}
                            addTrack={props.addTrack}
                            removeTrack={props.removeTrack}
                            removeButton={props.removeButton}
                        />           
                )
            })}
        </div>  
    )
}

export default TrackList;