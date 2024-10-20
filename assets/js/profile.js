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
  } = profileData;

  document.getElementById("canvas").innerHTML = `
      <div class="introduction">
        <div class="profile">
          <div class="category">Personal Information <span>Edit</span></div>
          <div class="container">
            <p>Name: <span id="name">${name}</span></p>
            <p>Email: <span id="email">${email}</span></p>
            <p>Contact: <span id="contact">${contact}</span></p>
            <p>Current Town/City: <span id="current-town">${currenttown}</span></p>
            <p>Home Town/City: <span id="home-town">${hometown}</span></p>
          </div>

          <div class="category">Professional Information <span>Edit</span></div>
          <div class="container">
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

          <div class="category">Educational Background <span>Edit</span></div>
          <div class="container">
            <p>Degree: <span id="degree">BSc in Physics from <b>Khulna University</b></span></p>
            <p>Graduation Year: <span>${graduation}</span></p>
            <p>Batch: <span>${batch}</span></p>
            <p>Student ID: <span>${id}</span></p>
            <p>Other Degrees: <span id="other-degrees"></span></p><div id="education"></div>
            <p>Achievements During Education:</p><div id="eduachievement"></div>
          </div>

          <div class="category">Social Presence <span>Edit</span></div>
          <div class="container">
            <p>LinkedIn Profile: <a href="#" target="_blank">${linkedin}</a></p>
            <p>Facebook Profile: <a href="#" target="_blank">${facebook}</a></p>
            <p>GitHub Profile: <a href="#" target="_blank">${github}</a></p>
            <p>Researchgate Profile : <a href="#" target="_blank">${researchgate}</a></p>
            <p>Personal Website: <a href="#" target="_blank">${website}</a></p>
          </div>

          <div class="category">Alumni Engagement <span>Edit</span></div>
          <div class="container">
            <p>Available for Events? <span>${event}</span></p>
            <p>Available for Reunions? <span>${reunion}</span></p>
            <p>Willing to Sponsor Events? <span>${sponsor}</span></p>
            <p>Willing to Deliver Guest Lectures? <span>${lecture}</span></p>
          </div>

          <div class="category">Additional Information <span>Edit</span></div>
          <div class="container">
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