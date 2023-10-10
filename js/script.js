import { getArtistBio, getEventData } from "./restAPI.js";

const willUpdateFromInput = document.getElementById("willUpdateFromInput");
const willUpdateIdFormButton = document.getElementById(
  "willUpdateIdFormButton"
);
const willUpdateErrorForm = document.getElementById("willUpdateErrorForm");
const artistBioImg = document.getElementById("artistBioImg");
const artistNameToDisplay = document.getElementById("artistNameToDisplay");
const artistOnTour = document.getElementById("artistOnTour");
const artistPlayCount = document.getElementById("artistPlayCount");
const artistListeners = document.getElementById("artistListeners");
const aboutTheArtistContent = document.getElementById("aboutTheArtistContent");

//function to handle event from artist bio form, call getArtistBio request
const onSubmitArtistBio = (e) => {
  e.preventDefault();

  const name = willUpdateFromInput.value.trim();

  if (name === "") {
    willUpdateErrorForm.textContent = "Please enter a valid name";
  } else {
    willUpdateErrorForm.textContent = "";
    //getArtistBio(name)
  }
};

export const displayArtistBio = (data)=> {
  // !update with other api, existing hasn't real img
  //artistBioImg.src = data.artist.image[1]
  artistNameToDisplay.textContent = data.artist.name;
  artistOnTour.textContent = `On tour: ${data.artist.ontour}`;
  artistPlayCount.textContent = `Play count: ${data.artist.stats.playcount}`;
  artistListeners.textContent = `Listeners: ${data.artist.stats.listeners}`;
  // !discuss to pick either content or summary
  aboutTheArtistContent.textContent = data.artist.bio.summary;
}
const queryParams = ["artistName=Drake"];

willUpdateIdFormButton.addEventListener("click", onSubmitArtistBio);
//getEventData(queryParams)//here temporary, in use now for see data response in console
//getArtistBio("Drake");//here temporary, in use now for see data response in console
