const clientId = 'ac52f523bd854f129bfb9d813eec1a32';
// Access tokens are only valid for a hour, this function requests an updated access token so you don't need to log in again
async function SpotifyRefresh(accessCallback) {
    // get the refresh token from storage
    const refreshToken = localStorage.getItem('refresh_token');
    // request updated access and refresh tokens
    const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
    });
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    // stores the returned data
    const data = await result.json();
    // stores the new refresh token in storage to use next time the function is called
    localStorage.setItem('refresh_token', data.refresh_token)
    // stores the new access token to be available for other functions
    return accessCallback(data.access_token);
}

export default SpotifyRefresh;