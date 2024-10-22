function showProfile() {
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const profileData = profileSnapshot.val() || {};

  const {
    name = '',
    email = '',
    contact = '',
    currenttown = '',
    hometown = '',
    jobtitle = '',
    employer = '',
    industry = '',
    worklocation = '',
    experience = '',
    expertise = '',
    mentor = '',
    colab = '',
    linkedin = '',
    facebook = '',
    github = '',
    researchgate = '',
    website = '',
    event = '',
    reunion = '',
    sponsor = '',
    lecture = '',
    graduation = '',
    batch = '',
    id = '',
    image = '',
  } = profileData;

  document.getElementById("canvas").innerHTML = `
      <div class="introduction">
        <div class="profile">
          <img src="${image}" alt="Profile Picture" class="profile-pic">
          <div class="category">Personal Information <span id="btn-personal" onclick="editPersonal()"><i class="fa-solid fa-user-pen"></i> Edit</span></div>
          <div class="container" id="usr-personal">
            <p>Name: <span id="name">${name}</span></p>
            <p>Email: <span id="email">${email}</span></p>
            <p>Contact: <span id="contact">${contact}</span></p>
            <p>Current Town/City: <span id="current-town">${currenttown}</span></p>
            <p>Home Town/City: <span id="home-town">${hometown}</span></p>
          </div>

          <div class="category">Professional Information <span id="btn-profession" onclick="editProfession()"><i class="fa-solid fa-user-pen"></i> Edit</span></div>
          <div class="container" id="usr-profession">
            <p>Current Job Title: <span id="job-title">${jobtitle}</span></p>
            <p>Current Employer: <span id="employer">${employer}</span></p>
            <p>Industry/Field: <span id="industry">${industry}</span></p>
            <p>Work Location: <span id="work-location">${worklocation}</span></p>
            <p>Years of Experience: <span id="experience">${experience}</span></p>
            <p>Past Roles:</p><div id="past-roles"></div>
            <p>Areas of Expertise: <span id="expertise">${expertise}</span></p>
            <p>Willing to Mentor? <span id="mentor">${mentor}</span></p>
            <p>Looking for Collaborations? <span id="collaborate">${colab}</span></p>
          </div>

          <div class="category">Educational Background <span id="btn-education" onclick="editEducation()"><i class="fa-solid fa-user-pen"></i> Edit</span></div>
          <div class="container" id="usr-education">
            <p>Degree: <span id="degree">BSc in Physics from <b>Khulna University</b></span></p>
            <p>Graduation Year: <span>${graduation}</span></p>
            <p>Batch: <span>${batch}</span></p>
            <p>Student ID: <span>${id}</span></p>
            <p>Other Degrees: <span id="other-degrees"></span></p><div id="education"></div>
            <p>Achievements During Education:</p><div id="eduachievement"></div>
          </div>

          <div class="category">Social Presence <span id="btn-social" onclick="editSocial()"><i class="fa-solid fa-user-pen"></i> Edit</span></div>
          <div class="container" id="usr-social">
            <p>LinkedIn Profile: <a href="${linkedin}" target="_blank">${linkedin}</a></p>
            <p>Facebook Profile: <a href="${facebook}" target="_blank">${facebook}</a></p>
            <p>GitHub Profile: <a href="${github}" target="_blank">${github}</a></p>
            <p>Researchgate Profile : <a href="${researchgate}" target="_blank">${researchgate}</a></p>
            <p>Personal Website: <a href="${website}" target="_blank">${website}</a></p>
          </div>

          <div class="category">Alumni Engagement <span id="btn-engage" onclick="editEngage()"><i class="fa-solid fa-user-pen"></i> Edit</span></div>
          <div class="container" id="usr-engage">
            <p>Available for Events? <span>${event}</span></p>
            <p>Available for Reunions? <span>${reunion}</span></p>
            <p>Willing to Sponsor Events? <span>${sponsor}</span></p>
            <p>Willing to Deliver Guest Lectures? <span>${lecture}</span></p>
          </div>

          <div class="category">Additional Information <span id="btn-additional" onclick="editAdditional()"><i class="fa-solid fa-user-pen"></i> Edit</span></div>
          <div class="container" id="usr-additional">
            <p>Hobbies/Interests:</p><div id="hobby"></div>
            <p>Achievements Outside of Work:</p><div id="achievement"></div>
            <p>Travel History:</p><div id="travel"></div>
            <p>Favorite Physics Topics:</p><div id="topics"></div>
            <p>Quote/Motto:</p><div id="motto"></div>
          </div>
        </div>
      </div>
    `;
  showPastRoles();
  showEducation();
  showAdditional();
}

