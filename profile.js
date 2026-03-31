// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

/* =========================
   LOAD PROFILE DATA
========================= */

async function loadProfile() {
  try {
    const email = localStorage.getItem("email");

    const res = await fetch(`http://localhost:5000/profile?email=${email}`);
    const data = await res.json();

    // BASIC INFO
    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;

    document.getElementById("nameDetail").innerText = data.name;
    document.getElementById("emailDetail").innerText = data.email;
    document.getElementById("job").innerText = data.jobRole || "Not set";

    // AVATAR LETTER
    document.getElementById("avatar").innerText =
      data.name.charAt(0).toUpperCase();

    // SKILLS
    let skillsHTML = "";
    if (data.skills && data.skills.length > 0) {
      data.skills.forEach(skill => {
        skillsHTML += `<p>✔ ${skill}</p>`;
      });
    } else {
      skillsHTML = "<p>No skills completed yet.</p>";
    }
    document.getElementById("skillsContainer").innerHTML = skillsHTML;

    // GOALS (based on job role)
    let goalsHTML = "";
    if (data.goals && data.goals.length > 0) {
      data.goals.forEach(goal => {
        goalsHTML += `<p>🎯 ${goal}</p>`;
      });
    } else {
      goalsHTML = "<p>Set your dream job to see goals.</p>";
    }
    document.getElementById("goalsContainer").innerHTML = goalsHTML;

  } catch (err) {
    console.log(err);
  }
}

loadProfile();