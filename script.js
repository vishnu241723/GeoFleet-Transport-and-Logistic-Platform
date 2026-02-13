const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");

let mapInitialized = false;

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const user = document.getElementById("userId").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    loginPage.style.display = "none";
    sidebar.style.display = "block";
    content.style.display = "block";

    if (!mapInitialized) {
      initMap();
      mapInitialized = true;
    }
  } else {
    alert("Invalid credentials! Use admin / 1234");
  }
});

function initMap() {

  const map = L.map("map").setView([9.8, 78.1], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  const rajapalayam = [9.45, 77.55];
  const virudhunagar = [9.5774, 78.1216];
  const madurai = [9.9252, 78.1198];
  const dindigul = [10.367, 78.0];

  const route = [
    rajapalayam,
    virudhunagar,
    madurai,
    dindigul
  ];

  L.polyline(route, {
    color: "red",
    weight: 4
  }).addTo(map);

  const marker = L.marker(rajapalayam).addTo(map);
  marker.bindPopup("Vehicle: TN-67-RJ-1001<br>Driver: K. Raj");

  let index = 0;

  setInterval(() => {
    index = (index + 1) % route.length;
    marker.setLatLng(route[index]);
  }, 2000);
}
