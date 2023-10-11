
import {getArtistBio, getEventData} from "./restAPI.js"

var eventsBtn = document.querySelector("#eventsBtn");
var eventsModal = document.querySelector("#events-modal");
var eventsModalBg = document.querySelector("#events-modal-bg");

// Event listeners

eventsBtn.addEventListener("click", function(event) {
    eventsModal.classList.add("is-active");
});

eventsModalBg.addEventListener("click", function(event) {
    eventsModal.classList.remove("is-active");
});


const queryParams=["artistName=Drake"];


//getEventData(queryParams)
//getArtistBio("Drake");//here temporary, in use now for see data response in console
