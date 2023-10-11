import { getArtistBio, getEventData } from "./restAPI.js";

const queryParams = ["artistName=Drake"];

//getArtistBio("Drake");//here temporary, in use now for see data response in console

getEventData(queryParams);
getArtistBio("Drake"); //here temporary, in use now for see data response in console
    