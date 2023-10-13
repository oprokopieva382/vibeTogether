const eventsContainer = document.getElementById("eventsContainer");
console.log(eventsContainer);

const displayEventData = (data) => {
  let resultList = data.events;
  eventsContainer.innerHTML = "";

  for (let i = 0; i < resultList.length; i++) {
    let item = `
         <div class="card has-text-black mb-5">
            <div class="card-content is-flex is-justify-content-space-between is-align-items-center is-size-4 py-4">
                <p class="date is-flex"><img src="../assets/images/calendar-icon.png" alt="calendar icon">${resultList[i].startDate}</p>
                <p>${resultList[i].name}</p>
                <p>${resultList[i].location.name}</p>
            </div>
            <header class="card-header p-2 has-background-grey-lighter">${resultList[i].location.address.streetAddress}, ${resultList[i].location.address.addressLocality}</header>
          </div>
    `;
   eventsContainer.innerHTML += item;
  }

};

export { displayEventData };