var getHour = document.querySelector("#hour"),
  getMin = document.querySelector("#min"),
  getSecond = document.querySelector("#sec");
const recordBtn = document.querySelector("#record");
const ul = document.querySelector(".js-recordList");
let timer_sec;
let timer_min;
let timer_hour;

let timer = 0;

const RECORDS_LS = "records";
let records = [];

function saveRecords() {
  localStorage.setItem(RECORDS_LS, JSON.stringify(records));
}

function paintRecord(hour, min, sec) {
  const a = document.createElement("a");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = records.length + 1;
  const href = "./detail.html";
  span.innerText = `${hour}:${min}:${sec}`;
  li.appendChild(span);
  a.appendChild(li);
  a.id = newId;
  a.href = href;
  ul.appendChild(a);
  const recordObj = {
    hour: hour,
    min: min,
    sec: sec,
    id: newId,
    href: "./detail.html",
  };
  records.push(recordObj);
  saveRecords();
}

function handleRecord(event) {
  event.preventDefault();
  const currentHour = hour.innerText;
  const currentMin = min.innerText;
  const currentSecond = sec.innerText;
  paintRecord(currentHour, currentMin, currentSecond);
}

//click start button
document.getElementById("start").addEventListener("click", function () {
  if (timer > 0) {
    return;
  }

  //var micro = parseInt(document.getElementById("micro").innerText);
  var sec = parseInt(document.getElementById("sec").innerText);
  var min = parseInt(document.getElementById("min").innerText);
  var hour = parseInt(document.getElementById("hour").innerText);

  //start seconds
  timer_sec = setInterval(function () {
    sec++;
    if (sec == 60) {
      sec = "00";
    } else if (sec < 10) {
      sec = "0" + sec;
    }
    document.getElementById("sec").innerText = sec;
  }, 1000);

  //start minutes
  timer_min = setInterval(function () {
    min++;

    if (min == 60) {
      min = 0;
    } else if (min < 10) {
      min = "0" + min;
    }

    document.getElementById("min").innerText = min;
  }, 60000);

  //start hours
  timer_hour = setInterval(function () {
    hour++;

    if (hour < 10) {
      hour = "0" + hour;
    }

    document.getElementById("hour").innerText = hour;
  }, 3600000);

  timer++;
});

//click stop button
document.getElementById("stop").addEventListener("click", function () {
  stop();
});

function stop() {
  //clearInterval(timer_micro);
  clearInterval(timer_sec);
  clearInterval(timer_min);
  clearInterval(timer_hour);

  const stopHour = hour.innerText;
  const stopMin = min.innerText;
  const stopSec = sec.innerText;

  timer--;
  if (timer < 0) timer = 0;
  let context = new Object();
}

//click clear button
document.getElementById("clear").addEventListener("click", function () {
  stop();
  //document.getElementById("micro").innerText = "00";
  document.getElementById("sec").innerText = "00";
  document.getElementById("min").innerText = "00";
  document.getElementById("hour").innerText = "00";
});

function loadRecords() {
  const loadedRecords = localStorage.getItem(RECORDS_LS);
  if (loadedRecords !== null) {
    const parsedRecords = JSON.parse(loadedRecords);
    parsedRecords.forEach(function (record) {
      paintRecord(record.hour, record.min, record.sec);
    });
  }
}

function init() {
  loadRecords();
  recordBtn.addEventListener("click", handleRecord);
}
init();