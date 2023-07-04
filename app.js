
let clientInput = ''
let ipAddress = `ipAddress=${clientInput}`;
const  IPDetailsAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=at_zasg65eURDRUyBQh10yIyNfak5lYu&${ipAddress}`
const mapDataAPI = "";

const showIP = document.querySelector('#ip-address-input');
const showLocation = document.querySelector('#location-input');
const showtimezone = document.querySelector('#timezone-input');
const showisp = document.querySelector('#isp-input');
const searchInput = document.querySelector('#search-Input');

async function getDetails () {
    const response = await fetch(IPDetailsAPI);
    const data = await response.json();
    const {ip,location, isp} = data;
    let region = location.region;
    let city = location.city;
    let postcode = location.postalCode;
    let time = location.timezone;
    showIP.innerText = ip;
    showLocation.innerText = `${region}, ${city} ${postcode}`;
    showtimezone.innerText = `UTC ${time}`;
    showisp.innerText = isp;

    console.log('show IP ',ip);
    console.log('timezone', location.timezone);
    console.log('timezone check var', time);
    console.log('service provider', isp);
}

function submitInput(event) {
    event.preventDefault();

    clientInput = searchInput.value;
    console.log('this should be updated now',clientInput);
    getDetails();
    document.getElementById("input-container").reset();
}

function resetVals() {
    region = '';
    city = '';
    postcode = '';
    time = '';
    isp = '';
}

resetVals();