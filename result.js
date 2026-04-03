// results.js


// document.getElementById("percentText").innerText = data.fitScore + "%";

// const haveList = document.getElementById("haveList");
// data.matchedSkills.forEach(skill => {
//   haveList.innerHTML += `<li>${skill}</li>`;
// });

// const learnList = document.getElementById("learnList");
// data.missingSkills.forEach(skill => {
//   learnList.innerHTML += `<li>${skill}</li>`;
// });

const data = JSON.parse(localStorage.getItem("analysis"));
const job = localStorage.getItem("jobRole");

document.getElementById("jobTitle").innerText = job;

// score
const percent = data.fitScore;
document.getElementById("percentText").innerText = percent + "%";

// donut animation
const offset = 314.16 - (percent / 100) * 314.16;
document.getElementById("donutRing").style.strokeDashoffset = offset;

// skills
data.matchedSkills.forEach(skill => {
  document.getElementById("haveList").innerHTML += `<li>${skill}</li>`;
});

data.missingSkills.forEach(skill => {
  document.getElementById("learnList").innerHTML += `<li>${skill}</li>`;
});