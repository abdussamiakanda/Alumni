function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res => {
    verifyUser(res.user);
  }).catch((e) => {
    console.error("Login failed:", e);
  });
}

function GoogleLogout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      checkAuthState();
    })
    .catch((e) => {
      console.log(e);
    });
}

function deleteEmail(){
  const user = firebase.auth().currentUser;
  user.delete().then(() => {}).catch((error) => {});
  GoogleLogout();
}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      userdata = user;
      emailKey = sanitizeEmail(userdata.email.replace("@gmail.com", ""));
      if (auth === "true") {
        verified(user);
        auth = null;
        return;
      }
      verifyUser(user);
    } else {
      showDiv('welcome');
    }
  })
}

function verifyUser(user){
  var isEmail = false;
  var email = user.email
  database.ref('/preusers').once("value").then((snapshot) => {
    isEmail = snapshot.child(sanitizeEmail(email.replace("@gmail.com", ""))).exists();

    if(isEmail === true){
      verified(user);
    }else {
      showDiv('welcome');
      GoogleLogout();
      deleteEmail();
      alertMessage(t="fail","You don't have access to this website!");
    }
  })
}

function verified(user){
  database.ref().once("value").then(snapshot => {
    entireDbSnapshot = snapshot;
    studentid = entireDbSnapshot.child('/preusers/'+emailKey+'/id').val();
    database.ref('/users/' + studentid + '/info').update({image: user.photoURL});
  }).catch(error => {
    console.error("Error loading the entire database: ", error);
  }).then(() => {
    checkUser();
  });
}

function checkUser() {
  const snapshot = entireDbSnapshot.child('/users/'+studentid);
  const isNew = snapshot.child('new').val();

  if (isNew === null) {
    showDiv('profile');
    alertMessage(t="success","Update your profile!");
  } else {
    showDiv('dashboard');
    alertMessage(t="fail","You've logged in!");
  }
}

function showLoginPage(){
  document.getElementById('header').innerHTML = ``;
  document.getElementById('canvas').innerHTML = `<div class="introduction">
    <div class="login-div" id="login_form">
      <br>
      <div class="login-item" id="login_btn">
        <i class="login-i fa fa-google"></i> <b>Log in with Gmail</b>
      </div>
      <br><br>

      If you're logging in for the first time, please enter your student ID below:
      <br><br>

      <input type="text" id="studentid" placeholder="Enter student ID.." class="login-input">

      <div class="login-item" onclick="checkRequest()">
        <b>Request Account</b>
      </div>

      <div id="message"></div>
    </div>
  </div>`;
  document.getElementById("login_btn").setAttribute("onclick", "GoogleLogin()");
}

function checkRequest() {
  const studentid = document.getElementById("studentid").value;

  database.ref('/users').once("value").then((snapshot) => {
    let isUser = snapshot.child(studentid).exists();
    let isOld = snapshot.child(studentid+'/info/email').exists();

    if (!isUser) {
      document.getElementById('message').innerHTML = "Student ID does not exist in database! Please email at abdussamiakanda@gmail.com for further assistance.";
    } else if (isUser && isOld) {
      document.getElementById('message').innerHTML = "Account already exists for "+studentid+"! Click on the above log in button.";
    } else if (isUser && !isOld) {
      auth = 'true';
      firebase.auth().signInWithPopup(provider).then(res => {
        let gmail = sanitizeEmail(res.user.email.replace("@gmail.com", ""))

        database.ref('/preusers').once("value").then((snapshot2) => {
          let isEmail = snapshot2.child(gmail).exists();
          if (isEmail) {
            alertMessage(t="fail","This email is already in use!");
            GoogleLogout();
          } else {
            database.ref('/preusers/' + gmail).update({id: studentid});
            database.ref('/users/' + studentid + '/info').update({email: res.user.email});
          }
        })
      }).catch((e) => {
        console.error("Login failed:", e);
      });
    }
  })
}


checkAuthState();
