let app = new Vue({
    "el": "#app",
    data: {
        input: {
            title: "",
            date: ""
        },
        tasks: [],
        dates: []
    },
    methods: {
        sortDates: function() {
            this.dates.sort((date1, date2) => {
                date1 = new Date(date1);
                date2 = new Date(date2);
                
                return date1.getDate() + date1.getMonth() < date2.getDate() + date2.getMonth();
            });
        },
        createTask: function(title, date) {

            if (!title || !date) {
                return;
            }

            this.tasks.push({ title: title, date: date});
            this.dates.push(date);    

            this.dates = _.uniq(this.dates);

            this.sortDates();     
        },
        deleteTask: function(task) {
            let filteredDates = _.filter(_.without(this.tasks, task), (element) => {
                return element.date == task.date;
            });

            if (_.isEmpty(filteredDates)) {
                this.deleteDate(task.date);
            }

            this.tasks = _.without(this.tasks, task);
        },
        deleteDate: function(date) {
            this.dates = _.without(this.dates, date);
        }
    },
    filters: {
        formatDate: function(date) {
            let monthNames = ["January", "February", "March",
                                "April", "May", "June",
                                "July", "August", "September",
                                "October", "November", "December"];
            let datePrepared = new Date(date);
            return `${datePrepared.getDate()} ${monthNames[datePrepared.getMonth()]}`;
        }
    }
});