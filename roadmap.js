// let role = "";

// // 🔥 GET USER ROLE
// db.collection("users").doc("user1").onSnapshot(doc => {
//   role = doc.data().role;

//   document.getElementById("roleText").innerText =
//     "Roadmap for " + role;

//   loadRoadmap();
// });

// // 🔥 LOAD ROADMAP BASED ON ROLE
// function loadRoadmap() {
//   db.collection("roadmaps").doc(role).onSnapshot(doc => {
//     let data = doc.data();

//     let html = "";
//     data.steps.forEach((step, i) => {
//       html += `
//         <div class="step">
//           <div class="circle">${i + 1}</div>
//           <div>${step}</div>
//         </div>
//       `;
//     });

//     document.getElementById("roadmapList").innerHTML = html;
//   });
// }