function showPastRoles() {
  document.getElementById("past-roles").innerHTML = '';
  if (!entireDbSnapshot.child('/users/' + studentid + '/info/roles').exists()) {
    return;
  }
  const pastRoles = entireDbSnapshot.child('/users/' + studentid + '/info/roles');
  pastRoles.forEach(role => {
    const { title, employer, location, start, end } = role.val();
    document.getElementById("past-roles").innerHTML += `<p class="left">${title} at ${employer}<br>${start} - ${end}<br>${location}</p>`;
  });
}

function showEducation() {
  if (!entireDbSnapshot.child('/users/' + studentid + '/info/education').exists()) {
    return;
  }
  const education = entireDbSnapshot.child('/users/' + studentid + '/info/education');
  education.forEach(edu => {
    const { degree, institution, location, start, end } = edu.val();
    document.getElementById("education").innerHTML += `<p class="left">${degree}<br>${start} - ${end}<br>${institution}<br>${location}</p>`;
  });
}

function showAdditional() {
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const { hobby, achievement, travel, topics, motto, eduachievement } = profileSnapshot.val();

  if (hobby) {
    document.getElementById("hobby").innerHTML += `<p class="left">${hobby}</p>`;
  }
  if (achievement) {
    document.getElementById("achievement").innerHTML += `<p class="left">${achievement}</p>`;
  }
  if (travel) {
    document.getElementById("travel").innerHTML += `<p class="left">${travel}</p>`;
  }
  if (topics) {
    document.getElementById("topics").innerHTML += `<p class="left">${topics}</p>`;
  }
  if (motto) {
    document.getElementById("motto").innerHTML += `<p class="left">${motto}</p>`;
  }
  if (eduachievement) {
    document.getElementById("eduachievement").innerHTML += `<p class="left">${eduachievement}</p>`;
  }
}

function editPersonal() {
  handleEditBtn();
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const profileData = profileSnapshot.val() || {};

  const {
    name = '',
    email = '',
    contact = '',
    currenttown = '',
    hometown = '',
  } = profileData;

  document.getElementById("usr-personal").innerHTML = `
    <p>Name: <input type="text" id="name" value="${name}"></p>
    <p>Email: <input type="text" value="${email}" disabled></p>
    <p>Contact: <input type="text" id="contact" value="${contact}"></p>
    <p>Current Town/City: <input type="text" id="current-town" value="${currenttown}"></p>
    <p>Home Town/City: <input type="text" id="home-town" value="${hometown}"></p>
    <div class="control">
      <div class="cancel" onclick="showProfile()">Cancel</div>
      <div class="save" onclick="savePersonal()">Save</div>
    </div>
  `;
}

function savePersonal() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const currenttown = document.getElementById("current-town").value;
  const hometown = document.getElementById("home-town").value;

  database.ref('/users/' + studentid + '/info').update({
    name: name,
    contact: contact,
    currenttown: currenttown,
    hometown: hometown,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      handleNew();
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Personal information updated successfully!");
      showProfile();
    })
  }).catch(error => {
    console.error("Error updating personal information: ", error);
  });
}

function editProfession() {
  handleEditBtn();
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const profileData = profileSnapshot.val() || {};

  const {
    jobtitle = '',
    employer = '',
    industry = '',
    worklocation = '',
    experience = '',
    expertise = '',
    mentor = 'Yes/No',
    colab = 'Yes/No',
  } = profileData;

  document.getElementById("usr-profession").innerHTML = `
    <p>Current Job Title: <input type="text" id="job-title" value="${jobtitle}"></p>
    <p>Current Employer: <input type="text" id="employer" value="${employer}"></p>
    <p>Industry/Field: <input type="text" id="industry" value="${industry}"></p>
    <p>Work Location: <input type="text" id="work-location" value="${worklocation}"></p>
    <p>Years of Experience: <input type="text" id="experience" value="${experience}"></p>
    <p>Past Roles: <span class="add" id="btn-role-add" onclick="addRoles()"><i class="fa-solid fa-plus"></i> Add</span></p>
    <div id="past-roles"></div>
    <p>Areas of Expertise: <input type="text" id="expertise" value="${expertise}"></p>
    <p>Willing to Mentor? <input type="text" id="mentor" value="${mentor}"></p>
    <p>Looking for Collaborations? <input type="text" id="colab" value="${colab}"></p>
    <div class="control">
      <div class="cancel" onclick="showProfile()">Cancel</div>
      <div class="save" onclick="saveProfession()">Save</div>
    </div>
  `;
  editPastRoles();
}

