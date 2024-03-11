function createTemplate() {

    document.getElementById("custImpact").innerHTML = localStorage.getItem("myImpact");
    document.getElementById("actionsTaken").innerHTML = localStorage.getItem("myActions");
    document.getElementById("doing").innerHTML = localStorage.getItem("myDoing");

    //Our final form should show:
    // Current Status Update#[REPORT#]
    // Impact
    // [ISSUE]
    // What have we done so far
    // [ACTIONS1]
    // What are we currently doing
    // [ACTIONS2]

    //var cName = document.getElementById("custName").value;

    var select = document.getElementById('updateSelect');
    var value = select.options[select.selectedIndex].value;

    var cImpact = document.getElementById("custImpact").value;

    var cActions = document.getElementById("actionsTaken").value;
    var cDoing = document.getElementById("doing").value;

    var getPriority = document.getElementById('setPriority');
    var valuePriority = getPriority.options[getPriority.selectedIndex].value;

    //console.log("This is the priority: " + valuePriority);

    // This will use our localstorage

    localStorage.setItem("mySelect", select);
    localStorage.setItem("myValue", value);
    localStorage.setItem("myImpact", cImpact);
    localStorage.setItem("myActions", cActions);
    localStorage.setItem("myDoing", cDoing);

    // ------> This will most likely be used afterwards <--------

    // document.getElementById("temp").value = 
    // "Current Status Update #" + value + "\n" + 
    // "\nImpact:\n" + cImpact + "\n" + 
    // "\nWhat have we done so far?\n" + cActions + "\n" + 
    // "\nWhat are we currently doing?\n" + cDoing
    // ;

    // var copyText = document.getElementById("temp");

    // copyText.select();
    // copyText.setSelectionRange(0, 99999);
    // document.execCommand("copy");

    if(valuePriority === "P1"){

        console.log("Value is P1, setting timer to 15 mins");
        const myTimeout = setTimeout(notifyMe, 900000);
        console.log("Notification will be sent...");


    }else{

        console.log("Value is P2 or P3, setting timer to 30 mins");
        const myTimeout = setTimeout(notifyMe, 1800000);
        console.log("Notification will be sent...");

    }

    // We'll now create our new tab

    var tab = window.open('about:blank', '_blank');

    html = '<title>Results - Slack Status Update</title><strong>Current Status Update #' + value + '</strong>' +
    '<br><br><strong>Impact:</strong><br>' + cImpact + '<br><br><strong>What have we done so far?</strong><br>' + cActions +
    '<br><br><strong>What are we currently doing?</strong><br>' + cDoing +
    '<br><br><br>You could also use:<br>/remind @noc-team "Time to post another slack update" in 60 minutes'

    tab.document.write(html);
    tab.document.close();

    /* Leaving old stuff here
    var winPrint = window.open('SlackStuff', '', 'left=0,top=0,width=450,height=400,toolbar=0,scrollbars=0,status=0');
    winPrint.document.write('<title>Slack Status Update</title><strong>Current Status Update #' + value + '</strong>' +
    '<br><br><strong>Impact:</strong><br>' + cImpact + '<br><br><strong>What have we done so far?</strong><br>' + cActions +
    '<br><br><strong>What are we currently doing?</strong><br>' + cDoing +
    '<br><br><br>You could also use:<br>/remind @noc-team "Time to post another slack update" in 60 minutes'
    
    ); */

    alert('Do not close this tab or the notification will not be sent :D');

    
}

function notifyMe() {
    if (Notification.permission !== 'granted')
     Notification.requestPermission();
    else {
     var notification = new Notification('Lets post a new update!', {
      icon: 'images/caticon.ico',
      body: 'Remember to post the next incident Slack update!',
     });
     notification.onclick = function() {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley');
         };
     }

    console.log("Notification sent! :D")
}


function pageLoads(){

    document.getElementById("custImpact").innerHTML = localStorage.getItem("myImpact");
    document.getElementById("actionsTaken").innerHTML = localStorage.getItem("myActions");
    document.getElementById("doing").innerHTML = localStorage.getItem("myDoing");

}
