const h2 = document.querySelector("#showTime");

let url = document.location.href;
//console.log(url);

let query = document.location.search;
//console.log(query);

let params = new URLSearchParams(query);
let hour = params.get("hour");
let min = params.get("min");
let sec = params.get("sec");
console.log(hour, min, sec);

h2.innerText = `${hour}:${min}:${sec}`;
