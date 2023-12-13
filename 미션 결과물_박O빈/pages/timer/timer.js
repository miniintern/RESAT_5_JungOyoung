const hourInput = document.querySelector(".hour-input");
const minInput = document.querySelector(".min-input");
const secInput = document.querySelector(".sec-input");

const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const resetButton = document.querySelector(".reset-button");

let timer;

const setInputDisabled = (disabled) => {
  hourInput.disabled = disabled;
  minInput.disabled = disabled;
  secInput.disabled = disabled;
};

const updateTimerValue = (hour, min, sec) => {
  hourInput.value = String(hour).padStart(2, "0");
  minInput.value = String(min).padStart(2, "0");
  secInput.value = String(sec).padStart(2, "0");
};

const handleStartTimer = () => {
  const hourValue = Number(hourInput.value);
  const minValue = Number(minInput.value);
  const secValue = Number(secInput.value);

  if (hourValue === 0 && minValue === 0 && secValue === 0) {
    alert("시간을 입력하세요");
    hourInput.focus();
    return;
  }

  setInputDisabled(true);

  let totalSecond = hourValue * 3600 + minValue * 60 + secValue;

  timer = setInterval(() => {
    if (totalSecond === 0) {
      clearInterval(timer);
      alert("타이머 종료");
      setInputDisabled(true);
      return;
    } else {
      totalSecond--;

      const hour = Math.floor(totalSecond / 3600);
      const min = Math.floor((totalSecond % 3600) / 60);
      const sec = totalSecond % 60;

      updateTimerValue(hour, min, sec);
    }
  }, 1000);
};

const handleStopTimer = () => {
  clearInterval(timer);
  setInputDisabled(false);
};

const handleResetTimer = () => {
  clearInterval(timer);
  updateTimerValue(0, 0, 0);
  setInputDisabled(false);
  hourInput.focus();
};

const handleClearInput = (e) => {
  e.target.value = "";
};

hourInput.addEventListener("focus", handleClearInput);
minInput.addEventListener("focus", handleClearInput);
secInput.addEventListener("focus", handleClearInput);

startButton.addEventListener("click", handleStartTimer);
stopButton.addEventListener("click", handleStopTimer);
resetButton.addEventListener("click", handleResetTimer);
