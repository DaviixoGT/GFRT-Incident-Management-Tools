// Products Variable

let fixedProducts = "";

function createTemplate(){
    
    // This is to get the date and create its format

    try{

    var getDate = document.getElementById("dateTime").value;
    var getMinutes = document.getElementById("duration").value;

    getMinutes = parseInt(getMinutes);

    var date = new Date(getDate);
    currentMonth = date.getMonth();
    date = date.toString();

    splitDate = date.split(" ");

    //Splitting the date

    splitWeekDay = splitDate[0].replace(",","");
    splitMonth = splitDate[1];
    splitDay = splitDate[2];
    splitYear = splitDate[3];
    splitTime = splitDate[4];
    splitTimezone = splitDate[5];

    // Let's now divide our time

    finalTime = splitDate[4].split(":");
    splitHour = finalTime[0];
    splitMinutes = finalTime[1];
    splitMinutesOne = splitMinutes[0];
    splitMinutesTwo = splitMinutes[1];

    finalSplitMinutes = splitMinutesOne + splitMinutesTwo;

    var d = new Date(splitYear,currentMonth,splitDay,splitHour,finalSplitMinutes);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
    var wd = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(d);
    var ti = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: true, minute: '2-digit'}).format(d);

    // Let's now add the minutes to the current date.

    createNewDate = addHours(d,getMinutes);

    var new_date = new Date(createNewDate);
    new_currentMonth = new_date.getMonth();
    new_date = new_date.toString();

    new_splitDate = new_date.split(" ");

    //Splitting the date

    new_splitWeekDay = new_splitDate[0].replace(",","");
    new_splitMonth = new_splitDate[1];
    new_splitDay = new_splitDate[2];
    new_splitYear = new_splitDate[3];
    new_splitTime = new_splitDate[4];
    new_splitTimezone = new_splitDate[5];

    // Let's now divide our time

    new_finalTime = new_splitDate[4].split(":");
    new_splitHour = new_finalTime[0];
    new_splitMinutes = new_finalTime[1];
    new_splitMinutesOne = new_splitMinutes[0];
    new_splitMinutesTwo = new_splitMinutes[1];

    new_finalSplitMinutes = new_splitMinutesOne + new_splitMinutesTwo;

    var new_d = new Date(new_splitYear,currentMonth,new_splitDay,new_splitHour,new_finalSplitMinutes);
    var new_ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new_d);
    var new_mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(new_d);
    var new_da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new_d);
    var new_wd = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(new_d);
    var new_ti = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: true, minute: '2-digit'}).format(new_d);

    // Let's check our checkbox

    let myCheckbox = document.getElementById('checkbox').checked;

    let expectation = checkboxChecker(myCheckbox);

    var selected = [];
    for (var option of document.getElementById('products').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }

    // Let's fix our list

    fixedProducts = fixProducts(selected);

    maDate = mo + " " + da + ", " + ye + ", " + ti + " UTC to " + new_ti + " UTC"

    finalDowntime = timeConverter(getMinutes);

    // ====== This section is to create the final template, which should have the below ==========

    // As part of our commitment to provide exceptional service and reliability to our customers, 
    // GoToMeeting, GoToWebinar, GoToTraining, and OpenVoice will be conducting service maintenance on the 
    // following date and time listed below. Our team will be taking all appropriate actions to minimize 
    // service interruptions during this event.

    // <b>Date and Time:</b> June 18, 2022, 03:00 AM UTC to 04:00 AM UTC

    // <b>Purpose:</b> This maintenance is to ensure and maintain system performance and stability.

    // <b>Duration:</b> All maintenance will be performed within the 1-hour maintenance window.

    // <b>What to expect:</b> During the maintenance window GoToMeeting, GoToWebinar, GoToTraining and OpenVoice customers will experience a 10 minute downtime 
    // when trying access the Billing Center or performing billing-related activities like seat increase, new subscription purchases and trial to paid conversions.

    // We would like to thank you for your patience and understanding during this time period

    var tab = window.open('about:blank', '_blank')

    html = '<!DOCTYPE html>' + 
    '<head>' + '<style>' +
    'pre, code{' + 
        'font-family: "Lato", sans-serif;' + 
        'font-size: medium;' +
        'font-weight: bold;' +
        'display: inline;' +
        'white-space: pre;' +
    '}' +
    '</style>' +
    '<title>Results - CAB - External MA</title></head><body>' + 
    '<strong>CAB - External MA</strong><br><br>' + "<strong>" + fixedProducts + ' - Maintenance</strong><br><br>' + 
    'As part of our commitment to provide exceptional service and reliability to our customers, ' + fixedProducts + 
    ' will be conducting service maintenance on the following date and time listed below. Our team will be taking all appropriate actions to minimize' +
    ' service interruptions during this event.<br><br>' + 
    '<pre>&ltb&gtDate and Time:&lt/b&gt</pre>' + " " + maDate + '<br><br>' +
    '<pre>&ltb&gtPurpose:&lt/b&gt</pre> This maintenance is to ensure and maintain system performance and stability.<br><br>' +
    '<pre>&ltb&gtDuration:&lt/b&gt</pre> ' + 'All maintenance will be performed within the ' + finalDowntime + ' maintenance window.<br><br>' +
    expectation +
    '<br><br>We would like to thank you for your patience and understanding during this time period.</p></body></html>';

    tab.document.write(html);
    tab.document.close();

    /* var winPrint = window.open('MA', '', 'left=0,top=0,width=650,height=500,toolbar=0,scrollbars=0,status=0');
    winPrint.document.write('<!DOCTYPE html>' + 
    '<head>' + '<style>' +
    'pre, code{' + 
        'font-family: "Lato", sans-serif;' + 
        'font-size: medium;' +
        'font-weight: bold;' +
        'display: inline;' +
        'white-space: pre;' +
    '}' +
    '</style>' +
    '<title>CAB - External MA</title></head><body>' + 
    '<strong>CAB - External MA</strong><br><br>' + "<strong>" + fixedProducts + ' - Maintenance</strong><br><br>' + 
    'As part of our commitment to provide exceptional service and reliability to our customers, ' + fixedProducts + 
    ' will be conducting service maintenance on the following date and time listed below. Our team will be taking all appropriate actions to minimize' +
    ' service interruptions during this event.<br><br>' + 
    '<pre>&ltb&gtDate and Time:&lt/b&gt</pre>' + " " + maDate + '<br><br>' +
    '<pre>&ltb&gtPurpose:&lt/b&gt</pre> This maintenance is to ensure and maintain system performance and stability.<br><br>' +
    '<pre>&ltb&gtDuration:&lt/b&gt</pre> ' + 'All maintenance will be performed within the ' + finalDowntime + ' maintenance window.<br><br>' +
    '<pre>&ltb&gtWhat to expect:&lt/b&gt</pre> ' + ' During the maintenance window ' + fixedProducts + ' customers will experience ' + getExpectation + "." +
    '<br><br>We would like to thank you for your patience and understanding during this time period.</p></body></html>'
    ); */

    }catch(error){

        alert('Dude, make sure all fields are filled up! :D')
        console.log("Error: " + error)

    }

}

