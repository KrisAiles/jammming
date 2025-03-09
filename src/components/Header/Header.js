import React from 'react';
import './Header.css';
import logo from './spotify-logo-purple.png'

function Header() {

    return (
        <div id='header'>
            <div id='spotify-logo'>
                <img src={logo} alt='Spotify Logo' />
            </div>
            <div id='jammming'>
                <h1>JAMMMING</h1>
            </div>
        </div>
    )
}

export default Header;