function editEducation() {
  handleEditBtn();
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const profileData = profileSnapshot.val() || {};

  const {
    graduation = '',
    batch = '',
    id = '',
    eduachievement = '',
  } = profileData;

  document.getElementById("usr-education").innerHTML = `
    <p>Degree: <span>BSc in Physics from <b>Khulna University</b></span></p>
    <p>Graduation Year: <input type="text" id="graduation" value="${graduation}"></p>
    <p>Batch: <input type="text" id="batch" value="${batch}"></p>
    <p>Student ID: <input type="text" id="id" value="${id}"></p>
    <p>Other Degrees: <span class="add" id="btn-degree-add" onclick="addDegrees()"><i class="fa-solid fa-plus"></i> Add</span></p>
    <div id="education"></div>
    <p>Achievements During Education:</p>
    <textarea id="eduachievement">${eduachievement}</textarea>
    <div class="control">
      <div class="cancel" onclick="showProfile()">Cancel</div>
      <div class="save" onclick="saveEducation()">Save</div>
    </div>
  `;
  editEducationDetails();
}

function editEducationDetails() {
  document.getElementById("education").innerHTML = '';
  if (!entireDbSnapshot.child('/users/' + studentid + '/info/education').exists()) {
    return;
  }
  const education = entireDbSnapshot.child('/users/' + studentid + '/info/education');
  education.forEach(edu => {
    const { degree, institution, location, start, end } = edu.val();
    document.getElementById("education").innerHTML += `
      <div class="left3">
        ${degree}<br>${start} - ${end}<br>${institution}<br>${location}
        <span class="delete" onclick="deleteDegree('${edu.key}')">Delete</span>
      </div>
    `;
  });
}

function deleteDegree(key) {
  database.ref('/users/' + studentid + '/info/education/' + key).remove().then(() => {
    database.ref().once("value").then(snapshot => {
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Degree deleted successfully!");
      editEducationDetails();
    })
  }
  ).catch(error => {
    console.error("Error deleting degree: ", error);
  });
}

function addDegrees() {
  document.getElementById("btn-degree-add").style.display = "none";
  document.getElementById("education").innerHTML += `
    <div class="left2">
      <input type="text" id="degree-title" placeholder="Degree title.. ">
      <input type="text" id="degree-institution" placeholder="Institution.. ">
      <input type="text" id="degree-location" placeholder="Location.. ">

      <div>
        <input type="text" id="degree-start" placeholder="Start date.. ">
        <input type="text" id="degree-end" placeholder="End date.. ">
      </div>
      <div class="control2">
        <div class="cancel" onclick="cancelDegrees()">Cancel</div>
        <div class="save" onclick="saveDegrees()">Save</div>
      </div>
    </div>
  `;
}

function cancelDegrees() {
  document.getElementById("btn-degree-add").style.display = "block";
  editEducationDetails();
}

function saveDegrees() {
  const degree = document.getElementById("degree-title").value;
  const institution = document.getElementById("degree-institution").value;
  const location = document.getElementById("degree-location").value;
  const start = document.getElementById("degree-start").value;
  const end = document.getElementById("degree-end").value;

  database.ref('/users/' + studentid + '/info/education').push({
    degree: degree,
    institution: institution,
    location: location,
    start: start,
    end: end,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      entireDbSnapshot = snapshot;
    }).then(() => {
      document.getElementById("btn-degree-add").style.display = "block";
      alertMessage("success", "Degree added successfully!");
      editEducationDetails();
    })
  }).catch(error => {
    console.error("Error adding degree: ", error);
  });
}

