//----Moshe Cohen---------------------------------------------------
const character = document.getElementsByClassName("Character")[0];
var isJumping = false,
  Current_position = 0;
function jump() {
  isJumping = true;
  var jump = setInterval(() => {
    Current_position++;
    character.style.bottom = `${Current_position}px`;
    if (Current_position >= 100) {
      clearInterval(jump);
      jump = setInterval(() => {
        Current_position--;
        character.style.bottom = `${Current_position}px`;
        if (Current_position <= 0) {
          clearInterval(jump);
          isJumping = false;
        }
      }, 10);
    }
  }, 10);
}
document.addEventListener("keypress", (e) => {
  if (e.code == "Space" && !isJumping) jump();
});
//----Zion Amar---------------------------------------------------
let score = 0,
  sec = 0,
  min = 0,
  how = 0,
  timer = 0;
function myTimer() {
  sec++;
  let d = new Date(2012, 0, 18, how, min, sec);
  document.querySelector(".Timer").innerHTML =
    "Timer:" + d.toLocaleTimeString();
}
function menu() {
  document.querySelector("#gameScreen").style.display = "none";
}
function startGame() {
  clouds();
  let val = document.querySelector("#inputName").value;
  document.querySelector(".Menu").style.display = "none";

  document.querySelector("#gameScreen").style.display = "block";
  document.querySelector(
    ".Hud"
  ).innerHTML = `<span class="Name">Name: ${val}</span> <span class="Timer">Timer:0:00:00</span> <span class="Points">Points:0</span>

  `;
  timer = setInterval(myTimer, 1000);
}
//----Michael Chemo---------------------------------------------------
function clouds() {
  let cloud = document.getElementsByClassName("cloud")[0],
    cloudMotion1 = -random_number(400, 200),
    isVibesHigh = true;
  cloud.classList.add("CloudVibesHigh");
  setInterval(function () {
    if (cloudMotion1 >= 1500) {
      if (isVibesHigh) {
        isVibesHigh = false;
        cloud.classList.add("CloudVibesLow");
        cloud.classList.remove("CloudVibesHigh");
      } else {
        isVibesHigh = true;
        cloud.classList.remove("CloudVibesLow");
        cloud.classList.add("CloudVibesHigh");
      }
      cloudMotion1 = -random_number(400, 200);
      cloud.style.top = `${random_number(20, 10)}%`;
      console.log(cloud.style.top);
    }
    cloud.style.right = `${cloudMotion1++}px`;
  }, 0.5);
}
function random_number(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//----Nati Pinyan--------------------------------------
