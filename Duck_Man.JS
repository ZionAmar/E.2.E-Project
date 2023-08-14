//----Moshe Cohen---------------------------------------------------
//--jump-----------\
var isJumping = false,
  Current_position = 0;
function Jump() {
  let character = document.getElementsByClassName("Character")[0];
  isJumping = true;
  var Up = setInterval(() => {
    Current_position++;
    character.style.bottom = `${Current_position}px`;
    if (Current_position >= 100) {
      clearInterval(Up);
      Down = setInterval(() => {
        Current_position--;
        character.style.bottom = `${Current_position}px`;
        if (Current_position <= 0) {
          clearInterval(Down);
          isJumping = false;
        }
      }, 10);
    }
  }, 10);
}
document.addEventListener("keypress", (e) => {
  if (e.code == "Space" && !isJumping) Jump();
});
//--Timer-----------
let sec = 1,
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
//--Object-Movment-----------
function Move(object, time) {
  object.style.bottom = "0px";
  object.style.position = "absolute";
  let Obj_pos = 0;
  let go = setInterval(() => {
    object.style.right = `${Obj_pos++}%`;
    if (Obj_pos > 100) {
      Obj_pos = 0;
      clearInterval(go);
    }
  }, time);
}
//----Zion Amar---------------------------------------------------
let inputName = "";
let Btns = [];
document.querySelector("#title").innerHTML = "Duck Man Game";
Menu();
function Menu() {
  inputName = `<input class="PlayerName" placeholder="Enter Your Name..." type="text" />`;
  Btns = [
    `<button class="btn" onclick="startGame()"><b>Start Game</b></button>`,
    `<button class="btn" onclick="Options()">Options</button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector(".Map").style.opacity = 0.1;
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Menu Game</h1>${inputName}${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Options() {
  Btns = [
    `<button class="btn" onclick="Mute()">Mute</button>`,
    `<button class="btn" onclick="Language()">Language</button>`,
    `<button class="btn" onclick="Menu()">Back</button>`,
  ];
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Options</h1>${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Pause() {
  document.querySelector(".Map").style.opacity = 0.1;
  document.querySelector(".Menu").style.display = "flex";
  Btns = [
    `<button class="btn" onclick="Play()"><b>Play</b></button>`,
    `<button class="btn" onclick="startGame()">New Game</button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Paused</h1>${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Exit() {
  if (confirm("Are you sure?")) window.close();
}
function startGame() {
  trees();
  clouds();
  let val = document.querySelector(".PlayerName").value;
  document.querySelector(".Map").style.opacity = 1;
  document.querySelector(".Menu").style.display = "none";
  document.querySelector("#gameScreen").style.display = "block";
  document.querySelector(".Hud").innerHTML = `
  <div class="Health">Health:</div>
  <div class="Player">Player: ${val}</div>
  <button class="pause" onclick="Pause()" style="font-size:44px"><i class="fa fa-pause"></i></button>
  <div class="Timer">Timer: 00:00</div>
  <div class="Points">Points:</div>`;
  Timer();
}
//----Michael Chemo---------------------------------------------------
function clouds() {
  let Map = document.getElementsByClassName("Map")[0],
    cloudMotion1 = -random_number(400, 200),
    cloudMotion2 = -random_number(500, 300);
  create_Cloud(Map, 2);
  let cloud1 = document.getElementsByClassName("clouds")[0],
    cloud2 = document.getElementsByClassName("clouds")[1];
  cloud1.classList.add("CloudVibesHigh");
  cloud2.classList.add("CloudVibesLow");
  setInterval(function () {
    if (cloudMotion1 >= random_number(1500, 1300)) {
      cloudMotion1 = -random_number(400, 200);
      let size = `${random_number(250, 200)}px`;
      cloud1.style.height = size;
      cloud1.style.width = size;
    }
    cloud1.style.right = `${cloudMotion1++}px`;
    if (cloudMotion2 >= random_number(1500, 1300)) {
      cloudMotion2 = -random_number(400, 200);
      let size = `${random_number(150, 100)}px`;
      cloud2.style.height = size;
      cloud2.style.width = size;
    }
    cloud2.style.right = `${cloudMotion2++}px`;
  }, 10);
}
function random_number(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function create_Cloud(elm, numberOfClouds) {
  for (let i = 0; i < numberOfClouds; i++) {
    elm.innerHTML += `<div class="clouds">
    <div></div>
    <div></div>
    <div></div>
    </div>`;
  }
}
function trees() {
  let treeBG_holder = document.getElementsByClassName("Map")[0];
  treeBG_holder.innerHTML += `<div class="treesBG"></div>`;
}
//----Nati Pinyan--------------------------------------