function saveEducation() {
  if (document.getElementById("btn-degree-add").style.display === "none") {
    alertMessage("error", "Please add other degrees before saving!");
    return;
  }
  const graduation = document.getElementById("graduation").value;
  const batch = document.getElementById("batch").value;
  const id = document.getElementById("id").value;
  const eduachievement = document.getElementById("eduachievement").value;

  database.ref('/users/' + studentid + '/info').update({
    graduation: graduation,
    batch: batch,
    id: id,
    eduachievement: eduachievement,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      handleNew();
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Education information updated successfully!");
      showProfile();
    })
  }).catch(error => {
    console.error("Error updating education information: ", error);
  });
}

function saveProfession() {
  if (document.getElementById("btn-role-add").style.display === "none") {
    alertMessage("error", "Please add past roles before saving!");
    return;
  }
  const jobtitle = document.getElementById("job-title").value;
  const employer = document.getElementById("employer").value;
  const industry = document.getElementById("industry").value;
  const worklocation = document.getElementById("work-location").value;
  const experience = document.getElementById("experience").value;
  const expertise = document.getElementById("expertise").value;
  const mentor = document.getElementById("mentor").value;
  const colab = document.getElementById("colab").value;

  database.ref('/users/' + studentid + '/info').update({
    jobtitle: jobtitle,
    employer: employer,
    industry: industry,
    worklocation: worklocation,
    experience: experience,
    expertise: expertise,
    mentor: mentor,
    colab: colab,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      handleNew();
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Professional information updated successfully!");
      showProfile();
    })
  }).catch(error => {
    console.error("Error updating professional information: ", error);
  });
}

function editPastRoles() {
  document.getElementById("past-roles").innerHTML = '';
  if (!entireDbSnapshot.child('/users/' + studentid + '/info/roles').exists()) {
    return;
  }
  const pastRoles = entireDbSnapshot.child('/users/' + studentid + '/info/roles');
  pastRoles.forEach(role => {
    const { title, employer, location, start, end } = role.val();
    document.getElementById("past-roles").innerHTML += `
      <div class="left3">
        ${title} at ${employer}<br>${start} - ${end}<br>${location}
        <span class="delete" onclick="deletePastRole('${role.key}')">Delete</span>
      </div>
    `;
  });
}

function deletePastRole(key) {
  database.ref('/users/' + studentid + '/info/roles/' + key).remove().then(() => {
    database.ref().once("value").then(snapshot => {
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Past role deleted successfully!");
      editPastRoles();
    })
  }).catch(error => {
    console.error("Error deleting past role: ", error);
  });
}

function addRoles() {
  document.getElementById("btn-role-add").style.display = "none";
  document.getElementById("past-roles").innerHTML += `
    <div class="left2">
      <input type="text" id="role-title" placeholder="Job title.. ">
      <input type="text" id="role-employer" placeholder="Employer.. ">
      <input type="text" id="role-location" placeholder="Location.. ">
      <div>
        <input type="text" id="role-start" placeholder="Start date.. ">
        <input type="text" id="role-end" placeholder="End date.. ">
      </div>
      <div class="control2">
        <div class="cancel" onclick="cancelPastRoles()">Cancel</div>
        <div class="save" onclick="savePastRoles()">Save</div>
      </div>
    </div>
  `;
}

function cancelPastRoles() {
  document.getElementById("btn-role-add").style.display = "block";
  editPastRoles();
}

function savePastRoles() {
  const title = document.getElementById("role-title").value;
  const employer = document.getElementById("role-employer").value;
  const location = document.getElementById("role-location").value;
  const start = document.getElementById("role-start").value;
  const end = document.getElementById("role-end").value;

  database.ref('/users/' + studentid + '/info/roles').push({
    title: title,
    employer: employer,
    location: location,
    start: start,
    end: end,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      entireDbSnapshot = snapshot;
    }).then(() => {
      document.getElementById("btn-role-add").style.display = "block";
      alertMessage("success", "Past role added successfully!");
      editPastRoles();
    })
  }).catch(error => {
    console.error("Error adding past role: ", error);
  });
}

