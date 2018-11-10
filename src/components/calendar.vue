<template>
	<div id="calendar">
		<div class="calendar-parent">
			<calendar-view
				:events="events"
				:show-date="showDate"
				:time-format-options="{hour: 'numeric', minute:'2-digit'}"
				:enable-drag-drop="true"
				:disable-past="disablePast"
				:disable-future="disableFuture"
				:show-event-times="showEventTimes"
				:display-period-uom="displayPeriodUom"
				:display-period-count="displayPeriodCount"
				:starting-day-of-week="startingDayOfWeek"
				:class="themeClasses"
				:period-changed-callback="periodChanged"
				@click-date="onClickDay"
				@click-event="onClickEvent"
				class="cv-event"
				@click.stop="onClickEvent(e)"
			>
				<calendar-view-header slot="header" slot-scope="t" :header-props="t.headerProps" @input="setShowDate" />
			</calendar-view>
		</div>
	</div>
</template>
<script>

import CalendarView from "./CalendarView.vue"
import CalendarViewHeader from "./CalendarViewHeader.vue"
import CalendarMathMixin from "vue-simple-calendar/src/components/CalendarMathMixin.js"

import axios from 'axios';
export default {
	name: "Calendar",
	components: {
		CalendarView,
		CalendarViewHeader,
	},
	mixins: [CalendarMathMixin],
	data() {
		return {
      /* Show the current month, and give it some fake events to show */
      t: {
        headerProps: {
          periodLabel: this.monthNames(new Date().getMonth()) + ' ' + new Date().getFullYear(),
        },
      },
			showDate: this.thisMonth(1),
			message: "",
			startingDayOfWeek: 0,
			disablePast: false,
			disableFuture: false,
			displayPeriodUom: "month",
			displayPeriodCount: 1,
			showEventTimes: true,
			newEventTitle: "",
			newEventStartDate: "",
			newEventEndDate: "",
			useDefaultTheme: true,
			useHolidayTheme: true,
			events: this.getEvents(),
		}
	},
	computed: {
    userLocale() {
      return this.getDefaultBrowserLocale
		},
		dayNames() {
      return this.getFormattedWeekdayNames(this.userLocale, "long", 0)
		},
		themeClasses() {
      return {
        "theme-default": this.useDefaultTheme,
			}
		},
	},

	methods: {
    periodChanged(range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
			// you can listen for changes to the displayed range and react to them (by loading events, etc.)
			console.log(eventSource)
			console.log(range)
    },
    thisMonth(d, h, m) {
      const t = new Date()
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
    },
    onClickDay(d) {
      // this.message = `You clicked: ${d.toLocaleDateString()}`
    },
    onClickEvent(e) {
			this.message = `You clicked: ${e.title}`
			console.log(e);
			alert("Title: " + e.originalEvent.title + "\nDate: " + e.originalEvent.date + "\nTime: " + e.originalEvent.time + "\nAddress: " + e.originalEvent.address)
		},
    setShowDate(d) {
			// this.message = `Changing calendar view to ${d.toLocaleDateString()}`
			this.showDate = d
		},
    monthNames (num) {
      let names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return names[num];
    },
    getEvents() {
      axios.get('/events').then((eventList) => {
        let mappedList = eventList.data.map((event, i) => {
          let newObj = {};
          newObj.id = `e${eventList.data[i].id}`;
          newObj.startDate = eventList.data[i].Date;
          newObj.title = eventList.data[i].Name;
          newObj.address = eventList.data[i].Address;
          newObj.time = eventList.data[i].Time;
          newObj.host = eventList.data[i].Host;
          return (newObj);
        });
        this.events = mappedList;
      })
    },
	},
}
</script>

<style>
html,
body {
	height: 100%;
	margin: 0;
	background-color: #f7fcff;
}

#calendar {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 90vw;
		margin-left: auto;
		margin-right: auto;

}

.calendar-parent {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-x: hidden;
	overflow-y: hidden;
	max-height: 80vh;
	background-color: white;
}

/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
	min-height: 6rem;
}

/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */

/* Add some styling for events tagged with the "birthday" class */


</style>
