// function to save the created playlist
async function SpotifySavePlaylist(playlistName, userProfile, accessToken, trackUris) {
    // checks to see if the user has named the playlist
    if(playlistName) {
        // creates the an empty playlist in the users spotify account and returns the id of the playlist
        const body = {
            name: playlistName,
            description: "Jammming Playlist",
            public: false
        };
        const getId = await fetch(`https://api.spotify.com/v1/users/31odzh64wl3gtjtdjc7mmdv7eb4y/playlists`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` }, "Content-Type": "application/json",
            body: JSON.stringify(body)
        });
        // stores the returned data
        const getIdResults = await getId.json();
        // extracts and saves the playlist id
        const playlistId = getIdResults.id;
        // uses the playlist id and uri's of the tracks to be saved to update the new playlist
        const params = {
            uris: trackUris
        };
        const setTracks = await fetch(`https://api.spotify.com/v1/users/${userProfile.id}/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`}, "Content-Type": "application/json",
            body: JSON.stringify(params)
        });
        return setTracks;
    } 
    // if the user hasn't set a name for the playlist it alerts them they need to before saving
    else {
        alert('Please enter a name for your playlist');
        return;
    }
}

export default SpotifySavePlaylist;