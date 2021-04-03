let socket = io('ws://localhost:2000/');

//made a test user id variable for testing
let id = 'as20';

const platform = new H.service.Platform({
    'apikey': 'apikey-goes-here'
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
    
    socket.emit("location", {crds, timestamp: pos.timestamp, id: id});
    //console.log(pos);
  }
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

let getLocation = () =>{
    navigator?.geolocation?.watchPosition(success, error, options);
}

getLocation();


socket.on('update', (data)=>{
    for(let i = 0;i < data.length;i++){
        let crds = {lat: data[i].lat, lng: data[i].lng};
        let icon;
        if(data[i].receivers.includes(id)){
            icon = new H.map.Icon('./icons/green.png');
        }else{
            icon = new H.map.Icon('./icons/red.png');
        }
        console.log(crds);
        let marker = new H.map.Marker(crds, {icon: icon});

        map.addObject(marker);

    }
})