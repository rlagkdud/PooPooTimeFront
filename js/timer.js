//const timer = document.querySelector(".js-timer"),
//  stpBtn = document.querySelector(".js-timer__stopBtn"),
//  strtBtn = document.querySelector(".js-timer__strBtn");
//
//let TIME = 0;
//let cron; // clearInterval을 위한 변수
//
//function startBtn() {
//  while (1) {
//    TIME = TIME + 1;
//    timer.innerHTML = TIME;
//    sleep(1000);
//  }
//}
//
//strtBtn.addEventListener("click", startBtn);

window.onload = function () {
  let timer_sec;
  let timer_min;
  let timer_hour;
  //let timer_micro;

  let timer = 0;

  //click start button
  document.getElementById("start").addEventListener("click", function () {
    //console.log(timer);
    if (timer > 0) {
      return;
    }

    //var micro = parseInt(document.getElementById("micro").innerText);
    var sec = parseInt(document.getElementById("sec").innerText);
    var min = parseInt(document.getElementById("min").innerText);
    var hour = parseInt(document.getElementById("hour").innerText);

    console.log(sec);
    console.log(min);
    console.log(hour);

    //start seconds
    //timer_micro = setInterval(function () {å
    //  micro++;
    //  if (micro == 100) {
    //    micro = "00";
    //  } else if (micro < 10) {
    //    micro = "0" + micro;
    //  }
    //  document.getElementById("micro").innerText = micro;
    //}, 10);

    //start seconds
    timer_sec = setInterval(function () {
      //console.log(i);
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
      //console.log(hour);
      hour++;

      if (hour < 10) {
        hour = "0" + hour;
      }

      document.getElementById("hour").innerText = hour;
    }, 3600000);

    timer++;
    //console.log(timer);
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

    $.ajax({
      method: "GET",
      url: "get_time",
      data: {
        message: "submit",
        hour: stopHour,
        min: stopMin,
        sec: stopSec,
      },
      dataType: "json",
    });
    console.log(stopHour, stopMin, stopSec);
  }

  //click clear button
  document.getElementById("clear").addEventListener("click", function () {
    stop();
    //document.getElementById("micro").innerText = "00";
    document.getElementById("sec").innerText = "00";
    document.getElementById("min").innerText = "00";
    document.getElementById("hour").innerText = "00";
  });
};
