function showDiv(div){
  if (div === 'welcome'){
    showWelcome();
    showHeader('login');
  } else if (div === 'login'){
    showLoginPage();
  } else if (div === 'profile'){
    showProfile();
    showHeader('profile');
  } else if (div === 'dashboard'){
    showDashboard();
    showHeader('dashboard');
  }
}

function showHeader(div){
  if (div === 'login'){
    document.getElementById('header').innerHTML = `<div class="nav-link2" onclick="showDiv('login')">Log In</div>`;
  } else if (div === 'dashboard'){
    document.getElementById('header').innerHTML = `
      <div class="welcome">Welcome, ${studentid}</div>
    <div class="nav-link active">Dashboard</div>
    <div class="nav-link" onclick="showDiv('profile')">Profile</div>
    <div class="nav-link2" onclick="GoogleLogout()">Log Out</div>`;
  } else if (div === 'profile'){
    document.getElementById('header').innerHTML = `
      <div class="welcome">Welcome, ${studentid}</div>
    <div class="nav-link" onclick="showDiv('dashboard')">Dashboard</div>
    <div class="nav-link active">Profile</div>
    <div class="nav-link2" onclick="GoogleLogout()">Log Out</div>`;
  } else if (div === 'user'){
    document.getElementById('header').innerHTML = `
      <div class="welcome">Welcome, ${studentid}</div>
    <div class="nav-link" onclick="showDiv('dashboard')">Dashboard</div>
    <div class="nav-link" onclick="showDiv('profile')">Profile</div>
    <div class="nav-link2" onclick="GoogleLogout()">Log Out</div>`;
  }
}

function showWelcome() {
  document.getElementById('canvas').innerHTML = `
  <div class="introduction" id="canvas">
    <div class="introduction-top">
      <div class="intro">
        <div class="name">Alumni of Physics, Khulna University</div>
        <div class="tag">
          This platform serves as a comprehensive database connecting the vibrant community of Physics graduates from Khulna University. Whether you are a proud alumnus, a current student, or a faculty member, our goal is to foster connections, celebrate achievements, and facilitate opportunities for collaboration.
          Explore alumni profiles, reconnect with old friends, discover career journeys, and engage with the ever-growing network of our talented graduates. Stay updated with the latest events, reunions, and initiatives, and contribute your story to inspire the next generation.
          Let's build a stronger network and keep the spirit of Khulna University alive! Welcome to a hub where science, learning, and community meet.
        </div>
      </div>
    </div>


    <div class="obj-name">
      <span>WEBSITE</span>
      <b>FEATURES</b>
    </div>
    <div class="obj-div">
      <div class="obj-item">
        <i class="obj-i fas fa-users"></i>
        <b>CONNECTED COMMUNITY</b>
        Our platform fosters collaboration and networking among alumni, enabling graduates to reconnect, mentor, and grow together.
      </div>
      <div class="obj-item">
        <i class="obj-i fas fa-database"></i>
        <b>COMPREHENSIVE DATABASE</b>
        Explore detailed profiles of Physics alumni from various batches, including academic backgrounds, career journeys, and achievements.
      </div>
      <div class="obj-item">
        <i class="obj-i fas fa-calendar-alt"></i>
        <b>EVENTS & REUNIONS</b>
        Stay up to date with upcoming alumni events, reunions, and conferences to strengthen ties and share memories.
      </div>
      <div class="obj-item">
        <i class="obj-i fas fa-share-alt"></i>
        <b>COLLABORATION OPPORTUNITIES</b>
        Engage in research, career, and mentorship opportunities, leveraging the experience and expertise of fellow alumni.
      </div>
      
    </div>
  </div>`;
}

