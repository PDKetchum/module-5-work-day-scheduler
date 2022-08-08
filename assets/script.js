var $today = $("#currentDay");
var $timeBlock = $("#body");

function displayDate() {
  var date = moment().format("dddd MMMM Do, YYYY");
  $today.text(date);
}

displayDate();

var businessHours = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
];

function printTimeblocks() {
  for (var i = 0; i < businessHours.length; i++) {
    var $timeblockRow = $("<tr>");

    $timeblockRow.attr("class", "");

    var $appointmentTime = $("<th>");

    $appointmentTime.text(businessHours[i]);

    $appointmentTime.attr("class", "hour");

    var $appointmentEl = $("<td>");

    var $appointmentText = $("<textarea>");

    $appointmentText.attr("id", businessHours[i]);

    $appointmentText.text(getSavedAppointments(businessHours[i]));

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

    getSavedAppointments();
  }
}

printTimeblocks();

function saveAppointment(event) {
  event.preventDefault();

  var buttonClicked = event.target;

  var buttonId = buttonClicked.id;

  var appointmentId = businessHours[buttonId];

  var $appointmentText = $(`#${appointmentId}`);

  console.log($appointmentText);

  var savedAppointment = $appointmentText.val();
  localStorage.setItem(businessHours[buttonId], savedAppointment);
}

function getSavedAppointments(key) {
  return localStorage.getItem(key);
}

function currentTimeblock() {
 var currentTime = moment().format("h")
 if ()
}