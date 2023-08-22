//----Moshe Cohen---------------------------------------------------
//--Game-Loop---------
let Update = undefined;
function StartStop() {
  if (Update == undefined) {
    Update = setInterval(GameUpdateLoop, 20);
  } else {
    clearInterval(Update);
    Update = undefined;
  }
}
function GameUpdateLoop() {
  updateObject();
  if (isJumping) Jump();
}
//--jump--------------
const JUMP_SPEED = 4;
const GRAVITY = 0.2;
let isJumping = false;
let Yval;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !isJumping) {
    Yval = JUMP_SPEED;
    isJumping = true;
  }
  if (e.shiftKey && !isJumping) {
    Yval = JUMP_SPEED - 1;
    isJumping = true;
  }
});
function Jump() {
  if (!isJumping) return;
  let duck = document.querySelector(".Character");
  increaseObjectProp(duck, "--bottom", Yval);
  if (getObjectProp(duck, "--bottom") <= 0) {
    setObjectProp(duck, "--bottom", 0);
    isJumping = false;
  }
  Yval -= GRAVITY;
}
//--Objects-----------
let NextObject = 500;
let Xval = 0.5;
function updateObject() {
  document.querySelectorAll(".Object").forEach((Obj) => {
    increaseObjectProp(Obj, "--right", Xval);
    IsDead(document.querySelector(".Character"), Obj);
    if (getObjectProp(Obj, "--right") >= 100) Obj.remove();
  });
  if (NextObject <= 0) {
    createObject();
    NextObject = random_number(2000, 500);
  }
  NextObject -= 10;
}
function createObject() {
  let Obj = document.createElement("div");
  let rand = random_number(2, 0);
  Obj.classList.add(`Object${rand}`);
  Obj.classList.add(`Object`);
  document.getElementsByClassName("Map")[0].append(Obj);
  setObjectProp(Obj, "--right", 0);
  return Obj;
}
function IsDead(duck, Obj) {
  let DuckBottom = getObjectProp(duck, "bottom");
  let ObjHeight = getObjectProp(Obj, "height");
  let ObjRight = getObjectProp(Obj, "right") + getObjectProp(Obj, "width");
  let ObjLeft = getObjectProp(Obj, "left") + getObjectProp(Obj, "width");
  if (DuckBottom < ObjHeight && 1152 < ObjRight && 88 < ObjLeft) {
    GameOver();
  }
}
//--get-set-inc-dec---
function getObjectProp(Elem, Prop) {
  return parseFloat(getComputedStyle(Elem).getPropertyValue(Prop));
}
function setObjectProp(Elem, Prop, Value) {
  Elem.style.setProperty(Prop, Value);
}
function increaseObjectProp(Elem, Prop, inc) {
  setObjectProp(Elem, Prop, getObjectProp(Elem, Prop) + inc);
}
function decreaseObjectProp(Elem, Prop, dec) {
  setObjectProp(Elem, Prop, getObjectProp(Elem, Prop) - dec);
}
//--Timer-------------
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
function localStoragePlayerScore(time, name) {
  let playerStatArry = [];
  if (localStorage.playerStatic)
    playerStatArry = JSON.parse(localStorage.playerStatic);
  let line = { Name: name, Time: time };
  playerStatArry.push(line);
  localStorage.playerStatic = JSON.stringify(playerStatArry);
  return sortToHighScore(playerStatArry);
}
function sortToHighScore(arrayObj) {
  arrayObj.sort((a, b) => {
    let fa = a.Time,
      fb = b.Time;
    if (fa > fb) return -1;

    if (fa < fb) return 1;

    return 0;
  });
  return arrayObj;
}

//----Nati Pinyan--------------------------------------
