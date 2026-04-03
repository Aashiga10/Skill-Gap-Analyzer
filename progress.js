const data = JSON.parse(localStorage.getItem("analysis"));

if (!data) {
  alert("Please analyze skills first!");
  window.location.href = "home.html";
}

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