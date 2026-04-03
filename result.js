// results.js

const data = JSON.parse(localStorage.getItem("analysis"));
const job = localStorage.getItem("jobRole");

document.getElementById("jobTitle").innerText = job;

document.getElementById("percentText").innerText = data.fitScore + "%";

const haveList = document.getElementById("haveList");
data.matchedSkills.forEach(skill => {
  haveList.innerHTML += `<li>${skill}</li>`;
});

const learnList = document.getElementById("learnList");
data.missingSkills.forEach(skill => {
  learnList.innerHTML += `<li>${skill}</li>`;
});