function editSocial() {
  handleEditBtn();
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const profileData = profileSnapshot.val() || {};

  const {
    linkedin = '',
    facebook = '',
    github = '',
    researchgate = '',
    website = '',
  } = profileData;

  document.getElementById("usr-social").innerHTML = `
    <p>LinkedIn Profile: <input type="text" id="linkedin" value="${linkedin}"></p>
    <p>Facebook Profile: <input type="text" id="facebook" value="${facebook}"></p>
    <p>GitHub Profile: <input type="text" id="github" value="${github}"></p>
    <p>Researchgate Profile: <input type="text" id="researchgate" value="${researchgate}"></p>
    <p>Personal Website: <input type="text" id="website" value="${website}"></p>
    <div class="control">
      <div class="cancel" onclick="showProfile()">Cancel</div>
      <div class="save" onclick="saveSocial()">Save</div>
    </div>
  `;
}

function saveSocial() {
  const linkedin = document.getElementById("linkedin").value;
  const facebook = document.getElementById("facebook").value;
  const github = document.getElementById("github").value;
  const researchgate = document.getElementById("researchgate").value;
  const website = document.getElementById("website").value;

  database.ref('/users/' + studentid + '/info').update({
    linkedin: linkedin,
    facebook: facebook,
    github: github,
    researchgate: researchgate,
    website: website,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Social profiles updated successfully!");
      showProfile();
    })
  }).catch(error => {
    console.error("Error updating social profiles: ", error);
  });
}

function editEngage() {
  handleEditBtn();
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const profileData = profileSnapshot.val() || {};

  const {
    event = 'Yes/No',
    reunion = 'Yes/No',
    sponsor = 'Yes/No',
    lecture = 'Yes/No',
  } = profileData;

  document.getElementById("usr-engage").innerHTML = `
    <p>Available for Events? <input type="text" id="event" value="${event}"></p>
    <p>Available for Reunions? <input type="text" id="reunion" value="${reunion}"></p>
    <p>Willing to Sponsor Events? <input type="text" id="sponsor" value="${sponsor}"></p>
    <p>Willing to Deliver Guest Lectures? <input type="text" id="lecture" value="${lecture}"></p>
    <div class="control">
      <div class="cancel" onclick="showProfile()">Cancel</div>
      <div class="save" onclick="saveEngage()">Save</div>
    </div>
  `;

}

function saveEngage() {
  const event = document.getElementById("event").value;
  const reunion = document.getElementById("reunion").value;
  const sponsor = document.getElementById("sponsor").value;
  const lecture = document.getElementById("lecture").value;

  database.ref('/users/' + studentid + '/info').update({
    event: event,
    reunion: reunion,
    sponsor: sponsor,
    lecture: lecture,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Engagement preferences updated successfully!");
      showProfile();
    })
  }).catch(error => {
    console.error("Error updating engagement preferences: ", error);
  });
}

function editAdditional() {
  handleEditBtn();
  const profileSnapshot = entireDbSnapshot.child('/users/' + studentid + '/info');
  const profileData = profileSnapshot.val() || {};

  const {
    hobby = '',
    achievement = '',
    travel = '',
    topics = '',
    motto = '',
  } = profileData;

  document.getElementById("usr-additional").innerHTML = `
    <p>Hobbies/Interests:</p>
    <textarea id="hobby">${hobby}</textarea>
    <p>Achievements Outside of Work:</p>
    <textarea id="achievement">${achievement}</textarea>
    <p>Travel History:</p>
    <textarea id="travel">${travel}</textarea>
    <p>Favorite Physics Topics:</p>
    <textarea id="topics">${topics}</textarea>
    <p>Quote/Motto:</p>
    <textarea id="motto">${motto}</textarea>
    <div class="control">
      <div class="cancel" onclick="showProfile()">Cancel</div>
      <div class="save" onclick="saveAdditional()">Save</div>
    </div>
  `;
}

function saveAdditional() {
  const hobby = document.getElementById("hobby").value;
  const achievement = document.getElementById("achievement").value;
  const travel = document.getElementById("travel").value;
  const topics = document.getElementById("topics").value;
  const motto = document.getElementById("motto").value;

  database.ref('/users/' + studentid + '/info').update({
    hobby: hobby,
    achievement: achievement,
    travel: travel,
    topics: topics,
    motto: motto,
  }).then(() => {
    database.ref().once("value").then(snapshot => {
      entireDbSnapshot = snapshot;
    }).then(() => {
      alertMessage("success", "Additional information updated successfully!");
      showProfile();
    })
  }).catch(error => {
    console.error("Error updating additional information: ", error);
  });
}