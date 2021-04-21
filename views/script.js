let map, options, userLocationMarker, user, socket, others = [], markers = [], icon;

user = getParameterByName('id');
socket = io();
icon = "./icons/motorcycle.png";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 7.9465, lng: 1.0232 },
    zoom: 15,
  });

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  userSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    fillColor: 'blue',
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 5,
  }

  userLocationMarker  = new google.maps.Marker({
    position: { lat: 7.9465, lng: 1.0232 },
    map: map,
    icon: userSymbol
  });

  

  //Location Found
  let success = (postion) =>{
    //console.log(postion);
    let coordinates = {
      lat: postion.coords.latitude,
      lng: postion.coords.longitude
    }
    map.setCenter(coordinates);

    userLocationMarker.setPosition(coordinates);
    userLocationMarker.setTitle('You');

    socket.emit('newLocation', {id: user, coordinates});
  }
  //Location Not Foound
  let error = (err) =>{
    console.log(err);
    alert('Unable to locate user');
  }

  //find user location
  if(navigator.geolocation){
    navigator.geolocation.watchPosition(success, error, options);
    
  }else{
    console.log('Unsupported browser');
  }

  //Add other user and update
  socket.on('updateLocation', (data)=>{
    for(let i = 0;i < data.users.length;i++){
      if(data.users[i] != user){
        if(!others.includes(data.users[i])){
          others.push(data.users[i]);
          let marker = new google.maps.Marker({
            position: data.database[i],
            map: map,
            icon: icon
          });
          markers.push(marker);
          console.log("Added", data.users[i]);
        }
      }
    }

    for(let i = 0; i < data.users.length;i++){
      let index = others.indexOf(data.users[i])
      if(index > -1){
        console.log(i, index);
        let marker = markers[index];
        marker.setPosition(data.database[i])
      }
      
    }

  });

  //Device orientation
//somecode from stackoverflow that does all the work
let heading;

setTimeout(()=> window.addEventListener('deviceorientation', handleOrientation, true), 3000);

const handleOrientation = (event) => {
    const out = document.getElementById('events');
    if(event.webkitCompassHeading) {
        // some devices don't understand "alpha" (especially IOS devices)
        heading = event.webkitCompassHeading;
    }
    else{
        heading = compassHeading(event.alpha, event.beta, event.gamma);
    }
    out.innerHTML = `Device: ${heading}`
};

const compassHeading = (alpha, beta, gamma) => {

    // Convert degrees to radians
    const alphaRad = alpha * (Math.PI / 180);
    const betaRad = beta * (Math.PI / 180);
    const gammaRad = gamma * (Math.PI / 180);

    // Calculate equation components
    const cA = Math.cos(alphaRad);
    const sA = Math.sin(alphaRad);
    const cB = Math.cos(betaRad);
    const sB = Math.sin(betaRad);
    const cG = Math.cos(gammaRad);
    const sG = Math.sin(gammaRad);

    // Calculate A, B, C rotation components
    const rA = - cA * sG - sA * sB * cG;
    const rB = - sA * sG + cA * sB * cG;
    const rC = - cB * cG;

    // Calculate compass heading
    let compassHeading = Math.atan(rA / rB);

    // Convert from half unit circle to whole unit circle
    if(rB < 0) {
        compassHeading += Math.PI;
    }else if(rA < 0) {
        compassHeading += 2 * Math.PI;
    }

    // Convert radians to degrees
    compassHeading *= 180 / Math.PI;

    return compassHeading;
};

}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

