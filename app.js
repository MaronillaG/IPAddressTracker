let clientInput = "";
let map;
let lat = 0;
let long = 0;
const mapDataAPI = "";
const searchInput = document.querySelector('#search-Input');


let ipAddress = userIP(); // generates user IP on first load
let workingKey = 'at_qtHPZ2eEtlEEEfFcPOe3ypzq4jAji';
let oldKey = 'at_zasg65eURDRUyBQh10yIyNfak5lYu'
let  IPDetailsAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=${workingKey}&${ipAddress}` //generates url link.
getDetails(IPDetailsAPI); //populates table at the start.

// resetVals();





// function is activated when the submit button is pressed.
function submitInput(event) {
    event.preventDefault();
    
    if(map) {
        map.remove();
    }
    
    clientInput = searchInput.value; //taking the user's search value and updating ipAddress variable that is used to populate the GET request.
    let regex = /.[a-z]+/ig;
    ipAddress = regex.test(clientInput)? `domain=${clientInput}` : ipAddress = `ipAddress=${clientInput}`;

    IPDetailsAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=${workingKey}&${ipAddress}`;
    getDetails(IPDetailsAPI);
    console.log('this should be updated now',ipAddress);
    document.getElementById("input-container").reset();
}

async function getDetails(APIurl) {
    const showIP = document.querySelector('#ip-address-input');
    const showLocation = document.querySelector('#location-input');
    const showtimezone = document.querySelector('#timezone-input');
    const showisp = document.querySelector('#isp-input');
    
    const response = await fetch(APIurl);
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

    // map is loaded from start but with userIP via coordinates variable.
    let coordinates = [lat, long]
    map = L.map('map', {
        zoomControl: false,
        })
        .setView(coordinates, 14);
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {attribution} );

    tiles.addTo(map);
    
    const pin = L.icon({
        iconUrl:'https://MaronillaG.github.io/IPAddressTracker/images/icon-location.svg',
        iconSize: [38, 50]
    })
    const marker = L.marker(coordinates, {icon: pin}).addTo(map); // adding custom pin to map.

}




function resetVals() {
    region = '';
    city = '';
    postcode = '';
    time = '';
    isp = '';
}

    
// when the page is loaded the screen shows the user's IP information and also must load the map details
    // so populate the table
    // so populate the map
        // generate userIP
        // generate fetch url to populate table
        // populate the table
        // once the table data is populated feed the co-ordinates to the map      

        // function that requests the user's IPv4 address to be used with map info

async function userIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    console.log('user\'s IP on first load', data.ip);
    return data.ip
}
