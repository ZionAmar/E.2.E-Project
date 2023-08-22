//----Moshe Cohen---------------------------------------------------
let Update = setInterval(GameUpdateLoop, 20);
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
function startGame() {
  trees();
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
