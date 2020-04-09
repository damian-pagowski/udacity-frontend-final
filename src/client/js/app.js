async function getTrips() {
  const url = "http://localhost:3030/trip";
  const tripsDiv = document.getElementById("cards");
  tripsDiv.innerHTML = "";
  console.log("REQUEST URL: " + url);
  const trips = await fetch(url).then((response) => response.json());

  console.log("RESPONSE: " + trips);

  trips.forEach((trip) => {
    const tripCard = document.createElement("div");
    tripCard.innerHTML = createCard(trip);
    tripsDiv.appendChild(tripCard);
  });
}

function createCard(trip) {
  return `<div class="card flex-md-row mb-4 shadow-sm h-md-250">
        <img
        class="trip-image card-img-left "
        alt="Destination Image"
        style="max-width: 400px; max-height: 400px;"
        src="${trip.image}"
      />
        <div class="card-body d-flex flex-column align-items-start">
          <h3 class="mb-0">
            My Trip to: <span class="trip-destination">${trip.destination}</span>
          </h3>
          <h3 class="mb-0">
            Departing: <span class="departure">${trip.dateString}</span>
          </h3>
          <div class="my-3">
              <button class="btn btn-info remove-trip-btn" onclick="removeTrip(${trip.id})">Remove Trip</button>

          </div>
          <p class="card-text mb-auto">
            Paris, France is <strong><span class="days-remaining">${trip.daysRemaining}</span></strong> days away
          </p>
          <p class="card-text mb-auto">
            Typical weather for then:
            <div class="text-muted"> High: <span class="temp-high badge badge-warning">${trip.weather.max}&#8451;</span> Low: <span class="badge badge-primary temp-low">${trip.weather.min}&#8451;</span></div>
            <div class="text-muted weather-desc">${trip.weather.desc}
            </div>

          </p>
        </div>
       
      </div>`;
}

function removeTrip(id) {
  console.log("removing trip: " + id);
  const url = `http://localhost:3030/trip/${id}`;
  console.log("REQUEST URL: " + url);
  fetch(url, { method: "DELETE" }).then(() => getTrips());
}

async function createTrip() {
  const destination = document.getElementById("trip-location").value;
  const date = document.getElementById("trip-date").value;
  console.log("create trip clicked");
  const body = { date, destination };
  console.log("REQUEST BODY: " + JSON.stringify(body));
  const url = "http://localhost:3030/trip";
  console.log("REQUEST URL: " + url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date, destination }),
  }).then((response) => response.json());
  // log result
  console.log("RESPONSE: " + JSON.stringify(response));
  //close modal
  $("#addTripModal").modal("hide");
  // get trips from API and render
  getTrips();
}

$("#addTripModal").on("show.bs.modal", function (event) {
  console.log("showing modal");
});

getTrips();

export { createTrip, removeTrip, getTrips };
