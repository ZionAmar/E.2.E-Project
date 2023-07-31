//----Moshe Cohen---------------------------------------------------
//--jump-----------
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
//--Timer-----------
let sec = 0,
  min = 0;
function Timer() {
  setInterval(() => {
    let Time = `Timer:  ${addZero(min)}:${addZero(sec++)}`;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    document.querySelector(".Timer").innerHTML = Time;
  }, 1000);
}
function addZero(Val) {
  if (Val.toString().length == 1) {
    return `0${Val}`;
  } else {
    return `${Val}`;
  }
}
//----Zion Amar---------------------------------------------------
function startGame() {
  clouds();
  let val = document.querySelector(".PlayerName").value;
  document.querySelector(".Menu").style.display = "none";
  document.querySelector("#gameScreen").style.display = "block";
  document.querySelector(".Hud").innerHTML = `
  <div class="Health">Health</div>
  <div class="Player">Player</div>
  <div class="Timer">Timer</div>
  <div class="Points">Points</div>`;
  Timer();
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
    }
    cloud.style.right = `${cloudMotion1++}px`;
  }, 0.5);
}
function random_number(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//----Nati Pinyan--------------------------------------
