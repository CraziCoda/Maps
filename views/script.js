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

  userLocationMarker  = new google.maps.Marker({
    position: { lat: 7.9465, lng: 1.0232 },
    map: map
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

    /* for(let i = 0;i < data.users.length;i++){
      //Search for others
      if(others.includes(data.users[i])){
        //Hmmm
        let marker = markers[i];
        console.log(marker, i);
        console.log(marker.getPosition());
        marker.setPosition(data.database[i]);

      }else{
        //Add new data
        others.push(data.users[i]);
        let marker = new google.maps.Marker({
          position: data.database[i],
          map: map,
          icon: icon
        });
        markers.push(marker);
        console.log("Added");
      }
    } */

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

}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//Device orientation
window.addEventListener('deviceorientation', handleorientation, false);

function handleorientation(event){
  let absolute = event.absolute;
  let alpha    = event.alpha;
  let beta     = event.beta;
  let gamma    = event.gamma;

  alert(absolute+" "+alpha+" "+beta+" "+gamma);
}