function showDashboard() {
  document.getElementById('canvas').innerHTML = `
  <div class="introduction">
    <div class="dashboard-top">
      <input type="text" id="search-query" placeholder="Search for alumni..">
      <select class="sort" id="search-filter">
        <option value="none">Filter by</option>
        <option value="batch">Batch</option>
        <option value="id">Student ID</option>
        <option value="citynow">Current Town/City</option>
        <option value="homecity">Home Town/City</option>
        <option value="job">Current Job Title</option>
        <option value="industry">Industry/Field</option>
      </select>
      <div class="search" onclick="showSearch()">Search</div>
    </div>
    <div id="users" class="users"></div>
  </div>`;
  showUsers();
}

function showUsers() {
  document.getElementById('users').innerHTML = '';

  const users = entireDbSnapshot.child('/users');
  users.forEach(user => {
    const {name, jobtitle, employer, industry, batch, id} = user.val().info;

    if (batch && id !== studentid) {
      document.getElementById('users').innerHTML += `
      <div class="user" onclick="showUser('${user.key}')">
        <div class="user-name"><b>Name:</b> ${name}</div>
        <div class="user-item"><b>Batch:</b> ${batch}</div>
        <div class="user-item"><b>Student ID:</b> ${id}</div>
        <div class="user-item"><b>Industry/Field:</b> ${industry}</div>
        <div class="user-item"><b>Current Job:</b> ${jobtitle} at ${employer}</div>
      </div>`;
    }
  });
}

function showUser(userid) {
  showHeader('user');
  const userSnapshot = entireDbSnapshot.child('/users/'+userid);
  const profileData = userSnapshot.val().info || {};

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
    image = ''
  } = profileData;
  document.getElementById('canvas').innerHTML = `
    <div class="introduction">
      <div class="profile">
        <img src="${image}" alt="Profile Picture" class="profile-pic">
        <div class="category">Personal Information</div>
        <div class="container">
          <p>Name: <span id="name">${name}</span></p>
          <p>Email: <span id="email">${email}</span></p>
          <p>Contact: <span id="contact">${contact}</span></p>
          <p>Current Town/City: <span id="current-town">${currenttown}</span></p>
          <p>Home Town/City: <span id="home-town">${hometown}</span></p>
        </div>

        <div class="category">Professional Information</div>
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

        <div class="category">Educational Background</div>
        <div class="container">
          <p>Degree: <span id="degree">BSc in Physics from <b>Khulna University</b></span></p>
          <p>Graduation Year: <span>${graduation}</span></p>
          <p>Batch: <span>${batch}</span></p>
          <p>Student ID: <span>${id}</span></p>
          <p>Other Degrees: <span id="other-degrees"></span></p><div id="education"></div>
          <p>Achievements During Education:</p><div id="eduachievement"></div>
        </div>

        <div class="category">Social Presence</div>
        <div class="container">
          <p>LinkedIn Profile: <a href="${linkedin}" target="_blank">${linkedin}</a></p>
          <p>Facebook Profile: <a href="${facebook}" target="_blank">${facebook}</a></p>
          <p>GitHub Profile: <a href="${github}" target="_blank">${github}</a></p>
          <p>Researchgate Profile : <a href="${researchgate}" target="_blank">${researchgate}</a></p>
          <p>Personal Website: <a href="${website}" target="_blank">${website}</a></p>
        </div>

        <div class="category">Alumni Engagement</div>
        <div class="container">
          <p>Available for Events? <span>${event}</span></p>
          <p>Available for Reunions? <span>${reunion}</span></p>
          <p>Willing to Sponsor Events? <span>${sponsor}</span></p>
          <p>Willing to Deliver Guest Lectures? <span>${lecture}</span></p>
        </div>

        <div class="category">Additional Information</div>
        <div class="container">
          <p>Hobbies/Interests:</p><div id="hobby"></div>
          <p>Achievements Outside of Work:</p><div id="achievement"></div>
          <p>Travel History:</p><div id="travel"></div>
          <p>Favorite Physics Topics:</p><div id="topics"></div>
          <p>Quote/Motto:</p><div id="motto"></div>
        </div>
      </div>
    </div>`;
  showUserPastRoles(userid);
  showUserEducation(userid);
  showUserAdditional(userid);
}

