import {catchArtistBioError} from "./utils.js"

const artistBioAPI_KEY = "982540db251e7848a4ddaec3f121f25d";

const errorMessage = document.getElementById("errorMessage");

const getArtistBio = async (name) => {
  try {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${artistBioAPI_KEY}&format=json`
    );

    const data = await response.json();
    catchArtistBioError(data);
    console.log(data);
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error(error.message);
  }
};



export { getArtistBio };