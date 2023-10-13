import { getEventData } from "./restAPI.js";

const searchEventButton = document.getElementById("searchEventButton");
const eventsBtn = document.querySelector("#eventsBtn");
const eventsModal = document.querySelector("#events-modal");
const eventsModalBg = document.querySelector("#events-modal-bg");

//function to handle event from event form, call getEventData request
const onSubmitEvent = (e) => {
  e.preventDefault();

  const queryParams = [];
  const valueOfArtistName = document
    .getElementById("valueOfArtistName")
    ?.value.trim();
  const genreSelect = document.getElementById("genreSelect")?.value;
  const usStates = document.getElementById("usStates")?.value;
  const valueOfEventType = document.querySelector("input[name='type']:checked");

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

  if (queryParams.length > 0) {
    getEventData(queryParams)
  }
};

searchEventButton?.addEventListener("click", onSubmitEvent);

// Event listeners for modal
eventsBtn?.addEventListener("click", () => {
  eventsModal.classList.add("is-active");
});

eventsModalBg?.addEventListener("click", () => {
  eventsModal.classList.remove("is-active");
});
