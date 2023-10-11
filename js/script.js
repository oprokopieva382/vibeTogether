import { getArtistBio, getEventData, getSearchArtist } from "./restAPI.js";

const willUpdateFromInput = document.getElementById("willUpdateFromInput");
const willUpdateIdFormButton = document.getElementById(
  "willUpdateIdFormButton"
);
const willUpdateErrorForm = document.getElementById("willUpdateErrorForm");
const artistImg = document.getElementById("artistImg");
const artistNameToDisplay = document.getElementById("artistNameToDisplay");
const artistOnTour = document.getElementById("artistOnTour");
const artistPlayCount = document.getElementById("artistPlayCount");
const artistListeners = document.getElementById("artistListeners");
const aboutTheArtistContent = document.getElementById("aboutTheArtistContent");
const nbOfAlbum = document.getElementById("nbOfAlbum");
const nbOfFans = document.getElementById("nbOfFans");
const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");

//function to handle event from artist bio form, call getArtistBio request
const onSubmitArtistBio = (e) => {
  e.preventDefault();

  const name = willUpdateFromInput.value.trim();

  if (name === "") {
    willUpdateErrorForm.textContent = "Please enter a valid name";
  } else {
    willUpdateErrorForm.textContent = "";
    //getArtistBio(name)
    //getSearchArtist(name)
  }
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

const displayArtistBio = (data)=> {
  artistOnTour.textContent = `On tour: ${data.artist.ontour}`;
  artistPlayCount.textContent = `Play count: ${data.artist.stats.playcount}`;
  artistListeners.textContent = `Listeners: ${data.artist.stats.listeners}`;
  // !discuss to pick either content or summary
  aboutTheArtistContent.textContent = data.artist.bio.content;
//   aboutTheArtistContent.textContent = data.artist.bio.summary;
}
const queryParams = ["artistName=Drake"];

//willUpdateIdFormButton.addEventListener("click", onSubmitArtistBio);

//!here temporary, in use now for see data response in console
//getEventData(queryParams)
//getArtistBio("Drake");

export {
  displayArtistBio,
  displayArtistPlaylists,
  displayArtistImgAndStatistic,
};