function addHours(change_date, addMinutes){

    var newDate = new Date(change_date);
    newDate.setMinutes(newDate.getMinutes() + addMinutes);
    return newDate;

}

let checkboxChecker = (myCheckbox) => {

    let getExpectation = document.getElementById("expect").value;

    if (myCheckbox) {
        return expectation = "<pre>&ltb&gtWhat to expect:&lt/b&gt</pre> " + getExpectation
    } else {
        return expectation = '<pre>&ltb&gtWhat to expect:&lt/b&gt</pre> ' + 
        ' During the maintenance window, ' + fixedProducts + 
        ' customers may experience intermittent difficulties ' + getExpectation + ".";
    }

}

function timeConverter(minutes){

    var num = minutes;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);

    if(minutes === 0){
        return rhours + "-hour";
    }
    else if(minutes <= 59 && rhours === 0){
        return rminutes + "-minute";
    }
    else{
        return rhours + "-hour and " + rminutes + "-minute";
    }

}

function fixProducts(products){

    var listProducts = products;
    var productsFinal = "";

    var penUltProduct = listProducts[listProducts.length -2];
    var lastProduct = listProducts[listProducts.length -1];
    
    for (i in listProducts){

        if(listProducts.length === 1){
            productsFinal = listProducts[i];

        }else if (listProducts[i] === lastProduct){
            productsFinal = productsFinal + " and " + listProducts[i];

        }else if (listProducts[i] === penUltProduct) {
            productsFinal = productsFinal + listProducts[i];

        }else{
            productsFinal = productsFinal + listProducts[i] + ", ";
        }
        
    }

    return productsFinal;

}