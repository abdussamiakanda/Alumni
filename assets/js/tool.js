var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var userdata = null;
var emailKey = null;
var studentid = null;
let entireDbSnapshot = null;

function sanitizeEmail(email) {
  return email.replace(/[^a-zA-Z0-9]/g, '');
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