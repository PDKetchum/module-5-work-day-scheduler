var $today = $("#currentDay");
var $timeBlock = $("#body");

function displayDate() {
  var date = moment().format("dddd MMMM Do, YYYY");
  $today.text(date);
}

displayDate();

var date = moment().format("YYYY-DD-MM");

var businessHours = [
  { id: "9AM", time: moment(date + " 09") },
  { id: "10AM", time: moment(date + " 10") },
  { id: "11AM", time: moment(date + " 11") },
  { id: "12PM", time: moment(date + " 12") },
  { id: "1PM", time: moment(date + " 13") },
  { id: "2PM", time: moment(date + " 14") },
  { id: "3PM", time: moment(date + " 15") },
  { id: "4PM", time: moment(date + " 16") },
  { id: "5PM", time: moment(date + " 17") },
  { id: "6PM", time: moment(date + " 18") },
];

function printTimeblocks() {
  for (var i = 0; i < businessHours.length; i++) {
    var $timeblockRow = $("<tr>");

    $timeblockRow.attr("class", "");

    var $appointmentTime = $("<th>");

    $appointmentTime.text(businessHours[i].id);

    $appointmentTime.attr("class", "hour");

    var $appointmentEl = $("<td>");

    var $appointmentText = $("<textarea>");

    $appointmentText.attr("id", businessHours[i].id);

    $appointmentText.text(getSavedAppointments(businessHours[i].id));

    var $save = $("<td>");

    var $saveButton = $("<button>");

    $saveButton.attr("class", "saveBtn");

    $saveButton.attr("id", i);

    $saveButton.text("Save");

    $appointmentEl.append($appointmentText);

    $save.append($saveButton);

    $timeblockRow.append($appointmentTime, $appointmentEl, $save);

    $timeBlock.append($timeblockRow);

    $saveButton.on("click", saveAppointment);

    var businessTime = businessHours[i].time;

    styleTimeBlock(businessTime, $appointmentText);
  }
}

printTimeblocks();

function saveAppointment(event) {
  event.preventDefault();

  var buttonClicked = event.target;

  var buttonId = buttonClicked.id;

  var appointmentId = businessHours[buttonId].id;

  var $appointmentText = $(`#${appointmentId}`);

  var savedAppointment = $appointmentText.val();
  localStorage.setItem(businessHours[buttonId].id, savedAppointment);
}

function getSavedAppointments(key) {
  return localStorage.getItem(key);
}

function styleTimeBlock(businessTime, $appointmentText) {
  var currentTime = moment();

  if (businessTime.isBefore(currentTime, "hour")) {
    $appointmentText.attr("class", "past");
  } else if (businessTime.isAfter(currentTime, "hour")) {
    $appointmentText.attr("class", "future");
  } else {
    $appointmentText.attr("class", "present");
  }
}
