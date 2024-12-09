document.getElementById("fetchButton").addEventListener("click", async () => {
    const mood = document.getElementById("moodInput").value.trim();
    const songsList = document.getElementById("songsList");
  
    // Clear previous results
    songsList.innerHTML = "";
  
    if (!mood) {
      songsList.innerHTML = "<p>Please enter a mood.</p>";
      return;
    }
  
    try {
      const response = await fetch(`https://song-mood.onrender.com/songs/${mood}`);
      if (!response.ok) throw new Error("Failed to fetch songs");
      const data = await response.json();
  
      const playlists = data.playlists?.items || [];
      if (playlists.length === 0) {
        songsList.innerHTML = "<p>No songs found for this mood.</p>";
        return;
      }
  
      playlists.forEach((playlist) => {
        const songItem = document.createElement("div");
        songItem.innerHTML = `
          <p>
            <a href="${playlist.external_urls.spotify}" target="_blank">
              ${playlist.name}
            </a>
          </p>
        `;
        songsList.appendChild(songItem);
      });
    } catch (error) {
      console.error(error);
      songsList.innerHTML = "<p>Error fetching songs. Try again later.</p>";
    }
  });
  