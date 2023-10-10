import {catchArtistBioError} from "./utils.js"
import { displayArtistBio } from "./script.js";

const artistBioAPI_KEY = "982540db251e7848a4ddaec3f121f25d";
const APIKEY = "5167d0f0-49ab-41dd-bc99-43a9e6a07081";

const errorMessage = document.getElementById("errorMessage");

// function to get Artist Bio information
const getArtistBio = async (name) => {
  try {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${artistBioAPI_KEY}&format=json`
    );

    const data = await response.json();
    console.log(data)
    catchArtistBioError(data);
    displayArtistBio(data)
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error(error.message);
  }
};


// function to get event data information with all needed params
const baseURL = `https://www.jambase.com/jb-api/v1/events?apikey=${APIKEY}`;
const options = {
  method: "GET",
  headers: { Accept: "application/json" },
};

const getEventData = async (queryParams) => {
  const url = `${baseURL}&${queryParams.join("&")}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

getArtistBio("Drake")

export { getArtistBio, getEventData };