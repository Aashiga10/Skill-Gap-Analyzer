// DARK MODE
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// LOGOUT
function logout() {
  alert("Logged out!");
  window.location.href = "login.html";
}

/* =========================
   FETCH FROM BACKEND
========================= */

// Example API (your friends will create this)
async function loadDashboard() {
  try {
    const email = localStorage.getItem("email");
    const res = await fetch(`http://localhost:5000/dashboard?email=${email}`);;
    const data = await res.json();

    // Update UI
    document.getElementById("username").innerText = data.name;
    document.getElementById("readiness").innerText = data.readiness + "%";
    document.getElementById("known").innerText = data.knownSkills;
    document.getElementById("learn").innerText = data.skillsToLearn;
    document.getElementById("completed").innerText = data.completed;

    document.getElementById("progressFill").style.width =
      data.readiness + "%";

    // Skills
    let skillsHTML = "";
    data.skills.forEach(skill => {
      skillsHTML += `<p>✔ ${skill}</p>`;
    });
    document.getElementById("skillsContainer").innerHTML = skillsHTML;

    // AI Suggestions
    let aiHTML = "";
    data.aiSuggestions.forEach(s => {
      aiHTML += `<div>💡 ${s}</div>`;
    });
    document.getElementById("aiSuggestions").innerHTML = aiHTML;

  } catch (err) {
    console.log(err);

    // DEFAULT DATA (if backend not ready)
    showDummyData();
  }
}

/* =========================
   FALLBACK (NO BACKEND)
========================= */
function showDummyData() {
  document.getElementById("aiSuggestions").innerHTML = `
    <div>No suggestions yet. Please analyze your skills.</div>
  `;
}
loadDashboard();

// Progress page
let skills = [];

// 🔥 LOAD DATA FROM FIREBASE
db.collection("progress").doc("user1").onSnapshot(doc => {
  let data = doc.data();
  skills = data.skills;

  renderSkills();
  updateProgress();
});

function renderSkills() {
  let container = document.getElementById("skillsList");
  container.innerHTML = "";

  skills.forEach((skill, index) => {
    container.innerHTML += `
      <div class="skill-item">
        <div>
          <input type="checkbox" ${skill.completed ? "checked" : ""}
            onchange="toggleSkill(${index})">
          ${skill.name}
        </div>
        ${skill.completed ? '<span class="badge">Completed</span>' : ''}
      </div>
    `;
  });
}

// 🔥 TOGGLE SKILL
function toggleSkill(index) {
  skills[index].completed = !skills[index].completed;

  db.collection("progress").doc("user1").update({
    skills: skills
  });
}

// 🔥 UPDATE PROGRESS
function updateProgress() {
  let completed = skills.filter(s => s.completed).length;
  let total = skills.length;

  let percent = Math.round((completed / total) * 100);

  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "%";
  document.getElementById("progressText").innerText =
    `${completed} of ${total} skills completed`;
}
// 🔥 LOAD USER ROLE (dynamic)
db.collection("users").doc("user1").onSnapshot(doc => {
  let data = doc.data();

  if (data && data.role) {
    document.getElementById("roleText").innerText =
      "Track your learning progress for " + data.role;
  }
});

const toggleBtn = document.getElementById("themeToggle");
