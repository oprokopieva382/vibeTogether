import { getEventData } from "./restAPI.js";

const searchEventButton = document.getElementById("searchEventButton");
const eventsBtn = document.querySelector("#eventsBtn");
const eventsModal = document.querySelector("#events-modal");
const eventsModalBg = document.querySelector("#events-modal-bg");
const preloader = document.getElementById("preloader");
const eventsContainer = document.getElementById("eventsContainer");
const eventDisplayContainer = document.getElementById("eventDisplayContainer");
const logoSection = document.getElementById("logoSection");
const eventTitle = document.getElementById("eventTitle");

// function to display searching event after getting response from getEventData
const displayEventData = (data) => {
  let resultList = data.events;
  logoSection.style.display = "none";
  eventDisplayContainer.style.display = "block";
  eventTitle.style.position = "relative";
  eventsContainer.innerHTML = "";

  for (let i = 0; i < resultList.length; i++) {
    let item = `
         <div class="card has-text-black mb-5">
            <div class="card-content is-flex is-justify-content-space-between is-align-items-center is-size-4 py-4">
                <p class="date is-flex"><img src="./assets/images/calendar-icon.png" alt="calendar icon">${
                  resultList[i].startDate.replace("T", " at ").endsWith(":00")
                    ? resultList[i].startDate.replace("T", " at ").slice(0, -3)
                    : resultList[i].startDate.replace("T", " at ")
                }</p>
                <p>${resultList[i].name}</p>
                <p>${resultList[i].location.name}</p>
            </div>
            <header class="card-header p-2 has-background-grey-lighter">${
              resultList[i].location.address.streetAddress
            }, ${resultList[i].location.address.addressLocality}</header>
          </div>
    `;
    eventsContainer.innerHTML += item;
  }
  eventsModal.classList.remove("is-active");
};

// small functions to manage preloader status
const showPreloader = () => {
  preloader.style.display = "flex";
};
const hidePreloader = () => {
  preloader.style.display = "none";
};

//function to handle event from event form, call getEventData request
const onSubmitEvent = (e) => {
  e.preventDefault();

  const queryParams = [];
  const valueOfArtistName = document
    .getElementById("valueOfArtistName")
    .value.trim();
  const genreSelect = document.getElementById("genreSelect").value;
  const usStates = document.getElementById("usStates").value;

  const selectedRadio = document.querySelector("input[name='type']:checked");
  const valueOfEventType = selectedRadio ? selectedRadio.value : "";
  
  if (valueOfArtistName) {
    queryParams.push(`artistName=${encodeURIComponent(valueOfArtistName)}`);
  }
  if (valueOfEventType) {
    queryParams.push(`eventType=${encodeURIComponent(valueOfEventType)}`);
  }
  if (genreSelect) {
    queryParams.push(`genreSlug=${encodeURIComponent(genreSelect)}`);
  }
  if (usStates) {
    queryParams.push(`geoStateIso=${encodeURIComponent(usStates)}`);
  }

  if (queryParams.length > 0) {
    showPreloader();
    getEventData(queryParams);
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

export { hidePreloader, displayEventData };