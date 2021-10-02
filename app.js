// https://api.wheretheiss.at/v1/satellites/25544

const startStop = document.querySelector(".startStop");
const span = document.querySelector('.coordinates');

// false means api calling
//true means no api calling

let situation = false; // current sitaution of button

startStop.addEventListener("click", (e) => {
//   console.log(situation);
  if (situation === false) {
    Window.tracking = setInterval(updateDisp, 3500);
    situation = true;
    startStop.innerText = 'Stop Tracking';
    startStop.classList.remove('is-success');
    startStop.classList.add('is-danger');
  } else {
    clearInterval(Window.tracking);
    situation = false;
    startStop.innerText = 'Start Tracking';
    startStop.classList.remove('is-danger');
    startStop.classList.add('is-success');
  }
});

async function tracker() {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const data = await res.json();
  return data;
}

function updateDisp() {
    tracker().then((data)=>{
        span.innerText = `Latitude is:  ${data.latitude} , Longitude is:  ${data.longitude}`;
        startStop.insertAdjacentElement('beforebegin',span);
    })
}
