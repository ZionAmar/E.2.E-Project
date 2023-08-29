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
let Time = "";
(sec = 0), (min = 0);
function Timer() {
  setInterval(() => {
    Time = `${addZero(min)}:${addZero(sec++)}`;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    document.querySelector(".Timer").innerHTML = `Timer: ${Time}`;
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
let isMuted = "";
Menu();

function Menu() {
  document.querySelector("#gameScreen").style.opacity = 1;
  document.querySelector("#title").innerHTML = "Duck Man Game";
  document.querySelector(".Hud").innerHTML = "";
  inputName = `<input class="PlayerName" placeholder="Enter Your Name..." type="text" />`;
  Btns = [
    `<button class="btn" onclick="startGame()"><b>Start Game</b></button>`,
    `<button class="btn" id="isMuted" onclick="Mute()"></button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Menu Game</h1>${inputName}${Btns[0]}${Btns[1]}${Btns[2]}`;
  Mute();
}
function Mute() {
  let txt = "";
  if (!isMuted) {
    txt = ` Mute <i class='fas fa-volume-mute'></i>`;
    isMuted = "true";
  } else {
    txt = ` Unmute <i class="fas fa-volume-up"></i>`;
    isMuted = "";
  }
  document.querySelector("#isMuted").innerHTML = txt;
}
function Pause() {
  StartStop();
  Mute();
  inputName = "";
  document.querySelector("#gameScreen").style.opacity = 0.1;
  document.querySelector(".Menu").style.display = "flex";
  Btns = [
    `<button class="btn" onclick="Play()"><b>Resume</b></button>`,
    `<button class="btn" onclick="Menu()">New Game</button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Pause Menu</h1>${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Play() {
  StartStop();
  document.querySelector(".Menu").style.display = "none";
  document.querySelector("#gameScreen").style.opacity = 1;
}
function Exit() {
  if (confirm("Are you sure?")) window.close();
}
let PlayerName = "";
function startGame() {
  if (inputName) {
    PlayerName = document.querySelector(".PlayerName").value;
  }
  if (PlayerName) {
    document.querySelector(".Menu").style.display = "none";
    document.querySelector("#gameScreen").style.opacity = 1;
    StartStop();
    (sec = 1), (min = 0);
    document.querySelector("#title").innerHTML = "Duck Man Game";
    trees();
    clouds();
    document.querySelector(".Hud").innerHTML = `
  <div class="Player">Player: ${PlayerName}</div>
  <button class="pause" onclick="Pause()" style="font-size:44px"><i class="fa fa-pause"></i></button>
  <div class="Timer">Timer: 00:00</div>`;
    Timer();
  } else {
    alert("Please enter your name!");
  }
}
function GameOver() {
  StartStop();
  document.querySelector("#title").innerHTML = "";
  document.querySelector("#gameScreen").style.opacity = 0;
  document.querySelector(".Menu").style.display = "flex";
  document.querySelector(
    ".Menu"
  ).innerHTML = `<div class="GameOver">Game Over</div>`;
  setTimeout(function () {
    document.querySelector("#title").innerHTML = "High Score";
    document.querySelector(".Menu").innerHTML = `<div class="Table">
  <table>
  <thead>
  <tr>
      <th>Place</th>
      <th>Name</th>
      <th>Time</th>
  </tr>
  </thead>
  <tbody id="mainTable"></tbody>
</table></div><div><button class="btn" onclick="Menu()" style="width: 150px;">Play Again</button><button class="btn" onclick="Exit()" style="width: 150px;">Exit</button></div>`;
    localStoragePlayerScore(Time, PlayerName);
  }, 2000);
}
function CreateTble(data) {
  let str = "";
  let position = 0;
  for (let line of data) {
    str += "<tr>";
    str += `<td>${++position}</td>`;
    str += `<td>${line.Name}</td>`;
    str += `<td>${line.Time}</td>`;
    str += "</tr>";
  }
  document.getElementById("mainTable").innerHTML = str;
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
  if (arrayObj.length > 7) {
    arrayObj.splice(7, arrayObj.length - 7);
  }
  localStorage.playerStatic = JSON.stringify(arrayObj);
  CreateTble(arrayObj);
  return arrayObj;
}

//----Nati Pinyan--------------------------------------
