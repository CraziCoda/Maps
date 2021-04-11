let socket = io();

//made a test user id variable for testing
let id = getParameterByName('id');

const platform = new H.service.Platform({
    'apikey': '06XnMczbOVeSgkXJUUu_LsV8o3DFvz--1oyZTINYsMA'
});
const maptypes = platform.createDefaultLayers();

let map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
        zoom: 12,
        center: {  lat: 5.544439792633057, lng: -0.19583000242710114 }
    });


let options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

let ui = new H.ui.UI.createDefault(map, maptypes, "en-US");
ui.getControl('zoom').setDisabled(false);
  
function success(pos) {
    let crd = pos.coords;
    let icon = new H.map.Icon('./icons/blue.png');
        crds = { lat: crd.latitude, lng: crd.longitude};
        marker = new H.map.Marker(crds, {icon: icon});

    map.addObject(marker);
    map.setCenter(crds);

    //sending new location to backend
    socket.emit('newLocation', {crds, id});
  }
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("Couldn't Connect \n check internet connectivity");
  }

let getLocation = () =>{
    navigator?.geolocation?.watchPosition(success, error, options);
}

getLocation();


//From StackOverFlow
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//Handling Socket events
socket.on('updateLocation', (data)=>{
    for(let i = 0;i < data.users.length;i++){
        if(data.users[i] == getParameterByName(id)) continue;
        let icon = new H.map.Icon('./icons/green.png');
        marker = new H.map.Marker(data.database[i], {icon: icon});
        map.addObject(marker);
    }
})