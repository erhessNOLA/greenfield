<template>
  <b-container>
    <b-row>
      <div id="discover">
        <div class="card-header">
          <a
            class="card-link"
            data-toggle="collapse"
            data-parent="#card-317479"
            href="#card-element-356590"
          >
            <h4>{{ events[0].discoverName }}</h4>
            <!-- {{ ' start time:' + event.start.local + ' end time:' + event.end.local }} -->
          </a>
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
              <!-- {{ event.description.text }} -->
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
const events = [];
export default {
  // props: ['events'],
  computed: {
  },
  mounted() {
    this.$http.get('/discover')
      .then((response) => {
        response.body.forEach((element, i) => {
          const eventObj = {
            discoverName: response.body[i].name.text,
            discoverDescript: response.body[i].description.text,
            discoverUrl: response.body[i].url,
            discoverTime: response.body[i].start.local,
            discoverLogo: response.body[i].logo.url,
          };
          events.push(eventObj);
        });
      }, (err) => {
        console.log(err, 'error');
      });
  }
};

</script>

