var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var userdata = null;
var emailKey = null;
var studentid = null;
let entireDbSnapshot = null;
let auth = null;

function sanitizeEmail(email) {
  return email.replace(/[^a-zA-Z0-9]/g, '');
}

function convertObjToText(user) {
  const info = user.val().info;
  
  function extractValues(obj) {
    let values = [];

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        
        values = values.concat(extractValues(obj[key]));
      } else {
        
        values.push(obj[key]);
      }
    }

    return values;
  }
  
  const valuesText = extractValues(info)
    .filter(value => value !== undefined && value !== null && value !== '')
    .join(', ');

  return valuesText;
}

function handleEditBtn(key) {
  const btns = ['personal', 'profession', 'education', 'social', 'engage', 'additional'];

  for (const btn of btns) {
    if (key === 'block') {
      document.getElementById(`btn-${btn}`).style.display = 'block';
    } else {
      document.getElementById(`btn-${btn}`).style.display = 'none';
    }
  }
}

function handleNew() {
  database.ref('/users/' + studentid).update({ new: "No" });
}

function noEditLol() {
  alertMessage(t = "danger", "You can't edit this value.")
}

let alertTimeout = null;

function alertMessage(type = "success", message) {
  const alertSection = document.getElementById("alerts");
  alertSection.innerHTML = message;

  clearTimeout(alertTimeout);

  alertSection.classList.add(type === "success" ? "show-alerts-success" : "show-alerts-danger");

  alertTimeout = setTimeout(() => {
    alertSection.classList.remove("show-alerts-success", "show-alerts-danger");
    alertSection.innerHTML = '';
  }, 3000);
}