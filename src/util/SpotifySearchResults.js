// function to request songs based on the users search or randomly generated search parameters
async function SpotifySearchResults(resultsCallBack, searchTerm, offsetNumber, accessToken) {
    if (searchTerm) {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&market=GB&limit=10&offset=${offsetNumber}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}`}
          });
          // saves the returned data
          const results = await result.json();
          // saves the returned track data
          return resultsCallBack(results.tracks.items);
    } else {
        // if there is no search term it returns an empty array
        return resultsCallBack([]);
    }
}

export default SpotifySearchResults;