async function showSearch() {
  let ifsearch = 0;
  const query = document.getElementById('search-query').value.toLowerCase();
  const filter = document.getElementById('search-filter').value;
  const usersSnapshot = await entireDbSnapshot.child('/users');
  document.getElementById('users').innerHTML = '';

  usersSnapshot.forEach((userSnapshot) => {
    const { batch = '', id = '', currenttown = '', hometown = '', jobtitle = '', industry = '' } = userSnapshot.val().info || {};
    const batchStr = String(batch);
    const idStr = String(id);
    const currenttownStr = String(currenttown);
    const hometownStr = String(hometown);
    const jobtitleStr = String(jobtitle);
    const industryStr = String(industry);
    const userdata = convertObjToText(userSnapshot);

    if (
      (filter === 'none' && userdata.toLowerCase().includes(query)) ||
      (filter === 'batch' && batchStr.includes(query)) ||
      (filter === 'id' && idStr.includes(query)) ||
      (filter === 'citynow' && currenttownStr.toLowerCase().includes(query)) ||
      (filter === 'homecity' && hometownStr.toLowerCase().includes(query)) ||
      (filter === 'job' && jobtitleStr.toLowerCase().includes(query)) ||
      (filter === 'industry' && industryStr.toLowerCase().includes(query))
    ) {
      ifsearch += 1;
      showSearchResults(userSnapshot);
    }
  });

  let filterStr = {batch: 'batch', id: 'student ID', citynow: 'current town/city', homecity: 'home town/city', job: 'current job title', industry: 'industry/field'};

  if (ifsearch === 0 && filter === 'none') {
    document.getElementById('users').innerHTML = 'No results found.';
  } else if (query === '' && filter !== 'none') {
    document.getElementById('users').innerHTML = 'Enter query to search.';
  } else if (ifsearch === 0 && filter !== 'none') {
    document.getElementById('users').innerHTML = 'No '+filterStr[filter]+' called "'+query+'" found.';
  }
}

function showSearchResults(user) {
  const {name, jobtitle, employer, industry, batch, id} = user.val().info;

  if (batch && id !== studentid) {
    document.getElementById('users').innerHTML += `
    <div class="user" onclick="showUser('${user.key}')">
      <div class="user-name"><b>Name:</b> ${name}</div>
      <div class="user-item"><b>Batch:</b> ${batch}</div>
      <div class="user-item"><b>Student ID:</b> ${id}</div>
      <div class="user-item"><b>Industry/Field:</b> ${industry}</div>
      <div class="user-item"><b>Current Job:</b> ${jobtitle} at ${employer}</div>
    </div>`;
  }
}

function showUserPastRoles(userid) {
  if (!entireDbSnapshot.child('/users/' + userid + '/info/roles').exists()) {
    return;
  }
  const pastRoles = entireDbSnapshot.child('/users/' + userid + '/info/roles');
  pastRoles.forEach(role => {
    const { title, employer, location, start, end } = role.val();
    document.getElementById("past-roles").innerHTML += `<p class="left">${title} at ${employer}<br>${start} - ${end}<br>${location}</p>`;
  });
}

function showUserEducation(userid) {
  if (!entireDbSnapshot.child('/users/' + userid + '/info/education').exists()) {
    return;
  }
  const education = entireDbSnapshot.child('/users/' + userid + '/info/education');
  education.forEach(edu => {
    const { degree, institution, location, start, end } = edu.val();
    document.getElementById("education").innerHTML += `<p class="left">${degree}<br>${start} - ${end}<br>${institution}<br>${location}</p>`;
  });
}

function showUserAdditional(userid) {
  const profileSnapshot = entireDbSnapshot.child('/users/' + userid + '/info');
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
