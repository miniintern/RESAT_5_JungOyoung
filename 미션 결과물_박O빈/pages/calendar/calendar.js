const yearMonth = document.querySelector(".year-month");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const calendarTable = document.querySelector(".calendar-table");
const memoModal = document.querySelector(".modal-container");
const memoText = document.querySelector(".memo-text");
const registerButton = document.querySelector(".register-button");
const cancelButton = document.querySelector(".cancel-button");

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let selectedDate = null;

function initCalendar() {
  showCalendar(currentMonth, currentYear);
  prevButton.addEventListener("click", showPrevMonth);
  nextButton.addEventListener("click", showNextMonth);
}

function showCalendar(month, year) {
  clearCalendar();
  renderHeader(month, year);
  renderCalendar(month, year);
}

function clearCalendar() {
  const header = document.querySelector(".calendar-table thead tr");
  const table = document.querySelector(".calendar-table tbody");

  while (header.firstChild) {
    header.removeChild(header.firstChild);
  }

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function renderHeader(month, year) {
  const header = document.querySelector(".calendar-table thead tr");

  for (let day = 0; day < 7; day++) {
    const dayName = document.createElement("th");
    dayName.textContent = getDayName(day);
    header.appendChild(dayName);
  }

  yearMonth.textContent = `${year}년 ${getMonthName(month)}`;
}

function renderCalendar(month, year) {
  const table = document.querySelector(".calendar-table tbody");

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  let dayCounter = 1;

  const prevMonthLastDate = new Date(year, month, 0);
  const prevMonthLastDay = prevMonthLastDate.getDate();

  for (let row = 0; dayCounter <= totalDays; row++) {
    const newRow = document.createElement("tr");

    for (let col = 0; col < 7; col++) {
      const cell = document.createElement("td");
      const date = new Date(year, month, dayCounter);

      if (row === 0 && col < firstDay.getDay()) {
        cell.textContent = prevMonthLastDay - firstDay.getDay() + col + 1;
        cell.classList.add("other-month");
      } else if (dayCounter <= totalDays) {
        cell.textContent = dayCounter;
        dayCounter++;

        if (isToday(date)) {
          const todayIcon = document.createElement("span");
          todayIcon.className = "today-icon";
          cell.appendChild(todayIcon);
        }

        if (getMemo(date)) {
          const memoIcon = document.createElement("span");
          memoIcon.className = "memo-icon";
          cell.appendChild(memoIcon);
        }
      } else {
        cell.textContent = dayCounter - totalDays;
        dayCounter++;
        cell.classList.add("other-month");
      }

      newRow.appendChild(cell);
    }

    table.appendChild(newRow);
  }

  const cells = document.querySelectorAll(".calendar-table tbody td");

  cells.forEach((cell) => {
    cell.addEventListener("click", handleDateClick);
  });
}

function getDayName(day) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[day];
}

function getMonthName(month) {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return months[month];
}

function showPrevMonth() {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }
  showCalendar(currentMonth, currentYear);
}

function showNextMonth() {
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }
  showCalendar(currentMonth, currentYear);
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function handleDateClick(event) {
  const clickedDate = event.target.textContent;
  const clickedCell = event.target;

  if (!clickedCell.classList.contains("other-month")) {
    selectedDate = new Date(currentYear, currentMonth, clickedDate);
    openMemoModal(selectedDate);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

function saveMemo(date, memo) {
  const memoKey = formatDate(date);
  localStorage.setItem(memoKey, memo);
}

function getMemo(date) {
  const memoKey = formatDate(date);
  return localStorage.getItem(memoKey) || "";
}

function openMemoModal(date) {
  registerButton.removeEventListener("click", HandleRegisterClick);

  memoModal.style.display = "block";
  memoText.value = getMemo(date);

  registerButton.addEventListener("click", HandleRegisterClick);

  cancelButton.addEventListener("click", function () {
    closeMemoModal();
  });
}

function closeMemoModal() {
  memoModal.style.display = "none";
}

function HandleRegisterClick() {
  const memo = memoText.value;
  saveMemo(selectedDate, memo);
  closeMemoModal();
  showCalendar(currentMonth, currentYear);
}

initCalendar();
