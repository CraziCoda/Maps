let socket = io('ws://localhost:2000/');

//made a test user id variable for testing
let id = 'as20';

const platform = new H.service.Platform({
    'apikey': '06XnMczbOVeSgkXJUUu_LsV8o3DFvz--1oyZTINYsMA'
});
const maptypes = platform.createDefaultLayers();
let map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
        zoom: 12,
        center: { lng: -0.19583000242710114, lat: 5.544439792633057 }
    });


let options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  
function success(pos) {
    let crd = pos.coords;
    let icon = new H.map.Icon('./icons/blue.png');
        crds = { lat: crd.latitude, lng: crd.longitude};
        marker = new H.map.Marker(crds, {icon: icon});

    map.addObject(marker);
    map.setCenter(crds);

    console.log(pos);
    
  }
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

let getLocation = () =>{
    navigator?.geolocation?.watchPosition(success, error, options);
}

getLocation();