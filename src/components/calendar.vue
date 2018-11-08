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
				@click-event="onClickEvent"
			>
				<calendar-view-header slot="header" slot-scope="t" :header-props="t.headerProps" @input="setShowDate" />
			</calendar-view>
		</div>
	</div>
</template>
<script>
// For testing against the published version
import {
	CalendarView,
	CalendarViewHeader,
	CalendarMathMixin,
} from "vue-simple-calendar"
// require("vue-simple-calendar/static/css/default.css")
// require("vue-simple-calendar/static/css/holidays-us.css")

// For live testing while making changes to the component, assumes repo pulled to sister folder
/*
import CalendarView from "../../vue-simple-calendar/src/components/CalendarView.vue"
import CalendarViewHeader from "../../vue-simple-calendar/src/components/CalendarViewHeader.vue"
import CalendarMathMixin from "../../vue-simple-calendar/src/components/CalendarMathMixin.js"
require("../../vue-simple-calendar/static/css/default.css")
require("../../vue-simple-calendar/static/css/holidays-us.css")
*/
import axios from 'axios';
export default {
	name: "App",
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
          
        },
      },
			showDate: this.thisMonth(1),
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
				"holiday-us-traditional": this.useHolidayTheme,
				"holiday-us-official": this.useHolidayTheme,
			}
		},
	},
	mounted() {
		this.newEventStartDate = this.isoYearMonthDay(this.today())
		this.newEventEndDate = this.isoYearMonthDay(this.today())
	},

	methods: {
    getEvents() {
      return axios.get('/events').then((eventList) => {
        return eventList.data.map((event, i) => {
        let newObj = {};
          newObj.id = eventList.data[i].id;
          newObj.startDate = eventList.data[i].Date;
          newObj.title = eventList.data[i].Name;
          newObj.host = eventList.data[i].Host;
          return newObj;
        })
      })
    },
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
		onClickEvent(e) {
			this.message = `You clicked: ${e.title}`
		},
		setShowDate(d) {
			this.message = `Changing calendar view to ${d.toLocaleDateString()}`
			this.showDate = d
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
	display: flex;
	flex-direction: row;
	font-family: Calibri, sans-serif;
	width: 95vw;
	min-width: 30rem;
	max-width: 50rem;
	min-height: 40rem;
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
.calendar .event.birthday {
	background-color: #e0f0e0;
	border-color: #d7e7d7;
}

.calendar .event.birthday::before {
	content: "\1F382";
	margin-right: 0.5em;
}
</style>
