import { getArtistBio, getEventData } from "./restAPI.js";

const willUpdateFromInput = document.getElementById("willUpdateFromInput");
const willUpdateIdFormButton = document.getElementById(
  "willUpdateIdFormButton"
);
const willUpdateErrorForm = document.getElementById("willUpdateErrorForm");

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

const queryParams = ["artistName=Drake"];

willUpdateIdFormButton.addEventListener("click", onSubmitArtistBio);
//getEventData(queryParams)//here temporary, in use now for see data response in console
//getArtistBio("Drake");//here temporary, in use now for see data response in console
