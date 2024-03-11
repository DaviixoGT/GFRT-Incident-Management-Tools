function createTemplate(){

    // This is Part I - Investigating
    
    //Var today could be useful in the future, leaving that here for reference
    var today = new Date().toLocaleDateString('en-us', { hour:"2-digit", minute:"2-digit", weekday:"long", year:"numeric", month:"short", day:"numeric"});

    var cTittle = document.getElementById("sptittle").value;

    const utcStr = new Date().toUTCString();
    console.log(utcStr);

    var cImpact = document.getElementById("impact").value;

    var cReports = document.getElementById("customerReports").value;

    var cSlackChannel = document.getElementById("slackChannel").value;

    var e = document.getElementById("incidentType");
    var cIncidentType = e.value;

    var confBridge = "(805) 416-0601 Pin: 13554";

    var selected = [];

    for (var option of document.getElementById('products').options)
    {
        if (option.selected) {
            selected.push(" " + option.value);
        }
    }

    var finalTitle = cIncidentType + " - " + selected + " - " + cTittle;

    var tab = window.open('about:blank', '_blank');

    // Example for <b></b> as plain text: <br><br>&lt;b&gt;Final Customer Reports - &lt;/b&gt

    html = '<title>Results - Investigating</title>' +
    '<h1>External Status Page Template</h1>' + 
    selected + ' - ' + cTittle
    + '<br><br>We are actively investigating reports that some ' + selected + ' customers may be '
    + cImpact + '. <br><br>Our engineers are working to identify the issue and will provide another update shortly.' +  

    '<h1>Internal Status Page Template:</h1>' + 
    finalTitle + 
    '<br><br>Our engineers are investigating a ' + cIncidentType + ' incident for ' + selected +
    '<br><br><b>&lt;b&gt;Customer Impact - &lt;/b&gt</b>' + cTittle +
    '<br><b>&lt;b&gt;Customer Reports - &lt;/b&gt</b>' + cReports +
    '<br><b>&lt;b&gt;Slack Channel - &lt;/b&gt</b>' + cSlackChannel

    + '<h1>Comms Response Template:</h1>'
    + '@here'
    + '<br>Our engineers are investigating a ' + cIncidentType + ' for ' + selected
    + '<br><b>Customer Impact - </b>' + cTittle
    + '<br><b>Customer Reports - </b>' + cReports
    + '<br><b>Slack Channel - </b>' + cSlackChannel
    + '<br><br>Please thread questions in this message.'

    + '<h1>outages_goto Channel</h1>'
    + cIncidentType + ' - ' + selected + ' - ' + cTittle + ' - ' + cSlackChannel;

    tab.document.write(html);
    tab.document.close(); 

}

// This is the FINAL section, CLOSURE

function createTemplateComms(){

    var selected = [];

    for (var option of document.getElementById('products').options)
    {
        if (option.selected) {
            selected.push(" " + option.value);
        }
    }

    var cSlackChannel = document.getElementById("slackChannel").value;

    // Lets get our Start and End time
    //var getStartTime = document.getElementById("startDateTime").value;
    //console.log("My getStartTime BEFORE: " + getStartTime);
    //var newStartTime = fixDate(getStartTime);
    //console.log('New start time: ' +  newStartTime);
    // Now let's get our End time
    //var getEndTime = document.getElementById("endDateTime").value;
    //console.log("End Time BEFORE: " + getEndTime);
    //var newEndTime = fixDate(getEndTime);
    //console.log('New end time: ' +  newEndTime);
    // For example: 10/25/2022 9:00 AM UTC - 10/26/2022 04:39 PM UTC
    //var finalTimeline = newStartTime + " UTC - " + newEndTime + " UTC";
    // End of fixing date format

    //var cImpact = document.getElementById("impact").value;

    var getRootCause = document.getElementById("rootcause").value;

    var getFix = document.getElementById("fix").value;

    var getFinalCustomerReports = document.getElementById("finalcustomerreports").value;

    var getDateTime = document.getElementById("dateTime").value;

    var outages_closure = fixDate(getDateTime);

    var selected = [];
    
    for (var option of document.getElementById('products').options)
    {
        if (option.selected) {
            selected.push(" " + option.value);
        }
    }

    var cImpact = document.getElementById("impact").value;

    console.log("This is date output -> " + outages_closure)

    //console.log("Lenght: " + productsLenght);

    // This will create the CLOSING statements

    // Example for <b></b> as plain text: <br><br>&lt;b&gt;Final Customer Reports - &lt;/b&gt

    var tab = window.open('about:blank', '_blank');

    html = '<title>Results - Resolved</title>'
    + '<h1><b>Internal Status Page - Closing Statement</b></h1>'
    + 'We have confirmed that the issue has been resolved and that all systems are 100% operational.'
    + '<br><br><b>&lt;b&gt;Final Customer Reports - &lt;/b&gt</b>' + getFinalCustomerReports
    + '<br><b>&lt;b&gt;Root Cause - &lt;/b&gt</b>' + getRootCause
    + '<br><b>&lt;b&gt;Resolution - &lt;/b&gt</b>' + getFix
    + '<br><b>&lt;b&gt;PostMortem - &lt;/b&gt</b>A detailed technical document will be shared in the incident Slack Channel ' + cSlackChannel

    + '<h1><b>Comms Response - Closing Statement</b></h1>'
    + 'We have confirmed that the issue has been resolved and that all systems are 100% operational.'
    + '<br><br><b>Final Customer Reports - </b>' + getFinalCustomerReports 
    + '<br><b>Root Cause - </b>' + getRootCause 
    + '<br><b>Resolution - </b>' + getFix
    + '<br><b>Postmortem - </b>A detailed technical document will be shared in the incident Slack Channel ' + cSlackChannel

    + '<h1>outages_goto Channel - Closing Statement</h1>'
    + outages_closure;

    tab.document.write(html);
    tab.document.close();

}

