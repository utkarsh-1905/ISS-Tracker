// https://api.wheretheiss.at/v1/satellites/25544

const startStop = document.querySelector(".startStop");
const span = document.querySelector(".coordinates");

//Initializing Leaflet

var map = L.map("map", {
  center: [0, 0],
  noWrap: true,
  dragging: false,
  zoom: 1,
  maxZoom: 6,
  minZoom: 1,
  zoomControl: false,
  keyboard: false,
});

map.fitBounds([
  [-90, -180],
  [90, 180],
]); // dont know if this line works

//Adding ThunderForest Tile Layer

L.tileLayer(
  "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.jpg?apikey=3e4e3c1a08854a3eafaa7d75e14c6736",
  { foo: "bar" }
).addTo(map);

//Copied From Docs

const myIcon = L.icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
  iconSize: [49, 95],
  iconAnchor: [22, 94],
});

// false means api calling
//true means no api calling

let situation = false; // current sitaution of button

startStop.addEventListener("click", (e) => {
  //   console.log(situation);
  if (situation === false) {
    Window.tracking = setInterval(updateDisp, 3200);
    situation = true;
    startStop.innerText = "Stop Tracking";
    startStop.classList.remove("is-success");
    startStop.classList.add("is-danger");
  } else {
    clearInterval(Window.tracking);
    situation = false;
    startStop.innerText = "Start Tracking";
    startStop.classList.remove("is-danger");
    startStop.classList.add("is-success");
  }
});

async function tracker() {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const data = await res.json();
  return data;
}

function updateDisp() {
  tracker()
    .then((data) => {
      span.innerText = `Latitude is:  ${data.latitude} , Longitude is:  ${data.longitude}`;
      startStop.insertAdjacentElement("beforebegin", span);
      let x = data.latitude;
      let y = data.longitude;
      addMarker(x, y);
    })
    .catch((e) => {
      console.log(e);
    });
}

function addMarker(x, y) {
  let marker = L.marker([x, y], { icon: myIcon }).addTo(map);
  setTimeout(() => map.removeLayer(marker), 3100);
}
