// List of variables being used

var el = document.getElementById("name_list");
var names = [];
var dates = [];

ListAll();
Close();

// Function to get our affected product(s)

let getProducts = () => {
  var selected = [];

  for (var option of document.getElementById("products").options) {
    if (option.selected) {
      selected.push(option.value);
    }
  }

  return selected;
};

// Function to format our date in MM/DD/YYYY

let convertToDateUTC = (dateString) => {
  let date = new Date(Date.parse(dateString.replace("UTC", "Z")));
  let year = date.getUTCFullYear();
  let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);
  return `${month}/${day}/${year}`;
};

// Function to convert our date in MM/DD

let convertToDateNoYear = (dateString) => {
  let date = new Date(Date.parse(dateString.replace("UTC", "Z")));
  //let year = date.getUTCFullYear();
  let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);
  return `${month}/${day}`;
};

// Function to extract the time in HH:MM

let extractTime = (dateString) => {
  let date = new Date(Date.parse(dateString.replace("UTC", "Z")));
  let hours = ("0" + date.getUTCHours()).slice(-2);
  let minutes = ("0" + date.getUTCMinutes()).slice(-2);
  return `${hours}:${minutes}`;
};

// Function to convert our dates tu UTC
/*
let convertToUTC = (date) => {
  date = new Date(date);

  let utcDate = new Date(date.toUTCString());

  return utcDate.toLocaleString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZoneName: "short",
  });
};*/

// This will return the time in a 24hrs format converting the input to UTC as well.

