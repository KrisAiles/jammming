import { useState, useEffect } from 'react'
import './App.css'
import LogIn from '../../util/LogIn'
import SpotifyRefresh from '../../util/SpotifyRefresh'
import SpotifySearchResults from '../../util/SpotifySearchResults'
import SpotifySavePlaylist from '../../util/SpotifySavePlaylist'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import SearchBar from '../SearchBar/SearchBar'
import TrackDisplay from '../TrackDisplay/TrackDisplay'
import LoginDisplay from '../Login/LoginDisplay'
import LoginSearchBar from '../LoginSearchBar/LoginSearchBar'
import LoginTrackDisplay from '../LoginTrackDisplay/LoginTrackDisplay'

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  // calls a function every hour to refresh the access token so the user doesn't have to login again and stops the user from loosing any playlist data
  useEffect(() => {
    setInterval(SpotifyRefresh, 3540000, setAccessToken);
  }, [])
  // calls the login function when the pages loads or the value of the access token is updated
  useEffect(() => {
    LogIn(setAccessToken, setUserProfile, accessToken);
  }, [accessToken])
  // adds selected tracks from the search results to the playlist
  const addTrack = (track) => {
    // stops tracks from being added more than once
    if(playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((addedTracks) => [...addedTracks, track]);
  }
  // removes a track from the playlist if the user changes their mind
  const removeTrack = (track) => {
    setPlaylistTracks((addedTracks) => addedTracks.filter((trackToRemove) => trackToRemove.id !== track.id));
  }
  // sets the name of the playlist based on what the user types
  const handlePlaylistChange = (e) => {
    setPlaylistName(e.target.value);
  }
  // saves the playlist when the user clicks the save button and resets the playlist display
  const handleSave = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    SpotifySavePlaylist(playlistName, userProfile, accessToken, trackUris);
    if (!playlistName) {
      return;
    } else {
      setPlaylistName("");
      setPlaylistTracks([]);
    };
  }
  // saves the search term the user types into the search box
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }
  // uses the search term to call a search when the search button is clicked
  const handleSubmit = () => {
    SpotifySearchResults(setSearchResults, searchInput, 0, accessToken);
    setSearchInput("");      
  }
  // generates a random letter and page number to use as search terms when the user clicks the random button 
  const handleRandom = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    let randomNumber = Math.floor(Math.random() * 50);
    SpotifySearchResults(setSearchResults, randomCharacter, randomNumber, accessToken);
  }
  // if the page refreshes the access token will be lost and a login button will be displayed, when clicked it will request a new access token 
  const handleLogIn = () => {
    window.location.replace('https://kris-jammming-project.netlify.app');
    LogIn(setAccessToken, setUserProfile, accessToken);
  }
  // checks to see if the access token and profile data have been saved before displaying th page
  if (accessToken && userProfile) {
    return (
      <>
        <Header />
        <Profile userProfile={userProfile} />
        <SearchBar search={searchInput} onChange={handleChange} onClick={handleSubmit} onRandom={handleRandom} />      
        <TrackDisplay tracks={searchResults} addTrack={addTrack} removeTrack={removeTrack} playlistTracks={playlistTracks} onPlaylistChange={handlePlaylistChange} playlistName={playlistName} onClick={handleSave} />
      </>
    )
  } else {
    // if there isn't an access token or profile data displays a login button
    return (
      <>
        <Header />
        <LoginDisplay onClick={handleLogIn} />
        <LoginSearchBar />
        <LoginTrackDisplay />
      </>

    )
  }
}

export default App;