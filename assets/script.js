var $today = $("#currentDay");
var $timeBlock = $("#body");

// Grabs current date with moment.js and prints to HTML
function displayDate() {
  var date = moment().format("dddd MMMM Do, YYYY");
  $today.text(date);
}

displayDate();

var date = moment().format("YYYY-MM-DD");

// Business hours to list on page
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
  { id: "7PM", time: moment(date + " 19") },
  { id: "8PM", time: moment(date + " 20") },
  { id: "9PM", time: moment(date + " 21") },
  { id: "10PM", time: moment(date + " 22") },
];

// Add timeblock rows to HTML
function printTimeblocks() {
  for (var i = 0; i < businessHours.length; i++) {
    var $timeblockRow = $("<tr>");

    // Column for hour
    var $appointmentTime = $("<th>");
    $appointmentTime.text(businessHours[i].id);
    $appointmentTime.attr("class", "hour");

    // Column for appointment text
    var $appointmentEl = $("<td>");
    var $appointmentText = $("<textarea>");
    $appointmentText.attr("id", businessHours[i].id);
    $appointmentText.text(getSavedAppointments(businessHours[i].id));
    $appointmentEl.append($appointmentText);

    // Column for save button
    var $save = $("<td>");
    var $saveButton = $("<button>");
    $saveButton.attr("class", "saveBtn");
    $saveButton.attr("id", i);
    $saveButton.text("Save");
    $save.append($saveButton);
    $saveButton.on("click", saveAppointment);

    // Appending columns to row
    $timeblockRow.append($appointmentTime, $appointmentEl, $save);
    // Appending row to Table
    $timeBlock.append($timeblockRow);

    styleTimeblock(businessHours[i].time, $appointmentText);
  }
}

printTimeblocks();

// Event handler for clicking save button
// Saves text to local storage
function saveAppointment(event) {
  event.preventDefault();

  var buttonClicked = event.target;

  var buttonId = buttonClicked.id;

  var appointmentId = businessHours[buttonId].id;

  var $appointmentText = $(`#${appointmentId}`);

  var savedAppointment = $appointmentText.val();
  localStorage.setItem(businessHours[buttonId].id, savedAppointment);
}

// Retrieves any previously saved appointments from local storage to display on calender
function getSavedAppointments(key) {
  return localStorage.getItem(key);
}

// Styles timeblocks by comparing timeblock hour to current hour
function styleTimeblock(businessTime, $appointmentText) {
  var currentTime = moment();

  if (businessTime.isBefore(currentTime, "hour")) {
    $appointmentText.attr("class", "past");
  } else if (businessTime.isAfter(currentTime, "hour")) {
    $appointmentText.attr("class", "future");
  } else {
    $appointmentText.attr("class", "present");
  }
}