function createDraft(){

    var tab = window.open('about:blank', '_blank');

    html = '<title>Results - Incidents Templates</title>'
    + '<h1>Identified</h1>'
    + 'Our engineers have identified the issue and are now actively working towards a resolution.<br><br>'
    + 'We will provide another update shortly.'

    + '<br><h1>Identified (Caused by a Third-Party Vendor)</h1>'
    + 'Our engineers have identified the issue as being caused by an ongoing incident with one of our underlying third-party service providers who are actively working towards a resolution.'
    + '<br><br>We will provide another update as soon as they become available.'

    + '<br><h1>Monitoring</h1>'
    + 'Our engineers have corrected the issue and we are confirming that all services are functional.<br><br>'
    + 'We will continue monitoring the situation and provide a final update shortly.'

    + '<br><h1>Monitoring (Caused by a Third-Party Vendor)</h1>'
    + 'Our underlying third-party service provider has corrected the issue and we are confirming that all services are functional.'
    + '<br><br>We will continue monitoring the situation and provide a final update shortly.'

    + '<br><h1>Resolved</h1>'
    + 'We have confirmed that the issue has been resolved and all systems are 100% operational at this time.<br><br>'
    + 'We will conduct an internal investigation of this issue and make appropriate improvements to our system to help prevent or minimize future recurrence.';

    tab.document.write(html);
    tab.document.close(); 

}

function createTemplateIdentified(){

    // Output should be:
    // Our engineers have identified the issue as being caused by CAUSE and are now ACTION BEING TAKEN FOR RESOLUTION.

    var getCause = document.getElementById("cause").value;
    var getActionsTaken = document.getElementById("actionsbeingtaken").value;

    var tab = window.open('about:blank', '_blank');

    html = '<title>Results - Identified</title>' +
    '<h1>Identified</h1>' +
    'Our engineers have identified the issue as being caused by ' + getCause +
    ' and are now ' + getActionsTaken + '.' +
    
    '<h1>Comms Response</h1>' +
    'Our engineers have identified the issue as being caused by ' + getCause +
    ' and are now ' + getActionsTaken;

    tab.document.write(html);
    tab.document.close();
    
}

function createTemplateMonitoring(){

    // Output should be:
    // COMPLETED ACTION FOR RESOLUTION and we are confirming that all services are functional.

    var getCompletedAction = document.getElementById("completedaction").value;

    var tab = window.open('about:blank', '_blank');

    html = '<title>Results - Monitoring</title>' +
    '<h1>Monitoring</h1>' +
    getCompletedAction + ' and we are confirming that all services are functional.' +

    '<h1>Comms Response</h1>' +
    getCompletedAction + ' and we are confirming that all services are functional.'

    tab.document.write(html);
    tab.document.close();

}

// This function could be used later on, will leave it here in case we need it afterwards.

function fixDate(getDate){

    var date = new Date(getDate);

    getJustMonth = date.getMonth();

    date = date.toString();

    splitDate = date.split(" ");

    // Splitting the date

    splitWeekDay = splitDate[0].replace(",","");
    splitMonth = splitDate[1];
    splitDay = splitDate[2];
    splitYear = splitDate[3];
    splitTime = splitDate[4];
    splitTimezone = splitDate[5];

    //Let's now divide our time

    finalTime = splitDate[4].split(":");
    splitHour = finalTime[0];
    splitMinutes = finalTime[1];
    splitMinutesOne = splitMinutes[0];
    splitMinutesTwo = splitMinutes[1];

    finalSplitMinutes = splitMinutesOne + splitMinutesTwo;

    var d = new Date(splitYear,getJustMonth,splitDay,splitHour,finalSplitMinutes);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
    var wd = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(d);
    var ti = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: false, minute: '2-digit'}).format(d);

    // Example: Incident Resolved as of 6:12 PM UTC.

    var fixedFormattedDate = "Incident resolved as of " + ti + " UTC";

    return fixedFormattedDate;

}