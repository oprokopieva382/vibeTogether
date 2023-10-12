import { catchArtistBioError } from "./utils.js";
import {
  displayArtistBio,
  displayArtistPlaylists,
  displayArtistImgAndStatistic,
} from "./script.js";

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
    console.log(data);
    catchArtistBioError(data);
    displayArtistBio(data);
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error(error.message);
  }
};

// function to get event data information with all needed params
const baseURL = `https://www.jambase.com/jb-api/v1/events?apikey=${APIKEY}&geoCountryIso2=US`;
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
    // !wait for html to be ready to run this function
    //displayEventData(data);
  } catch (error) {
    console.error(error);
  }
};

//function request for artist, will be used in others function to display artist image by id, playlist and statistic
const getSearchArtist = async (name) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7177f9d24dmshc99e2055266d247p15bed2jsn7a7887510ed1",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayArtistPlaylists(result);
    const id = result.data[0].artist.id;
    getArtistImgAndStatistic(id);
    } catch (error) {
    console.error(error);
  }
};

//function request to get img of artist and statistic based on the id
const getArtistImgAndStatistic = async (id) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7177f9d24dmshc99e2055266d247p15bed2jsn7a7887510ed1",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    displayArtistImgAndStatistic(result);
  } catch (error) {
    console.error(error);
  }
};

// !temporary, wait for form to be ready
//getArtistBio("AC/DC")
//getSearchArtist("AC/DC");

export { getArtistBio, getEventData, getSearchArtist };
