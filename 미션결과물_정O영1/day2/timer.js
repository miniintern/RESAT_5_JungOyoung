let hour, min, sec;
let timer;


function set10() {
    document.querySelector("#startMin").value = 10;
}
function set15() {
    document.querySelector("#startMin").value = 15;
}
function set30() {
    document.querySelector("#startMin").value = 30;
}

function startTimer() {
    // START 버튼 클릭 시 입력 영역 사라짐
    document.getElementById("inputTimer").style.display = 'none';
    document.getElementById("outoTimer").style.display = 'none';

    hour = document.querySelector("#startHour").value;
    if (hour === "") hour = 0;
    min = document.querySelector("#startMin").value;
    if (min === "") min = 0;
    sec = document.querySelector("#startSec").value;
    if (sec === "") sec = 0;
    timer = setInterval(countTimer, 1000);
}

function countTimer() {
    if (sec != 0) {
        sec--;
    } else {
        if (min != 0) {
            min--;
            sec = 59;
        } else {
            if (hour != 0) {
                hour--;
                min = 59;
                sec = 59;
            } else {
                resetTimer();
                clearInterval(timer);
                playAlertSound();
            }
        }
    }
    document.querySelector("#display").innerText = hour + ":" + min + ":" + sec;
}

function playAlertSound() {
    const audio = new Audio('alert.mp3');
    audio.play();
    setTimeout(function(){alert("타이머 종료")},100);
}


function stopTimer() {
    // STOP 버튼 클릭 시 카운트 다운 정지
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    // RESET 버튼 클릭 시 입력 영역 나타남
    document.getElementById("inputTimer").style.display = 'block';
    document.getElementById("outoTimer").style.display = 'block';

    document.querySelector("#display").innerText = "00 : 00 : 00";

    document.getElementById("startHour").value = "";
    document.getElementById("startMin").value = "";
    document.getElementById("startSec").value = "";
}

function currentTime() {
    const date = new Date();
    const currentHour = String(date.getHours()).padStart(2, "0");
    const currentMinutes = String(date.getMinutes()).padStart(2, "0");
    const currentSecond = String(date.getSeconds()).padStart(2, "0");

    document.querySelector("#currentTime").innerText = '현재 시간은 ' + `${currentHour}:${currentMinutes}:${currentSecond}` + ' 입니다';
}
currentTime();
setInterval(currentTime, 1000);


