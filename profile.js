// DARK MODE
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

/* =========================
   LOAD PROFILE DATA
========================= */

async function loadProfile() {
  const data = JSON.parse(localStorage.getItem("analysis"));

  document.getElementById("name").innerText = "Student";
  document.getElementById("email").innerText = "local@user.com";

  document.getElementById("nameDetail").innerText = "Student";
  document.getElementById("emailDetail").innerText = "local@user.com";

  document.getElementById("job").innerText =
    localStorage.getItem("jobRole") || "Not set";

  document.getElementById("avatar").innerText = "S";

  // skills (completed = matched skills)
  let skillsHTML = "";
  if (data && data.matchedSkills.length > 0) {
    data.matchedSkills.forEach(skill => {
      skillsHTML += `<p>✔ ${skill}</p>`;
    });
  } else {
    skillsHTML = "<p>No skills yet.</p>";
  }

  document.getElementById("skillsContainer").innerHTML = skillsHTML;

  // goals
  let goalsHTML = "";
  if (data && data.missingSkills.length > 0) {
    data.missingSkills.forEach(skill => {
      goalsHTML += `<p>🎯 Learn ${skill}</p>`;
    });
  } else {
    goalsHTML = "<p>No goals yet.</p>";
  }

  document.getElementById("goalsContainer").innerHTML = goalsHTML;
}

loadProfile();

/* =========================
   PROGRESS TRACKER
========================= */

const data = JSON.parse(localStorage.getItem("analysis"));

if (data && data.missingSkills) {

  const skills = data.missingSkills.map(skill => ({
    name: skill,
    completed: false
  }));

  function renderSkills() {
    let container = document.getElementById("skillsList");
    container.innerHTML = "";

    skills.forEach((skill, index) => {
      container.innerHTML += `
        <div>
          <input type="checkbox" onchange="toggleSkill(${index})">
          ${skill.name}
        </div>
      `;
    });
  }

  function toggleSkill(index) {
    skills[index].completed = !skills[index].completed;
    updateProgress();
  }

  function updateProgress() {
    let completed = skills.filter(s => s.completed).length;
    let total = skills.length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("percent").innerText = percent + "%";
  }

  renderSkills();
}