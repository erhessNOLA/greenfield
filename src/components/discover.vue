<template>
  <b-container>
    <b-row>
      <div id="discover">
        <div class="card-header">
          <h4>{{ eventbrite[0].discoverName }}</h4>
          {{ 'Starts: ' + eventbrite[0].discoverTime }}
        </div>
        <div
          id="card-element-356590"
          class="collapse"
        >
          <div class="card-body row text-center">
            <div
              id="event-image-box"
              class="col-md-6"
            >
              <!-- <img :src="event.logo.url"> -->
            </div>
            <div
              id="event-description-box"
              class="col-md-6"
            >
              <h5> Event description </h5>
              {{ eventbrite[0].discoverDescript }}
            </div>
            <div class="col-md-6 event-links">
              <button
                class="btn btn-outline-light"
                target="_blank"
              >
                <h4>Event website</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      test: 'testing',
      eventbrite: [],
    };
  },
  mounted() {
    this.$http.get('/discover')
      .then((response) => {
        response.body.forEach((element, i) => {
          const eventObj = {
            discoverName: response.body[i].name.text,
            discoverDescript: response.body[i].description.text,
            discoverUrl: response.body[i].url,
            discoverTime: response.body[i].start.local.slice(0, -9),
          };
          this.eventbrite.push(eventObj);
        });
        // console.log(response.body.logo);
      }, (err) => {
        console.log(err, 'error');
      });
  },
};

</script>

