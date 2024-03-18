// This will help us create a table so the user can visualize
// the recipients prior to creating a draft or official RFO email

const names = [];
const emails = [];

document.getElementById('csv_recipients').addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
      const csv = event.target.result;
      const lines = csv.split('\n');
      const table = document.getElementById('tabla');
      table.innerHTML = '';

      lines.forEach(function(line) {
          const columns = line.split(',');
          const name = columns[0];
          const email = columns[1];

          if (name && email) {
              const row = document.createElement('div');
              row.classList.add('fila');

              if (name && email){
                names.push(name);
                emails.push(email); 
              }

              const nameCell = document.createElement('div');
              nameCell.classList.add('celda');
              nameCell.textContent = name;
              row.appendChild(nameCell);

              const emailCell = document.createElement('div');
              emailCell.classList.add('celda');
              emailCell.textContent = email;
              row.appendChild(emailCell);

              table.appendChild(row);
          }
      });
  };

  reader.readAsText(file);
});

// This function will help us retrieve the information from the filled form

let createPreview = () => {

  // Retrieving form's data and assigning letiables.

  let getStartDate = document.getElementById("start_date").value;

  let getProductsAsList = getProducts();

  let template_signature_position = validateProducts(getProductsAsList);

  getProductsAsList = fixProducts(getProductsAsList);

  // To get the severity
  let e = document.getElementById("incidentType");
  let getSeverity = e.value;

  let getIncidentsTitle = document.getElementById("incidents_title").value;

  let getIssue = document.getElementById("issue").value;

  let getRootCause = document.getElementById("root_cause").value;

  let getRemediation = document.getElementById("remediation").value;

  let finalIncidentsDate_yyyymmdd = formatDate_yyyymmdd(getStartDate);

  let finalIncidentsDate_LongDate = formatDate_LongFormat(getStartDate);

  /* If a field was not filled up, we need to provide a generic wording such as [ISSUE]
  so the user the identify which field lacks information*/

  if (getProductsAsList.length === 0){

    getProductsAsList = "[PRODUCT(S)]"

  }

  if (!getIssue){

    getIssue = "[ISSUE]"

  }

  if (!getRootCause){

    getRootCause = "[ROOT CAUSE]"

  }

  if (!getRemediation){

    getRemediation = "[REMEDIATION]"

  }

  rfo_url = template_signature_position[0];
  rfo_signature = template_signature_position[1]
  rfo_position = template_signature_position[2]

  finalSuggestedRFOUrl = `<a href="${rfo_url}" target="_blank">RFO's URL (${rfo_signature})</a>`
  
  // RFO-yyyymmdd-Severity-Product-Issue
  let filesName = "RFO-" + finalIncidentsDate_yyyymmdd + "-" + 
                  getSeverity + "-" + getProductsAsList + "-" + capitalizeFirstLetter(getIncidentsTitle)

  let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Results - RFO</title>

      <style>

      html {
        width: 8.5in; 
        height: 11in; 
        margin: 0 auto; 
        background-color: white; 
        border: 1px solid #ccc;  
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
        padding: 20px;
      }
      .mytext {
        font-family: Lato;
        font-size: 15.7px;
      }

      .myfooter {
        font-family: Tahoma;
        font-size: 10.5px;
        text-align: center;
      }

      .left-corner {
        top: 0;
        width: 5.08cm;
        height: 2.54cm;
      }

      </style>
  </head>
  <body>
    <h1>RFO's Preview</h1>
    <h2>Suggested file's name:</h2> <b>${filesName}</b>
    <h2>Suggested RFO Template to be used:</h2> <b>${finalSuggestedRFOUrl}</b><br><br>
    <img src="https://www.goto.com/-/media/images/shared/logos/goto/goto-with-banner/goto_rgb_black_yellow-png" alt="Image" class="left-corner">
      <p class="mytext">
      <b>Reason for Outage:</b> Content for Customer Consumption.<br><br>

      <b>Impact:</b> A subset of ${getProductsAsList} customers may have experienced ${getIssue}. <br><br>

      <b>To Our Valued Customers and Partners,</b><br><br>

      On ${finalIncidentsDate_LongDate}, a subset of ${getProductsAsList} 
      customers may have experienced ${getIssue}. <br><br>

      After a thorough investigation, 
      GoTo engineers concluded that the issue was caused by ${getRootCause}. <br><br>

      As soon as the issue was identified, 
      GoTo engineers ${getRemediation} to mitigate any further impact. <br><br>

      We have analyzed the product system and management 
      processes to decrease the chance of future failures. 
      Ongoing assessments aim to enhance system performance 
      and reliability for our valued customers. <br><br>

      GoTo takes great pride in the quality of its products, 
      and service availability is a basic element of that quality. 
      While issues of this nature are rare in our environment, 
      we acknowledge that any disruption or issue is one too many.<br><br>

      Should you need more information about this event, 
      please contact our Customer Care teams or me for help.<br><br>

      Sincerely,<br>
      ${rfo_signature}<br>
      ${rfo_position}<br>
      </p><br>

      <p class="myfooter">

        GoTo, 333 Summer Street, Suite 100 Boston, MA 02210<br>
        Phone (800) 993-1790 Fax (781) 998 7792<br>
        <a href="https://www.goto.com">www.goto.com</a></p>
        
      </p>

    </body>
</html>`

  let tab = window.open("about:blank", "_blank");

  tab.document.write(html);
  tab.document.close();

}

// Capitilize first letter of a string

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to format the date as yyyymmdd

let formatDate_yyyymmdd = (startDate) => {
  let [year, month, day] = startDate.split('-');
  let formattedDate = `${year}${month}${day}`;
  
  return formattedDate;
}

// Function to format the date as long format. For example: February 7th, 2024

let formatDate_LongFormat = (startDate) => {

  let adjustedDate = new Date(startDate);
  let timezoneOffset = adjustedDate.getTimezoneOffset();
  adjustedDate.setMinutes(adjustedDate.getMinutes() + timezoneOffset);

  let options = { month: 'long', day: 'numeric', year: 'numeric' };
  let day = adjustedDate.getDate();
  let formattedDay = getFormattedDay(day);

  options.day = '2-digit';
  let formattedDate = adjustedDate.toLocaleDateString('en-US', options);

  return formattedDate.replace(/\d+/, formattedDay);
}

const getFormattedDay = (day) => {
  if (day >= 11 && day <= 13) {
    return day + 'th';
  }
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

// Function to format the date as mm/dd/yyyy

let formatDate_mm_dd_yyyy = (startDate) => {
  const [year, month, day] = startDate.split('-');

  const formattedDate = `${month}/${day}/${year}`;
  
  return formattedDate;
}

// Function to get our affected product(s)

let getProducts = () => {
  let selected = [];

  for (let option of document.getElementById("products").options) {
    if (option.selected) {
      selected.push(option.value);
    }
  }

  return selected;
};

let fixProducts = (products) => {
  let listProducts = products;
  let productsFinal = "";

  let penUltProduct = listProducts[listProducts.length - 2];
  let lastProduct = listProducts[listProducts.length - 1];

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

// Function to validate the signature and template to be used

let validateProducts = (products) => {

  let selectElement = products;
  let rfo_template_link = "";
  let signature = "";
  let position = "";

  // If Grasshopper is the only value
  if (selectElement.length === 1 && selectElement.includes("Grasshopper")) {
    console.log("Validation 1");
    rfo_template_link = "https://logmeininc.sharepoint.com/:w:/s/LearningfromIncidents/EZTI3psk4dFBs0VgF3hU22ABcDG87FPCLFZWbVCTB9ejKw?e=x5Igw8";
    signature = "Scott Manning";
    position = "Vice President, Product Growth";
  }

  // If GoTo Meeting, Webinar, Training, OpenVoice or Join.me were selected
  else if (selectElement.length >= 1 && (selectElement.includes("GoTo Meeting") || selectElement.includes("GoTo Webinar") || selectElement.includes("GoTo Training") || selectElement.includes("OpenVoice") || selectElement.includes("join.me"))) {
    console.log("Validation 2");
    rfo_template_link = "https://logmeininc.sharepoint.com/:w:/s/LearningfromIncidents/ERrwq52yjSBNoKJp4JENNw8BfyrfVoxYOOP3w4aT_tWUgg?e=7W04mu";
    signature = "Madhusudan Krishnapuram";
    position = "Vice President, Engineering";
  }

  // If product is not GTMWTO or Join.Me
  else if (selectElement.length === 1 && !(selectElement.includes("GoTo Meeting") || selectElement.includes("GoTo Webinar") || selectElement.includes("GoTo Training") || selectElement.includes("OpenVoice") || selectElement.includes("join.me"))) {
    console.log("Validation 3");
    rfo_template_link = "https://logmeininc.sharepoint.com/:w:/s/LearningfromIncidents/EaLJDIXg2ntNtIX4VeKEIVoBo65d3O_KwGZzy0_uZSJS5A?e=X8LeJz";
    signature = "Simon Perreault";
    position = "Vice President, Software Engineering";
  }

  // If special case scenario
  else {
    console.log("Validation 4");
    rfo_template_link = "https://confluence.ops.expertcity.com/pages/viewpage.action?pageId=266260094";
    signature = "NA";
    position = "NA";
  }

  // Return our values
  return [rfo_template_link, signature, position];
}

// let emailBodyOld = `Hi Team,

// Please find the attached the RFO draft (${rfoDraftLink}) for the ${rfoProducts}-${rfoIssue} incident that occurred on ${finalIncidentsDate_mm_dd_yyyy}.

// Please help review and approve the same for customer distribution.

// Best regards,`;

function createInitialEmail() {

  if (names.length === 0 || emails.length === 0) {
    alert("CSV file has not been uploaded. Please upload the CSV file. 😉");
    return; // Salir de la función sin ejecutar el resto del código
  }

  let rfoDraftLink = document.getElementById("rfo_link").value;
  let rfoProducts = getProducts();
  let finalIncidentsDate_mm_dd_yyyy = document.getElementById("start_date").value;

  finalIncidentsDate_mm_dd_yyyy = formatDate_mm_dd_yyyy(finalIncidentsDate_mm_dd_yyyy);

  rfoProducts = fixProducts(rfoProducts);

  let rfoIssue = document.getElementById("incidents_title").value;

  let rfoSubject = `Draft - RFO - ${rfoProducts} - ${rfoIssue} - ${finalIncidentsDate_mm_dd_yyyy}`;
  let to = emails[4] + ", " + emails[3] + ", " + emails[2];
  let cc = emails[1] + ", " + emails[5];

  let textForEmailsBody = "Please review and copy the email's body from the WebApp";

  let emailBodyInWebApp = `Hi Team,<br><br>
  
Please find the attached the <a href="${rfoDraftLink}">RFO draft</a> 
for the ${rfoProducts}-${rfoIssue} incident that occurred on ${finalIncidentsDate_mm_dd_yyyy}.<br><br>

Please help review and approve the same for customer distribution.<br><br>

Best regards,`;

  // Set the email body text to the div with ID "emails_body"
  document.getElementById("emails_body").innerHTML = emailBodyInWebApp;

  // Check if the checkbox "Copy to clipboard" is checked
  const copyToClipboardCheckbox = document.getElementById("copy_to_clipboard");
  if (copyToClipboardCheckbox.checked) {
    // Copy the email body to the clipboard
    copyEmailsBody();
  }

  const mailtoUrl = `mailto:${to}?cc=${cc}&subject=${rfoSubject}&body=${textForEmailsBody}`;

  window.open(mailtoUrl);

  console.log('Names:', names)
  console.log('Emails:', emails)
}


function copyEmailsBody() {
  const emailsBodyHTML = document.getElementById("emails_body").innerHTML;
  
  // Crear un elemento div temporal
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = emailsBodyHTML;
  
  // Agregar el div al DOM
  document.body.appendChild(tempDiv);
  
  // Seleccionar el contenido del div
  const range = document.createRange();
  range.selectNode(tempDiv);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  
  try {
    // Copiar el contenido seleccionado al portapapeles
    document.execCommand("copy");
    alert("Email body copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy email body: ", err);
    alert("Failed to copy email body. Please try again or use alternative method.");
  } finally {
    // Limpiar la selección y eliminar el div del DOM
    window.getSelection().removeAllRanges();
    document.body.removeChild(tempDiv);
  }
}

/*

Send the email to
Post Incident Distribution <RFO_Post_Incident_Distribution@goto.com>

CC:
Legal team:Lance Brimhall <Lance.Brimhall@goto.com>;
Comms team: Jen Mathews <jen.mathews@goto.com>
Management: Olga Lagunova <Olga.Lagunova@goto.com>; 
Simon Perreault <simon.perreault@goto.com>; 
Madhusudan Krishnapuram <madhusudan.krishnapuram@goto.com>
NOC - Group <NOC-Group@logmein.com>
FRT: <jive-frt@goto.com>

*/

let createDistributionEmail = () => {
  if (names.length === 0 || emails.length === 0) {
    alert("CSV file has not been uploaded. Please upload the CSV file. 😉");
    return; 
  }

  let rfoProducts = getProducts();
  let finalIncidentsDate_mm_dd_yyyy = document.getElementById("start_date").value;

  let finalIncidentsDate_LongDate = formatDate_LongFormat(finalIncidentsDate_mm_dd_yyyy)

  finalIncidentsDate_mm_dd_yyyy = formatDate_mm_dd_yyyy(finalIncidentsDate_mm_dd_yyyy);

  rfoProducts = fixProducts(rfoProducts);

  let rfoIssue = document.getElementById("incidents_title").value;

  //RFO - [Product] - [Issue] - mm/dd/yyyy

  let rfoSubject = `RFO - ${rfoProducts} - 
  ${rfoIssue} - ${finalIncidentsDate_mm_dd_yyyy}`;

  /*
  Names: (10) ['Name', 
  1 'NOC - Group',
  2 'ExternalCommunications', 
  3 'Jen Mathews', 
  4 'Lance Brimhall', 
  5 'FRT', 
  6 'Incident Distribution', 
  7 'Olga Lagunova', 
  8 'Simon Perreault', 
  9 'Madhusudan Krishnapuram']
  */
  
  let to = emails[6];
  let cc = emails[4] + ", " + emails[3] + ", " + 
  emails[7] + ", " + emails[8] + ", " + 
  emails[9] + ", " + emails[1] + ", " + emails[5];

  let emailsBody = `Hello All,
  
BLUF: The following .pdf attachment is the reason for outage for use when communicating with customers about the recent event with ${rfoProducts} - ${rfoIssue} on ${finalIncidentsDate_LongDate}.

This is for communicating with our major customers about what happened, when, why, and what we’re doing to make sure it doesn’t happen again.

Should you have any questions or comments, please feel free to contact the NOC.

Best regards,`;

  emailsBody = encodeURIComponent(emailsBody);

  const mailtoUrl = `mailto:${to}?cc=${cc}&subject=${rfoSubject}&body=${emailsBody}`;

  alert("Email will be created. Remember to attach the RFO's PDF! 😉")

  window.open(mailtoUrl);

  console.log('Names:', names)
  console.log('Emails:', emails)
}