import moment from "web/static/js/third_party/moment";

export const Clock = {

    timezoneRegex: /-(GMT|)\d\d\d\d$/gi,

	getHumanTime: function(date) {
        var rawHour = date.getHours();
        var isPm = rawHour > 11;

        var hour = rawHour === 0 ? 12 : isPm && rawHour !== 12 ? rawHour - 12 : rawHour;
        var minutes = (date.getMinutes() + '0').slice(-2);
        var amPmString = isPm ? 'pm' : 'am';

        return hour + ':' + minutes + amPmString;
    },

    getTimeRange: function(start, end) {
        start = start || "";
        end   = end   || "";

        if (!start || !end) {
            return start + end
        }
        return start + " &ndash; " + end;
    }
}

export const Calendar = {
    getMonthShort: function(date) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
          "July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];
        var monthNum = date.getMonth();
        return monthNames[monthNum];
    },

    getDateFromTimestamp: function(dateString) {
        return moment(dateString).toDate()
    },
};