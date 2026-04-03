function analyzeSkills(){

alert("Welcome to SkillSync AI 🚀");

}
document.querySelector(".cta-btn").addEventListener("click",function(){
    alert("Welcome to Skill Gap Analyzer 🚀");
});
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    alert("Login Successful 🚀");
});
document.getElementById("signupForm").addEventListener("submit", function(e){
    e.preventDefault();

    alert("Account Created Successfully 🎉");
});

// Sidebar toggle (mobile)
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Navigation
function navigate(page) {
  window.location.href = page;
}

// Logout (Firebase ready)
function logout() {
  alert("Logged out!");
  // later: firebase.auth().signOut()
}

// ✅ Donut animation
function setDonut(percent) {
  document.getElementById("percentText").innerText = percent + "%";

  const offset = 314.16 - (percent / 100) * 314.16;

  document.getElementById("donutRing")
    .style.strokeDashoffset = offset;
}


// ✅ Add skills to UI
function addSkills(listId, skills, type) {
  const list = document.getElementById(listId);

  skills.forEach(skill => {
    const li = document.createElement("li");
    li.className = "skill-row " + type;
    li.innerText = skill;
    list.appendChild(li);
  });
}
function addSkill() {
    const input = document.getElementById('customSkillInput');
    const container = document.getElementById('skillsTagContainer');
    
    if (input.value.trim() !== "") {
        // Create a new tag element
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = `${input.value} <span style="cursor:pointer; margin-left:5px" onclick="this.parentElement.remove()">×</span>`;
        
        // Add to container and clear input
        container.appendChild(tag);
        input.value = "";
    }
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

// Allow pressing "Enter" to add a skill
document.getElementById('customSkillInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addSkill();
    }
});
// index page after login
let questions = [];
let current = 0;
let answers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const qCount = document.getElementById("qCount");
const nextBtn = document.getElementById("nextBtn");

// 🔥 REAL-TIME LISTENER
db.collection("questions").onSnapshot(snapshot => {
  questions = snapshot.docs.map(doc => doc.data());
  showQuestion();
});

function showQuestion() {
  let q = questions[current];

  if (!q) return;

  qCount.innerText = `Question ${current + 1} of ${questions.length}`;
  questionEl.innerText = q.question;

  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    let div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;

    div.onclick = () => {
      document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      div.classList.add("selected");
      answers[current] = opt;
    };

    optionsEl.appendChild(div);
  });

  updateProgress();
}

nextBtn.onclick = () => {
  if (!answers[current]) {
    alert("Select an option!");
    return;
  }

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    submitData();
  }
};

function updateProgress() {
  let percent = (current / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

// 🔥 SAVE TO FIREBASE
function submitData() {
  db.collection("responses").add({
    answers: answers,
    createdAt: new Date()
  });

  alert("Completed 🎉");
}

// LOAD DASHBOARD DATA FROM FIREBASE
db.collection("dashboard").doc("user1").onSnapshot(doc => {
  let data = doc.data();

  // Progress
  document.getElementById("skillProgress").style.width = data.progress + "%";
  document.getElementById("progressText").innerText = data.progress + "%";

  // Skills
  let skillsHTML = "";
  data.skills.forEach(skill => {
    skillsHTML += `<span class="skill">${skill}</span>`;
  });
  document.getElementById("skillsList").innerHTML = skillsHTML;

  // Suggestions
  let sugHTML = "";
  data.suggestions.forEach(s => {
    sugHTML += `<div>💡 ${s}</div>`;
  });
  document.getElementById("suggestionsList").innerHTML = sugHTML;
});
const toggleBtn = document.getElementById("themeToggle");


// analyzebutton js

async function analyzeSkills() {
  const jobRole = document.querySelector("input[placeholder='Search for a job role...']").value;

  const skills = [];
  document.querySelectorAll("#skillsTagContainer span").forEach(tag => {
    skills.push(tag.innerText);
  });

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userSkills: skills,
      jobRole: jobRole
    })
  });

  const data = await res.json();

  // ✅ SAVE DATA LOCALLY
  localStorage.setItem("analysis", JSON.stringify(data));
  localStorage.setItem("jobRole", jobRole);

  // 👉 GO TO RESULT PAGE
  window.location.href = "result.html";
}
