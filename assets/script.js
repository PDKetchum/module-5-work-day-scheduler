var $today = $("#currentDay");
var $timeBlock = $("#body");

function displayDate() {
  var date = moment().format("dddd MMMM Do, YYYY");
  $today.text(date);
}

displayDate();

var businessHours = [
  { id: "9AM", time: moment("09", "HH") },
  { id: "10AM", time: moment("10", "HH") },
  { id: "11AM", time: moment("11", "HH") },
  { id: "12PM", time: moment("12", "HH") },
  { id: "1PM", time: moment("13", "HH") },
  { id: "2PM", time: moment("14", "HH") },
  { id: "3PM", time: moment("15", "HH") },
  { id: "4PM", time: moment("16", "HH") },
  { id: "5PM", time: moment("17", "HH") },
];

console.log(businessHours);

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

    getSavedAppointments();
    currentTimeblock();
  }
}

printTimeblocks();

function saveAppointment(event) {
  event.preventDefault();

  var buttonClicked = event.target;

  var buttonId = buttonClicked.id;

  var appointmentId = businessHours[buttonId].id;

  var $appointmentText = $(`#${appointmentId}`);

  console.log($appointmentText);

  var savedAppointment = $appointmentText.val();
  localStorage.setItem(businessHours[buttonId].id, savedAppointment);
}

function getSavedAppointments(key) {
  return localStorage.getItem(key);
}

function currentTimeblock() {
  var currentTime = moment().format("HH");

  for (var i = 0; i < businessHours.length; i++) {
    var appointmentId = businessHours[i].id;

    var $appointmentText = $(`#${appointmentId}`);

    if (currentTime === businessHours[i].time) {
      $appointmentText.attr("class", "present");
    } else if (currentTime < businessHours[i].time) {
      $appointmentText.attr("class", "past");
    } else if (currentTime > businessHours[i].time) {
      $appointmentText.attr("class", "future");
    }
  }
}
