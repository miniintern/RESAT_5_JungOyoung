// 페이지가 로드되면 달력함수를 렌더링
/*
    달력 렌더링 할 때 필요한 정보 목록 
    - 현재 월(초기값 : 현재 시간)
    - 금월 마지막일 날짜와 요일
    - 전월 마지막일 날짜와 요일
*/
$(document).ready(function() {
    calendarInit();
});


function calendarInit() {

    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
    
    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    //console.log(thisMonth);
    //Thu Nov 16 2023 00:00:00 GMT+0900 (한국 표준시)

    // 캘린더 렌더링, 이번 달
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        //console.log(prevDate, prevDay, nextDate, nextDay);

        // year-month class에 현재 년 월 표기
        $('.year-month').text(currentYear + '.' + (currentMonth + 1));

        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }
    }

    // 이전달로 이동
    $('.go-prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    // 다음달로 이동
    $('.go-next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth); 
    });
}

//메모 -------------------------------------------------------------
var modal = $('#calendarModal');

    // 날짜 클릭 이벤트 처리 (메모 모달창 띄우기)
    $('.dates').on('click', '.current', function() {
        modal.find('input').val(''); // input에 입력되어있는 값들을 모두 지우기! 안 그러면 전에 작성한 값들이 남음
        var clickedDate = $(this).text(); // 클릭한 날짜 가져오기
        $('#todayDate').text(clickedDate + '일'); // 모달 창에 날짜 정보 표시

        modal.modal('show'); // 모달 창 표시
    });
    // END 날짜 클릭 이벤트 처리 (메모 모달창 띄우기)

    // 모달 창 닫기
    $('#closeBtn').on('click', function() {
        modal.modal('hide');
    });


var add = document.getElementById('add');
var remove = document.getElementById('remove');
var todoList = document.getElementById('todoList');
var todoInput = document.getElementById('todo');
		
//'추가' 버튼 또는 Enter 키를 누르면 할 일을 추가하는 함수
function addTodo () { 
    if(todoInput.value !== ''){
        var li = document.createElement('li');
        // li 요소에 스타일 추가
        li.style.listStyleImage = 'url("x.png")';
    
        var todoText = document.createElement('span');
        todoText.textContent = todoInput.value;
        
        var editButton = document.createElement('button');
        editButton.textContent = '수정';
        editButton.classList.add('btn', 'btn-outline-success', 'btn-sm'); // 버튼에 class 추가

        editButton.addEventListener('click', function() {
            var newTodoText = prompt('수정할 내용을 입력하세요.');
            if (newTodoText !== null) {
                todoText.textContent = newTodoText;
            }
        });
        
        li.appendChild(todoText);
        li.appendChild(editButton);
        todoList.appendChild(li);
        
        todoInput.value = '';
        remove.style.visibility = 'visible';
    } else {
        alert('내용을 입력해주세요.');
    }
}

// Enter 키가 입력되면 할 일을 추가하는 함수 호출
todoInput.onkeydown = function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
        addTodo();
    }
}
    
//'모두 지우기' 버튼을 누르면 모든 할 일을 삭제하는 함수
function removeTodo () {
    var really = confirm('할 일을 모두 지우시겠습니까?');
    if (really) {
        todoList.innerHTML = '';
        remove.style.visibility = 'hidden';
        alert('할 일이 모두 삭제되었습니다.');
    } else {
        alert('취소되었습니다.');
    }
}

// 할 일을 클릭하면 해당 할 일을 삭제하는 함수
todoList.onclick = function (event) {
    var target = event.target;
    if (target.nodeName === 'LI') {
        var really = confirm('정말 지우시겠습니까?');
        if (really) {
            target.remove();
        }
    }
}