let map, options, userLocationMarker;

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

    console.log(coordinates);
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

}