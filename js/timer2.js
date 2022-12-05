var getHour = document.querySelector("#hour"),
  getMin = document.querySelector("#min"),
  getSecond = document.querySelector("#sec");
const recordBtn = document.querySelector("#record");
const ul = document.querySelector(".js-recordList");
const showTimeH2 = document.querySelector("#showTime");

let timer_sec;
let timer_min;
let timer_hour;

let timer = 0;

const RECORDS_LS = "records";
let records = [];

//기록을 local storage에 저장하는 함수
function saveRecords() {
  localStorage.setItem(RECORDS_LS, JSON.stringify(records));
}

// 기록하기 버튼을 누르면 기록을 생성하고 보여주는 함수
function paintRecord(hour, min, sec) {
  const a = document.createElement("a");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  const img = document.createElement("img");
  const div = document.createElement("div");
  div.id = "rightbox";
  span.id = "showTime";
  span2.id = "showResult";
  img.src = "../img/sp1.png";
  const newId = records.length + 1;
  var newHref = "";
  span.innerText = `${hour}:${min}:${sec}`;
  span2.innerText = "결과확인하기 → ";
  li.appendChild(span);
  div.appendChild(img);
  div.appendChild(span2);
  li.appendChild(div);
  li.value = parseInt(hour * 60 * 60) + parseInt(min * 60) + parseInt(sec); //1분 25초가 125로 나옴 // li의 value 값으로 시간을 넘겨주자. 그리고 시간 변수를 글로벌 변수로 해서 showDetail에서 가져다 조건으로 사용하자.
  if (li.value > 600) {
    newHref = `./detail5.html?hour=${hour}&min=${min}&sec=${sec}`;
  } else if (li.value > 300) {
    // 300< <=600
    newHref = `./detail4.html?hour=${hour}&min=${min}&sec=${sec}`;
  } else if (li.value > 120) {
    //120< <=300
    newHref = `./detail3.html?hour=${hour}&min=${min}&sec=${sec}`;
  } else if (li.value > 60) {
    //60< <=120
    newHref = `./detail2.html?hour=${hour}&min=${min}&sec=${sec}`;
  } else {
    // <60
    newHref = `./detail1.html?hour=${hour}&min=${min}&sec=${sec}`;
  }
  a.appendChild(li);
  a.id = newId;
  a.href = newHref;
  ul.appendChild(a);
  const recordObj = {
    hour: hour,
    min: min,
    sec: sec,
    id: newId,
    href: newHref,
  };
  records.push(recordObj);
  saveRecords();
}

// 현재 기록을 가져오는 함수
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

//처음 창이 띄워졌을때 실행되는 함수
function init() {
  loadRecords();
  recordBtn.addEventListener("click", handleRecord);
}
init();
