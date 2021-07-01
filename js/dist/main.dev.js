"use strict";

var question = document.getElementById("question");
var answer = document.getElementById("answer");
var cases = document.getElementsByClassName("case");
var levelSpan = document.getElementById("level");
var timer = document.getElementById("timer");
var time = document.getElementById("time");
var gameModal = document.getElementById("gameModal");
var win = document.getElementById("win");
var lose = document.getElementById("lose");
var lastLevelWin = document.getElementById("lastLevelWin");
var lastLevellose = document.getElementById("lastLevellose");
var player = document.getElementById("player");
var level;
var timeOnPercent;
var maxSeconds = 20;

var init = function init() {
  hideModal();
  level = 1;
  levelSpan.innerHTML = level;
  timeOnPercent = 100;
  setNumbers();
  startTimer();
};

function shuffle(array) {
  var currentIndex = array.length,
      randomIndex; // While there remain elements to shuffle...

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // And swap it with the current element.

    var _ref = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref[0];
    array[randomIndex] = _ref[1];
  }

  return array;
}

var getRandomNumber = function getRandomNumber() {
  return Math.floor(Math.random() * 50) + 1;
};

var setNumbers = function setNumbers() {
  var a = Math.floor(Math.random() * 50) + 1;
  var b = Math.floor(Math.random() * 50) + 1;
  var sign = Math.floor(Math.random() * 100) % 2 + 1;
  console.log(a, b, sign);
  var questionString = "".concat(a, " ").concat(sign == 1 && "+" || "-", " ").concat(b);
  question.innerHTML = questionString;
  var trueAnswer = eval(questionString);
  var case2 = getRandomNumber();
  var case3 = getRandomNumber();
  var case4 = getRandomNumber();
  var casesArray = [trueAnswer];

  while (casesArray.length < 4) {
    var randomNumber = getRandomNumber();
    if (casesArray.indexOf(randomNumber) == -1) casesArray.push(randomNumber);
  }

  casesArray = shuffle(casesArray);

  var _loop = function _loop(i) {
    cases[i].classList.remove("success");
    cases[i].classList.remove("error");
    cases[i].innerHTML = casesArray[i];

    cases[i].onclick = function (event) {
      return check(event.target, casesArray[i], trueAnswer);
    };
  };

  for (var i = 0; i < 4; i++) {
    _loop(i);
  }
};

var check = function check(box, number, trueAnswer) {
  console.log(box);

  if (number == trueAnswer) {
    // alert("topdi");
    box.classList.add("success");
    setTimeout(function () {
      level++;
      levelSpan.innerHTML = level;
      if (timeOnPercent / 10 <= maxSeconds - 3) timeOnPercent += 30;
    }, 300);
  } else {
    // alert("topolmadi");
    box.classList.add("error");
    setTimeout(function () {
      timeOnPercent -= 30;
    }, 300);
  }

  setTimeout(function () {
    setNumbers();
  }, 300);
};

var timerInterval;

var startTimer = function startTimer() {
  timer.innerHTML = 10;
  timerInterval = setInterval(function () {
    timeOnPercent--;
    time.style.width = "".concat(timeOnPercent, "%");
    if (timeOnPercent % 10 == 0) timer.innerHTML = timeOnPercent / 10;

    if (timeOnPercent <= 0) {
      clearInterval(timerInterval);
      showModal();
    }
  }, 100);
};

var showModal = function showModal() {
  var oldLevel = +localStorage.getItem("level");
  console.log(oldLevel);
  gameModal.classList.remove("d-none");

  if (level > oldLevel) {
    lastLevelWin.innerHTML = level;
    win.classList.remove("d-none");
    player.src = "./music/win.mp3";
    localStorage.setItem("level", level);
  } else {
    lastLevelLose.innerHTML = level;
    lose.classList.remove("d-none");
    player.src = "./music/over.mp3";
  }

  player.play();
};

var hideModal = function hideModal() {
  gameModal.classList.add("d-none");
  win.classList.add("d-none");
  lose.classList.add("d-none");
};

window.onload = init;