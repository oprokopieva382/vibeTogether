import {getArtistBio} from "./restAPI.js"


var eventsBtn = document.querySelector("#eventsBtn");
var eventsModal = document.querySelector("#events-modal");
var eventsModalBg = document.querySelector("#events-modal-bg");





//getArtistBio("Drake");//here temporary, in use now for see data response in console







// Event listeners

eventsBtn.addEventListener("click", function(event) {
    eventsModal.classList.add("is-active");
});

eventsModalBg.addEventListener("click", function(event) {
    eventsModal.classList.remove("is-active");
})