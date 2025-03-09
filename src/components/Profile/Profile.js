import React from "react";
import './Profile.css'
import logo from './spotify-logo.png'

function Profile(props) {
    // checks to see if the user has a profile image saved to their spotify account, if they do it will display it if not it will display a spotify logo
    let avatar;
    if (props.userProfile.images.length > 0) {
        avatar = props.userProfile.images[0].url;
    } else {
        avatar = logo;
    }
    return (
        <div id="profile">
            <div id="avatar"><img src={avatar} alt={props.userProfile.display_name + ' avatar'} /></div>
            <p>Username: {props.userProfile.display_name}</p>
            <p>Email: {props.userProfile.email}</p>
            <p>Profile Link: <a href={props.userProfile.external_urls.spotify} rel="noreferrer" target="_blank">View your profile on Spotify</a></p>
        </div>
    )
}

export default Profile;