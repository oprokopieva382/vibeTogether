import { getArtistBio, getEventData, getSearchArtist } from "./restAPI.js";

const home = document.getElementById("home");
console.log(home)
const bioSearchNameOfArtist = document.getElementById("bioSearch");
console.log(bioSearchNameOfArtist);
const artistBioButton = document.getElementById("bioBtn");
console.log(artistBioButton);
const searchEventButton = document.getElementById("searchEventButton");
const willUpdateArtistTitleFromDefaultBioPage = document.getElementById(
  "willUpdateArtistTitleFromDefaultBioPage"
);
const topArtist = document.getElementById("topArtist");

const errorFeedback = document.getElementById("errorFeedback");
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
const artistBioBtn = document.getElementById("artistBioBtn");
console.log(artistBioBtn);

const eventsBtn = document.querySelector("#eventsBtn");
const eventsModal = document.querySelector("#events-modal");
const eventsModalBg = document.querySelector("#events-modal-bg");

const openArtistBioSearchDefaultPage = () => {
  document.location.replace("../routes/bio.html");
};

const homePageRedirect = () => {
  document.location.replace("../index.html");
};

const showDefaultTopArtist = () => {
  const name = willUpdateArtistTitleFromDefaultBioPage.textContent;
  //getArtistBio(name)
  //getSearchArtist(name)
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

const displayArtistBio = (data) => {
  artistOnTour.textContent = `On tour: ${data.artist.ontour}`;
  artistPlayCount.textContent = `Play count: ${data.artist.stats.playcount}`;
  artistListeners.textContent = `Listeners: ${data.artist.stats.listeners}`;
  aboutTheArtistContent.textContent = data.artist.bio.content;
};

//function to handle event from artist bio form, call getArtistBio request
const onSubmitArtistBio = (e) => {
  e.preventDefault();

  const name = bioSearchNameOfArtist.value.trim();

  if (name === "") {
    errorFeedback.textContent = "Please enter a valid name";
  } else {
    errorFeedback.textContent = "";
    //getArtistBio(name)
    //getSearchArtist(name)
  }
};

//function to handle event from event form, call getEventData request
const onSubmitEvent = (e) => {
  e.preventDefault();

  const valueOfArtistName = document
    .getElementById("valueOfArtistName")
    .value.trim();
  const genreSelect = document.getElementById("genreSelect").value;
  const usStates = document.getElementById("usStates").value;
  const valueOfEventType = document.querySelector("input[name='type']:checked");

  const queryParams = [];

  if (valueOfArtistName) {
    queryParams.push(`artistName=${encodeURIComponent(valueOfArtistName)}`);
  }
  if (valueOfEventType) {
    queryParams.push(`eventType=${encodeURIComponent(valueOfEventType.value)}`);
  }
  if (genreSelect) {
    queryParams.push(`genreSlug=${encodeURIComponent(genreSelect)}`);
  }
  if (usStates) {
    queryParams.push(`geoStateIso=${encodeURIComponent(usStates)}`);
  }

  getEventData(queryParams);
};

artistBioBtn.addEventListener("click", openArtistBioSearchDefaultPage);
// Event listeners for modal
eventsBtn.addEventListener("click", () => {
  eventsModal.classList.add("is-active");
});

eventsModalBg.addEventListener("click", () => {
  eventsModal.classList.remove("is-active");
});

//willUpdateArtistTitleFromDefaultBioPage.onclick = showDefaultTopArtist;
artistBioButton.addEventListener("click", onSubmitArtistBio);
searchEventButton.addEventListener("click", onSubmitEvent);
home.addEventListener("click", homePageRedirect);

export {
  displayArtistBio,
  displayArtistPlaylists,
  displayArtistImgAndStatistic,
};