let convertToUTCTimeOnly = (date) => {
  date = new Date(date);

  let utcDate = new Date(date.toUTCString());

  let hours = utcDate.getUTCHours().toString().padStart(2, "0");
  let minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

let convertToUTCTimeOrTimeWithDate = (date) => {
  const currentDate = new Date();
  const inputDate = new Date(date);

  const currentUTCDate = new Date(currentDate.toUTCString());
  const inputUTCDate = new Date(inputDate.toUTCString());

  const currentDateString = currentUTCDate.toISOString().slice(0, 10);
  const inputDateString = inputUTCDate.toISOString().slice(0, 10);

  let hours = inputUTCDate.getUTCHours().toString().padStart(2, "0");
  let minutes = inputUTCDate.getUTCMinutes().toString().padStart(2, "0");

  if (currentDateString === inputDateString) {
    return `${hours}:${minutes}`;
  } else {
    let month = inputUTCDate.getUTCMonth() + 1;
    let day = inputUTCDate.getUTCDate();
    let year = inputUTCDate.getUTCFullYear();

    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}, ${hours}:${minutes}`;
  }
};

// Create Word document

function Export2Word(filename, myText) {
  //var preHtml = "<html><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  //var postHtml = "</body></html>";
  var html = myText;

  // Specify file name
  filename = filename ? filename + ".doc" : "document.doc";

  var link = document.createElement("a");
  link.href =
    "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," +
    window.btoa(html);
  link.download = filename;
  link.click();
}

//This will return the time in 24-hour format (hh:mm) along with the date in the desired format (mm/dd):
// hh:mm (mm/dd)

let convertToUTCTimeAndDate = (date) => {
  date = new Date(date);

  let utcDate = new Date(date.toUTCString());

  let month = utcDate.getUTCMonth() + 1;
  let day = utcDate.getUTCDate();
  let year = utcDate.getUTCFullYear();

  let hours = utcDate.getUTCHours().toString().padStart(2, "0");
  let minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");

  console.log(
    "Function convertToUTCTimeAndDate: " +
      `${hours}:${minutes} (${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")})`
  );

  return `${hours}:${minutes} (${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")})`;
};

let convertToYYYYDDMM = (date) => {
  date = new Date(date);

  let utcDate = new Date(date.toUTCString());

  let month = (utcDate.getUTCMonth() + 1).toString().padStart(2, "0");
  let day = utcDate.getUTCDate().toString().padStart(2, "0");
  let year = utcDate.getUTCFullYear().toString();

  return `${year}${month}${day}`;
};

let convertToUTCNoTime = (date) => {
  date = new Date(date);

  let utcDate = new Date(date.toUTCString());

  let month = utcDate.getUTCMonth() + 1;
  let day = utcDate.getUTCDate();
  let year = utcDate.getUTCFullYear();

  console.log(
    "Function convertToUTC: " +
      `${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}/${year}`
  );

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
};

let convertToUTCNoYear = (date) => {
  date = new Date(date);

  let utcDate = new Date(date.toUTCString());

  let month = utcDate.getUTCMonth() + 1;
  let day = utcDate.getUTCDate();

  console.log(
    "Function converToUTCNoYear: " +
      `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`
  );

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;
};

// Function to get an event's duration

let getDuration = (startDate, endDate) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let diff = Math.abs(startDate - endDate);
  let hours = Math.floor(diff / 3600000);
  let minutes = Math.floor((diff % 3600000) / 60000);

  if (hours === 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else if (minutes === 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else {
    return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  }
};

function extractTicketNumber(jiraUrl) {
  const regex = /(\d+)$/;
  const match = jiraUrl.match(regex);

  if (match && match.length > 0) {
    return match[0];
  }

  return null;
}

// This is our main function, this will create our final template

let createTemplate = () => {
  var myData = "";

  // Loop through each row in the table
  var rows = document.querySelectorAll("#name_list tr");
  rows.forEach(function (row) {
    var cols = row.querySelectorAll("td");

    // Extract the name and test values from the current row
    var nameAndTest = cols[0].textContent.split(" - ");
    var name = nameAndTest[1].trim();
    var test = nameAndTest[0].trim();

    // Build a string with the name and test values
    myData += test + ": " + name + "<br>";
  });

  // Let's get our products

  selectedProducts = getProducts();

  selectedProducts = fixProducts(selectedProducts);

  // Let's now get our duration. 1st, let's get our date values from the form

  var getStartDate = document.getElementById("start_time").value;
  var getEndDate = document.getElementById("end_time").value;
  var getReportedDate = document.getElementById("reported_time").value;

  // As a 2nd step, let's convert our dates to UTC.

  let dateYYYYMMDD = convertToYYYYDDMM(getStartDate);
  let startDateNoTime = convertToUTCNoTime(getStartDate);
  let startTime = convertToUTCTimeOnly(getStartDate);
  let startTimeNoYear = convertToDateNoYear(getStartDate);
  let startTimeWithYear = convertToDateUTC(getStartDate);

  let endDateTimeOnly = convertToUTCTimeOnly(getEndDate);
  let endDateTimeOrDateTime = convertToUTCTimeOrTimeWithDate(getEndDate);
  let endDateNoYear = convertToDateNoYear(getEndDate);

  let reportedTimeOnly = convertToUTCTimeOnly(getReportedDate);
  let reportedDateNoYear = convertToDateNoYear(getReportedDate);

  // Now that we've our dates in the correct format, let's calculate the duration

  let duration = getDuration(getStartDate, getEndDate);

  // Let's now get our incident's details

  let incidentsTittle = document.getElementById("incidents_title").value;
  let rootCause = document.getElementById("root_cause").value;
  let jiraTicket = document.getElementById("jira_ticket").value;
  let customerReports = document.getElementById("customer_reports").value;
  let detectionMechanism = document.getElementById("detection_mechanism").value;
  let remediation = document.getElementById("remediation").value;
  let preventativeMeasures = document.getElementById(
    "preventative_measures"
  ).value;
  let issue = document.getElementById("issue").value;

  // To get our severity type (P1/2/3)

  var e = document.getElementById("incidentType");
  var cIncidentType = e.value;

  // Validate if Preventive Measures is not blank

  if (preventativeMeasures === "") {
    preventativeMeasures = "To be determined";
  }

  // This is an example of what we need

  /*

  Hello All, 

  Here is the summary of the PRODUCT SEVERITY incident that happened today. 

  Summary - (bold) On MM/DD/YYYY, from 00:00 [24h] UTC until 00:00 [24h] UTC, a few PRODUCT customers were ISSUE. Engineers identified that the issue was caused by CAUSE. As mitigation, our engineers MITIGATION ACTIONS. 

  Date - (bold) MM/DD/YYYY  

  Products Impacted - (bold) PRODUCT 

  Jira - (bold) HIPERLINK TO TSD TICKET 

  Detection mechanism – (bold) ALERT/NOC-CHAT  

  Issue Start Time (UTC) - (bold) 00:00 [24h] (MM/DD)  
  Issue Reported (UTC) - (bold) 00:00 [24h] (MM/DD)  
  Issue End Time (UTC) - (bold) 00:00 [24h] (MM/DD)  

  Total Duration – (bold) 00 hours 00 minutes 

  Timeline (in UTC): (bold)

  00:00 [24h] – DETECTION 
  00:00 [24h] – INCIDENT MANAGEMENT PROCESS 
  00:00 [24h] – MITIGATION ACTIONS 
  00:00 [24h] – RESOLUTION CONFIRMATION 
  
  Number of Customer Reports – NUMBER OF REPORTS SO FAR  

  Root Cause – CAUSE 

  Remediation – MITIGATION ACTIONS 

  Preventative Measures – To be determined 

  NOTE – This summary is being sent to the best of the information available to NOC at this point in time. 

  */

  // To use vars inside: ${myVariable}

  var tab = window.open("about:blank", "_blank");

  let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Results - PIS</title>

      <style>
      .mytext {
        font-family: Calibri;
        font-size: 12pt;
      }
      </style>
  </head>
  <body>
    <h1>PIS (Please review prior to creating the email)</h1>
      <p class="mytext">
      Hello All,<br><br>

      Here is the summary of the ${selectedProducts} ${cIncidentType} incident that happened today.<br><br>

      <b>Summary</b> - On ${startDateNoTime}, from ${startTime} UTC until ${endDateTimeOrDateTime} UTC, a few ${selectedProducts}
      customers may have experienced an ${issue}. Engineers identified that the issue was caused by ${rootCause}.
      As mitigation, our engineers ${remediation}.<br><br>

      <b>Date</b> - ${startTimeWithYear}<br><br>

      <b>Products Impacted</b> - ${selectedProducts}<br><br>

      <b>Jira</b> - <a href="${jiraTicket}">${jiraTicket}</a><br><br>

      <b>Detection mechanism</b> - ${detectionMechanism}<br><br>

      <b>Issue Start Time (UTC)</b> -  ${startTime} ${startTimeNoYear}<br>
      <b>Issue Reported (UTC)</b> - ${reportedTimeOnly} ${reportedDateNoYear}<br>
      <b>Issue End Time (UTC)</b> - ${endDateTimeOnly} ${endDateNoYear}<br><br>

      <b>Total Duration</b> - ${duration}<br><br>

      <b>Timeline (in UTC):</b><br><br>
      ${myData}

      <br><b>Number of Customer Reports</b> - ${customerReports}<br><br>

      <b>Root Cause</b> - ${capitalizeFirstLetter(rootCause)} <br><br>

      <b>Remediation</b> - ${capitalizeFirstLetter(remediation)} <br><br>

      <b>Preventative Measures</b> - ${capitalizeFirstLetter(preventativeMeasures)}<br><br>

      <b><i>NOTE</b> - This summary is being sent to the best of the information available to NOC at this point in time.</i>

      </p>

    </body>
  </html>`;

  tab.document.write(html);
  tab.document.close();

  // Email shoulbe like this: Post Incident Summary | P1 - GoTo Meeting, GoToMyPC and GoTo Assist Service Desk - Users unable to Start Sessions or Share Webcam and Websites not Loading - 05/011/2023
  // In other words: Post Incident Summary | [Severity] - [Product(s)] - [Issue] - [mm/dd/yyyy]

  let emailsSubject = `Post Incident Summary | ${cIncidentType} - ${selectedProducts} - ${incidentsTittle} - ${startDateNoTime}`;

  // Filename should be like this:
  // PIS-20230608-P2-GoToMeeting-issues-in-starting-or-joining-sessions-480314
  // In other words: PIS-[yyyymmdd]-[Severity]-[Product(s)]-[Incident's Tittle]-[TSD]

  // Let's first extract the TSD number from our Jira ticket

  let tsdNumber = extractTicketNumber(jiraTicket);

  let fileName = `PIS-${dateYYYYMMDD}-${cIncidentType}-${selectedProducts}-${incidentsTittle}-${tsdNumber}`;

  // Let's now remove the "Please review" message for the Word document.

  html = html.replace(
    "<h1>PIS (Please review prior to creating the email)</h1>",
    ""
  );

  Export2Word(fileName, html);

  // This will be our body for the email in specific as the one above seems to only work when creating a new tab.

  let emailBody = `Please copy and paste your PIS here once it is ready.`
  
  createNewEmail(emailsSubject, emailBody);

};

let fixProducts = (products) => {
  var listProducts = products;
  var productsFinal = "";

  var penUltProduct = listProducts[listProducts.length - 2];
  var lastProduct = listProducts[listProducts.length - 1];

  for (i in listProducts) {
    if (listProducts.length === 1) {
      productsFinal = listProducts[i];
    } else if (listProducts[i] === lastProduct) {
      productsFinal = productsFinal + " and " + listProducts[i];
    } else if (listProducts[i] === penUltProduct) {
      productsFinal = productsFinal + listProducts[i];
    } else {
      productsFinal = productsFinal + listProducts[i] + ", ";
    }
  }

  return productsFinal;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// To: LeadershipTeam-IncidentSummary@goto.com
// CC: NOC-Group@logmein.com

let createNewEmail = (subject, emailBody) => {
  let mysubject = subject;
  let to = "LeadershipTeam-IncidentSummary@goto.com";
  let cc = "NOC-Group@logmein.com";
  const mailtoUrl = `mailto:${to}?cc=${cc}&subject=${mysubject}&body=${emailBody}`;

  window.location.href = mailtoUrl;
};

function ListAll() {
  var data = "";
  if (names.length > 0) {
    for (i = 0; i < names.length; i++) {
      data += "<tr>";
      data += "<td>" + dates[i] + " - " + names[i] + "</td>";
      data +=
        '<td colspan="2"><center><button class="btn btn-warning" onclick="Edit(' +
        i +
        ')"><span class="glyphicon glyphicon-edit"></span> Edit</button><button class="btn btn-danger" onclick="Delete(' +
        i +
        ')"><span class="glyphicon glyphicon-trash"></span> Kill</button></center></td>';
      data += "</tr>";
    }
  }

  el.innerHTML = data;
}

let convertToUTCForTimeline = (dateTime) => {
  let date = new Date(dateTime);

  let utcYear = date.getUTCFullYear();
  let utcMonth = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  let utcDay = date.getUTCDate().toString().padStart(2, "0");

  let utcHours = date.getUTCHours().toString().padStart(2, "0");
  let utcMinutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${utcYear}-${utcMonth}-${utcDay}T${utcHours}:${utcMinutes}`;
};

function Add() {
  var el = document.getElementById("name");
  var name = el.value;

  var date = document.getElementById("mydate");

  var myDate = convertToUTCForTimeline(date.value);

  if (name) {
    names.push(name.trim());
    dates.push(myDate.trim() + ":00Z");
    el.value = "";
    //date.value = "";
    ListAll();
  }
}

function Delete(item) {
  names.splice(item, 1);
  dates.splice(item, 1);
  ListAll();
}

function Edit(item) {
  var el = document.getElementById("edit_name");
  var nameAndTest = names[item] + "|" + dates[item];
  el.value = nameAndTest;
  document.getElementById("edit").style.display = "block";
  self = this;

  document.getElementById("update").onsubmit = function () {
    var nameAndTest = el.value;
    if (nameAndTest) {
      var parts = nameAndTest.split("|");
      var name = parts[0].trim();
      var test = parts[1].trim();
      self.names.splice(item, 1, name);
      self.dates.splice(item, 1, test);
      self.ListAll();
      Close();
    }
  };
}

function Close() {
  document.getElementById("edit").style.display = "none";
}
