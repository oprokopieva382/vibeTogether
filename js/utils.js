let error = document.getElementById("eventMessageError");

const errorMessage = document.getElementById("errorFeedback");
const catchArtistBioError = (data) => {
  if (data.error) {
    errorMessage.textContent = data.message;
  }
};

const catchEventDataError = (data) => {
  if (data.events && data.events.length == 0) {
    error.classList.add("has-text-danger");
    error.textContent =
      "Looks like your artist do not have upcoming events or check if you type name right";
  } else {
     error.classList.remove("has-text-danger");
    error.textContent = "Looking for somewhere to vibe at?";
  }
};

const catchBadResponseStatus =(res)=> {
if(res.status !== 200) {
   throw new Error(`Failed to fetch data. Status: ${response.status}`);
}
}

export { catchArtistBioError, catchEventDataError, catchBadResponseStatus };