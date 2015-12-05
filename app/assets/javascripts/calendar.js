var updateEvent;


$(document).ready(function() {
  var todayDate = new Date();
  todayDate.setHours(0,0,0,0);

  $('#calendar').fullCalendar({
    editable: false,
    slotEventOverlap: false,
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    columnFormat: {
      month: 'dddd',
      week: 'dddd D',
      day: 'ddd'
    },
    buttonText: {
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day'
    },
    minTime: "08:00:00",
    maxTime: "23:00:00",
    header: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    firstDay: 1,
    //this section is triggered when the event cell it's clicked
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
      var user_name;
      user_name = prompt("User name: ");
      var eventData;
      //this validates that the user must insert a name in the input
      if (user_name) {
        eventData = {
          title: "Reserved",
          start: start,
          end: end,
          user_name: user_name
        };
        //here i validate that the user can't create an event before today
        if (eventData.start < todayDate){
          alert('You can\'t choose a date that already past.');
          $("#calendar").fullCalendar("unselect");
          return
        }
        //if everything it's ok, then the event is saved in database with ajax
        $.ajax({
          url: "events",
          type: "POST",
          data: eventData,
          dataType: 'json',
          success: function(json) {
            alert(json.msg);
            $("#calendar").fullCalendar("renderEvent", eventData, true);
            $("#calendar").fullCalendar("refetchEvents");
          }
        });
      }
      $("#calendar").fullCalendar("unselect");
    },
    defaultView: 'agendaWeek',
    allDaySlot: false,
    height: 500,
    slotMinutes: 30,
    eventSources: [
      {
        url: '/events'
      }
    ],
    timeFormat: 'h:mm ',
    dragOpacity: "0.5"
  });
});


// $(document).ready(function() {
//    $("#calendar").fullCalendar({
//      header:
//      left: "prev,next today",
//      center: "title",
//      right: "month,agendaWeek,agendaDay"
//      defaultView: "month",
//      height: 500,
//      slotMinutes: 15,
//      events: "/dashboard/get_events",
//      timeFormat: "h:mm t{ - h:mm t} ",
//      dragOpacity: "0.5"
//   });
// });
