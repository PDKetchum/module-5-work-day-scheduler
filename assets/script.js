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

    var $appointmentTime = $("<th>");

    $appointmentTime.text(businessHours[i]);

    var $appointmentEl = $("<td>");

    $appointmentEl.text("");

    var $appointmentText = $("<textarea>");

    $appointmentText.attr("id", businessHours[i]);

    var $save = $("<td>");

    var $saveButton = $("<button>");

    $saveButton.text("Save");

    $appointmentEl.append($appointmentText);

    $save.append($saveButton);

    $timeblockRow.append($appointmentTime, $appointmentEl, $save);

    $timeBlock.append($timeblockRow);
  }
}

printTimeblocks();
