<template>
  <div id="calendar">
		<h1>Potlucks Calendar</h1>
    <calendar-view :show-date="myShowDate">
	    <calendar-view-header slot="header" slot-scope="{ headerProps }" :header-props="headerProps" 
      <!-- @input="setMyShowDate"  -->
      />
    </calendar-view>
	</div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
	// The next two lines are processed by webpack. If you're using the component without webpack compilation,
	// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.x
	// require("vue-simple-calendar/static/css/default.css")
	// require("vue-simple-calendar/static/css/holidays-us.css")

	export default {
		name: 'calendar',
		data: function() {
			return { showDate: new Date() }
		},
		components: {
			CalendarView,
			CalendarViewHeader,
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
		}
	}
</script>

<style>
  #calendar {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 90vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>