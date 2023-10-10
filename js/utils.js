const catchArtistBioError = (data) => {
  if (data.error) {
    throw new Error(data.message);
  }
};

export { catchArtistBioError };