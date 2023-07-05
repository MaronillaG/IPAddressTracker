
let clientInput = ''
const mapDataAPI = "";

const showIP = document.querySelector('#ip-address-input');
const showLocation = document.querySelector('#location-input');
const showtimezone = document.querySelector('#timezone-input');
const showisp = document.querySelector('#isp-input');
const searchInput = document.querySelector('#search-Input');

let lat = 0;
let long = 0;


function submitInput(event) {
    event.preventDefault();
    
    clientInput = searchInput.value;
    let ipAddress = `ipAddress=${clientInput}`;
    console.log('this should be updated now',ipAddress);
    const  IPDetailsAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=at_zasg65eURDRUyBQh10yIyNfak5lYu&${ipAddress}`
    getDetails(IPDetailsAPI);
    document.getElementById("input-container").reset();
}

async function getDetails(IPDetailsAPI) {
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

    lat = location.lat;
    long = location.lng;
    
    console.log('show IP ',ip);
    console.log('timezone', location.timezone);
    console.log('timezone check var', time);
    console.log('service provider', isp);
    console.log('lat + long', lat, long);
}



function resetVals() {
    region = '';
    city = '';
    postcode = '';
    time = '';
    isp = '';
}

resetVals();

let coordinates = [lat, long]
const map = L.map('map').setView(coordinates, 14);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution} );

tiles.addTo(map);

const marker = L.marker(coordinates).addTo(map);




// function that requests the user's IPv4 address to be used with map info
async function firstIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    console.log('user\'s IP on first load', data.ip);
    return data.ip
}


    
// console.log(default);