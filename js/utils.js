//let error = document.getElementById("eventError")
const catchArtistBioError = (data) => {
  if (data.error) {
    throw new Error(data.message);
  }
};

const catchEventDataError = (data) => {
  if (!data.events.length) {
    error.textContent = "Looks like your artist do not have upcoming events or check if you type name right"
  } else {
    error.textContent = ""
  }
};

export { catchArtistBioError, catchEventDataError };
