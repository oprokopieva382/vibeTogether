import { getArtistBio, getSearchArtist } from "./restAPI.js";

const artistBioSection = document.getElementById("artistBio");
const topArtistsSection = document.getElementById("topArtistsSection");
const artistOnTour = document.getElementById("artistOnTour");
const artistPlayCount = document.getElementById("artistPlayCount");
const artistListeners = document.getElementById("artistListeners");
const aboutTheArtistContent = document.getElementById("aboutTheArtistContent");
const nbOfAlbum = document.getElementById("nbOfAlbum");
const nbOfFans = document.getElementById("nbOfFans");
const artistImg = document.getElementById("artistImg");
const artistNameToDisplay = document.getElementById("artistNameToDisplay");
const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const artistBioButton = document.getElementById("bioBtn");
const bioSearchNameOfArtist = document.getElementById("bioSearch");
const historyOfArtistSearch = document.getElementById("historyOfArtistSearch");

//function to display biography data from getArtistBio request
const displayArtistBio = (data) => {
  topArtistsSection.style.display = "none";
  artistBioSection.style.display = "flex";
  bioSearchNameOfArtist.value = "";

  artistOnTour.textContent = `On tour: ${data.artist.ontour}`;
  artistPlayCount.textContent = `Play count: ${data.artist.stats.playcount}`;
  artistListeners.textContent = `Listeners: ${data.artist.stats.listeners}`;
  aboutTheArtistContent.textContent = data.artist.bio.content;
};

//function to display img and statistic data from getArtistImgAndStatistic request
const displayArtistImgAndStatistic = (result) => {
  artistNameToDisplay.textContent = result.name;
  artistImg.src = result.picture_medium;
  nbOfAlbum.textContent = `${result.nb_album} albums`;
  nbOfFans.textContent = `${result.nb_fan} fans`;
};

//function to display playlist data from getSearchArtist request
const displayArtistPlaylists = (result) => {
  let lists = result.data;

  playlist.innerHTML = "";

  for (let i = 0; i < lists.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = lists[i].title;

    listItem.addEventListener("click", () => {
      audioPlayer.src = lists[i].preview;
      audioPlayer.play();
    });

    playlist.appendChild(listItem);
  }
};

//function to handle event from artist bio form, call getArtistBio request
const onSubmitArtistBio = (e) => {
  e.preventDefault();

  const name = bioSearchNameOfArtist.value.trim();
  const validation = /^[A-Za-z\s-]+$/;

  const errorMessage =
    name === ""
      ? "Please enter a valid name"
      : validation.test(name)
      ? ""
      : "Invalid characters in the artist name";

  errorFeedback.textContent = errorMessage;

  if (errorMessage === "") {
    getArtistBio(name);
    getSearchArtist(name);
    addSearchedArtist(name);
  }
};

//code below take care of artist search history
let searchedArtists = [];
searchedArtists = JSON.parse(localStorage.getItem("searchedArtists")) || [];

// Function to add an artist to the searched artists list
const addSearchedArtist = (artistName) => {
  // Check if the artist is not already in the list before adding
  if (
    !searchedArtists.includes(artistName) &&
    artistName !== "Taylor Swift" &&
    artistName !== "Ariana Grande" &&
    artistName !== "The Weekend"
  ) {
    searchedArtists.push(artistName);
     localStorage.setItem("searchedArtists", JSON.stringify(searchedArtists));
  }
};

const updateArtistSearchHistory = () => {
  // Loop through the searchedArtists array and create buttons for each artist
  searchedArtists.forEach((artistName) => {
    let button = document.createElement("button");
    button.textContent = artistName;
    button.classList.add(
      "top-artist-link",
      "text-center",
      "text-white",
      "mt-2",
      "text-2xl"
    );
    button.addEventListener("click", () => {
      // When a recent search button is clicked, perform a new search for that artist
      bioSearchNameOfArtist.value = artistName;
      onSubmitArtistBio(new Event("click")); // Trigger the search event
    });
    historyOfArtistSearch?.append(button);
  });
};

// Limit the number of recent searches (e.g., keep the last 5)
const maxRecentSearches = 10;
if (searchedArtists.length > maxRecentSearches) {
  searchedArtists.shift(); // Remove the oldest search
}

updateArtistSearchHistory();
artistBioButton?.addEventListener("click", onSubmitArtistBio);

export {
  displayArtistBio,
  displayArtistPlaylists,
  displayArtistImgAndStatistic,
};
