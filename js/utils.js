let error = document.getElementById("eventError")
const errorMessage = document.getElementById("errorFeedback");
const catchArtistBioError = (data) => {
  if (data.error) {
    errorMessage.textContent = data.message;
  }
};

const catchEventDataError = (data) => {
  if (!data.events.length) {
    error.textContent =
      "Looks like your artist do not have upcoming events or check if you type name right";
  } else {
    error.textContent = "";
  }
};

export { catchArtistBioError, catchEventDataError };