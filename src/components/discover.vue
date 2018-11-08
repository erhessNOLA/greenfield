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
            <!-- <h4>{{ event.name.text }}</h4>
            {{ ' start time:' + event.start.local + ' end time:' + event.end.local }} -->
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
export default {
  // props: ['event'],
  computed: {
  },
  methods: {
  },
};
</script>

