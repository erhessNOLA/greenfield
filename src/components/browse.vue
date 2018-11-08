<template>
  <div
    :id="mapName"
    class="google-map"
  />
</template>
<script>
import chat from './chatBox.vue';
import mapMarkerData from './marker.vue';

window.clickOne = () => {
  console.log('clicked 1');
};
window.clickTwo = () => {
  console.log('clicked 2');
};
window.clickThree = () => {
  console.log('clicked 3');
};
window.clickFour = () => {
  console.log('clicked 4');
};
window.clickFive = () => {
  console.log('clicked 5');
};
export default {
  name: 'google-map',
  components: {
    chat,
    mapMarkerData,
  },
  props: ['name'],
  data() {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: 29.9511,
        longitude: -90.0715
      }],
      map: null,
      bounds: null,
      markers: [],
    };
  },

  mounted() {
    const socket = io.connect('http://localhost:3000');
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName);
    const mapCentre = this.markerCoordinates[0];
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    };
    this.map = new google.maps.Map(element, options);
    const context = this;
    this.$http.get('/browse')
      .then((response) => {
        const arr = [];
        response.body.forEach((element) => {
          const tempLat = element.LocationLat;
          const tempLong = element.LocationLng;
          const eventInfo = element;
          arr.push({ latitude: tempLat, longitude: tempLong, event: eventInfo });
        });
        arr.forEach((coord) => {
          const position = new google.maps.LatLng(coord.latitude, coord.longitude);
          const contentString =
          '<div>' +
          '<h2>' + `${coord.event.Name}` + '</h2>' +
          '<p>' + 'Host: ' + `${coord.event.Host}` + '</p>' +
          '<p>' + 'Address: ' + `${coord.event.Address}` + '</p>' +
          '<button id="request" onclick="window.clickOne()">Give 1 Star</button>' +
          '<button id="request" onclick="window.clickTwo()">Give 2 Stars</button>' +
          '<button id="request" onclick="window.clickThree()">Give 3 Stars</button>' +
          '<button id="request" onclick="window.clickFour()">Give 4 Stars</button>' +
          '<button id="request" onclick="window.clickFive()">Give 5 Stars</button>' +
          '</div>';
          const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          const marker = new google.maps.Marker({
            position,
            map: this.map,
            event: coord.event,
          });
          marker.addListener('click', function() {
            console.log('clicked');
            infowindow.open(this.map, marker);
            const message = document.getElementById('request');
            message.addEventListener('click', () => {
              context.$http.post('/request', {
                name: marker.event.Name,
              }).then((response) => {
                socket.emit('request', {
                  eventName: marker.event.Name,
                });
                console.log(response);
              });
            });
          });
          this.markers.push(marker);
          this.map.fitBounds(this.bounds.extend(position));
        });
      });
  },
  methods: {
  },
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