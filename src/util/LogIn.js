const clientId = 'ac52f523bd854f129bfb9d813eec1a32';
const redirectUri = 'http://localhost:3000';
let params = new URLSearchParams(window.location.search);
let code = params.get("code");
// this function requests an access token from spotify to access the users account information, make searches and store the saved playlist
async function getAccessToken(accessCallback, profileCallBack, clientId, redirectUri, code) {
    const codeVerifier = localStorage.getItem("verifier");
    // sends an encoded request to spotify
    const params = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
    });
    const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
    });
    // saves the returned data
    const data = await result.json();
    // uses the returned access token to get the users profile information to display
    FetchProfile(profileCallBack, data.access_token);
    // saves the returned access token for other functions to use
    accessCallback(data.access_token);
    // stores the refresh token so the refresh function can use it to get a new access token each hour
    localStorage.setItem('refresh_token', data.refresh_token);
}
// function to get a code to exchange for an access token
async function RedirectToAuthCode(clientId, redirectUri) {
    const codeVerifier  = generateCodeVerifier(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    // this stores the verifier code for use in the get access token function
    localStorage.setItem("verifier", codeVerifier);
    // requests the code needed to get the access token
    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: "user-read-private user-read-email user-library-read playlist-read-private playlist-modify-private",
        redirect_uri: redirectUri,
        code_challenge_method: "S256",
        code_challenge: codeChallenge
    });

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
// generates a code
function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
// encrypts the code
async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};
// this function gets the users profile information to display
async function FetchProfile(profileCallBack, accessToken) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    // this saves the returned data
    const profile = await result.json();
    // this saves the profile information to use to dispalyt the users details
    profileCallBack(profile);
}

async function LogIn(accessCallback, profileCallBack, accessToken) {
    // checks to see if there is already an access token and if so returns it back
    if (accessToken) {
        return accessToken;
    } 
    // if there isn't already an access token this checks to seee if there is an authorisation code and if there is exchanges it for an access token
    if (code) {
        getAccessToken(accessCallback, profileCallBack, clientId, redirectUri, code);
    }
    // if there isn't an access token or authorisation code this will generate a code to be used in exchange for an access token
    if (!code) {
        RedirectToAuthCode(clientId, redirectUri);
    }
}

export default LogIn;