import { getArtistBio, getSearchArtist } from "./restAPI.js";

const artistBioSection = document.getElementById("artistBio");
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

const displayArtistBio = (data) => {
  console.log(data);
  artistBioSection.style.visibility = "visible";

  artistOnTour.textContent = `On tour: ${data.artist.ontour}`;
  artistPlayCount.textContent = `Play count: ${data.artist.stats.playcount}`;
  artistListeners.textContent = `Listeners: ${data.artist.stats.listeners}`;
  aboutTheArtistContent.textContent = data.artist.bio.content;
};

const displayArtistImgAndStatistic = (result) => {
  artistNameToDisplay.textContent = result.name;
  artistImg.src = result.picture_medium;
  nbOfAlbum.textContent = `${result.nb_album} albums`;
  nbOfFans.textContent = `${result.nb_fan} fans`;
};
const displayArtistPlaylists = (result) => {
  let lists = result.data;

  playlist.innerHTML = "";

  for (let i = 0; i < lists.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = lists[i].title;

    // Add an event listener to play the associated track when clicked
    listItem.addEventListener("click", () => {
      audioPlayer.src = lists[i].preview;
      audioPlayer.play();
    });

    playlist.appendChild(listItem);
  }
};

//function to handle event from artist bio form, call getArtistBio request
const onSubmitArtistBio = (e) => {
  console.log("onSubmitArtistBio");
  e.preventDefault();

  const name = bioSearchNameOfArtist.value.trim();
  console.log(name);

  if (name === "") {
    errorFeedback.textContent = "Please enter a valid name";
  } else {
    errorFeedback.textContent = "";
    getArtistBio(name);
    getSearchArtist(name);
  }
};

artistBioButton?.addEventListener("click", onSubmitArtistBio);

export {
  displayArtistBio,
  displayArtistPlaylists,
  displayArtistImgAndStatistic,
};
