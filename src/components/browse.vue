<template>
    <div class="google-map" :id="mapName">
    </div>
</template>
<script>
import chat from './chatBox.vue';
import mapMarkerData from './marker.vue';
import axios from 'axios';

// window.clickOne = (hostName) => {
//   console.log(hostName);
//   //  axios.post('/giveStar', {
//   //   stars: 1,
//   // })
//   // .then(function (response) {
//   //   console.log(response);
//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });
// }
window.clickTwo = () => {
   axios.post('/giveStar', {
    stars: 2,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
window.clickThree = () => {
   axios.post('/giveStar', {
    stars: 3,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
window.clickFour = () => {
   axios.post('/giveStar', {
    stars: 4,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
window.clickFive = () => {
   axios.post('/giveStar', {
    stars: 5,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default {
    components: {
        chat: chat,
        mapMarkerData: mapMarkerData,
    },
    name: 'google-map',
    props: ['name'],
    data: function() {
        return {
            mapName: this.name + "-map",
            markerCoordinates: [{
                latitude: 29.9511,
                longitude: -90.0715
            }],
            map: null,
            bounds: null,
            markers: [],
        }
    },
    methods:{
    },

    mounted: function() {
        const socket = io.connect('http://localhost:3000');
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName);
        const mapCentre = this.markerCoordinates[0];
        const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
        }
        this.map = new google.maps.Map(element, options);
        const context = this;

        this.$http.get('/browse')
            .then(function(response) {
                let arr = [];
                response.body.forEach(function(element) {
                    let tempLat = element.LocationLat;
                    let tempLong = element.LocationLng;
                    let eventInfo = element;
                    arr.push({ latitude: tempLat, longitude: tempLong, event: eventInfo })
                });
                arr.forEach((coord) => {
                    const position = new google.maps.LatLng(coord.latitude, coord.longitude);
                    // var contentString = 
                    // '<div>' +
                    //   '<h2>' + `${coord.event.Name}` + '</h2>' +
                    //   '<p>' + 'Host: ' + `${coord.event.Host}` + '</p>' +
                    //   '<p>' + 'Stars: ' + `${coord.event.Rating}` + '</p>' +
                    //   '<p>' + 'Address: ' + `${coord.event.Address}` + '</p>' +
                    //   '<button onclick="window.clickOne(`${coord.event.Host}`)">Give 1 Star</button>' + 
                    //   '<button onclick="window.clickTwo()">Give 2 Stars</button>' +
                    //   '<button onclick="window.clickThree()">Give 3 Stars</button>' +
                    //   '<button onclick="window.clickFour()">Give 4 Stars</button>' +
                    //   '<button onclick="window.clickFive()">Give 5 Stars</button>' +
                    // '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: " "
                    });
                    var marker = new google.maps.Marker({
                        position,
                        map: this.map,
                        event: coord.event,
                    });

                    marker.addListener('click', function() {

                      infowindow.setContent(
                      '<div>' +
                        '<h2>' + `${coord.event.Name}` + '</h2>' +
                        '<p>' + ' Host: ' + `${coord.event.Host}` + '</p>' +
                        '<p id="test">' + ' Stars: ' + `${coord.event.Rating}` + '</p>' +
                        '<p>' + 'Address: ' + `${coord.event.Address}` + '</p>' +
                        '<button onclick="window.clickOne()">Give 1 Star</button>' + 
                        '<button onclick="window.clickTwo()">Give 2 Stars</button>' +
                        '<button onclick="window.clickThree()">Give 3 Stars</button>' +
                        '<button onclick="window.clickFour()">Give 4 Stars</button>' +
                        '<button onclick="window.clickFive()">Give 5 Stars</button>' +
                      '</div>'
                      ); 

                      infowindow.open(this.map, marker); 
                      window.clickOne = () => {
                        console.log(marker.event.Host);
                        //  axios.post('/giveStar', {
                        //   stars: 1,
                        // })
                        // .then(function (response) {
                        //   console.log(response);
                        // })
                        // .catch(function (error) {
                        //   console.log(error);
                        // });
                      }
                    });
                    this.markers.push(marker)
                    this.map.fitBounds(this.bounds.extend(position))

                });
                


            })






    }
};
</script>
<style scoped>
.google-map {
    width: 800px;
    height: 600px;
    margin: 0 auto;
    background: gray;
}
</style>