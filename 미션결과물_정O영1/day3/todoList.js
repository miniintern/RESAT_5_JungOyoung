var add = document.getElementById('add');
var remove = document.getElementById('remove');
var todoList = document.getElementById('todoList');
var todoInput = document.getElementById('todo');

//'추가' 버튼 또는 Enter 키를 누르면 할 일을 추가하는 함수
function addTodo () { 
if(todoInput.value !== ''){
  var li = document.createElement('li');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
  });
  
  var todoText = document.createElement('span');
  todoText.textContent = todoInput.value;
  
  var priority = document.createElement('span');
  priority.textContent = document.querySelector('select').value;

  if (priority.textContent === '아주높음') {
    priority.classList.add('badge', 'rounded-pill', 'badge-very-high');
  } else if (priority.textContent === '높음') {
    priority.classList.add('badge', 'rounded-pill', 'badge-high');
  } else if (priority.textContent === '보통') {
    priority.classList.add('badge', 'rounded-pill', 'badge-normal');
  } else {
    priority.classList.add('badge', 'rounded-pill', 'badge-low');
  }

  var editButton = document.createElement('button');
  editButton.textContent = '수정';
  editButton.classList.add('btn', 'btn-outline-success', 'btn-sm'); // 버튼에 class 추가

  editButton.addEventListener('click', function() {
    var newTodoText = prompt('수정할 내용을 입력하세요.');
    if (newTodoText !== null) {
      todoText.textContent = newTodoText;
    }
  });
  
  li.appendChild(checkbox);
  li.appendChild(todoText);
  li.appendChild(priority);
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

// '전체' 버튼을 클릭하면 모든 할 일을 보여주는 함수
function showAll() {
var todos = todoList.querySelectorAll('li');
todos.forEach(function(todo) {
  todo.style.display = 'block';
});
}

// '완료' 버튼을 클릭하면 완료된 할 일을 보여주는 함수
function showCompleted() {
var todos = todoList.querySelectorAll('li');
todos.forEach(function(todo) {
  if (todo.classList.contains('completed')) {
    todo.style.display = 'block';
  } else {
    todo.style.display = 'none';
  }
});
}

// '미완료' 버튼을 클릭하면 미완료된 할 일을 보여주는 함수
function showIncomplete() {
var todos = todoList.querySelectorAll('li');
todos.forEach(function(todo) {
  if (!todo.classList.contains('completed')) {
    todo.style.display = 'block';
  } else {
    todo.style.display = 'none';
  }
});
}

// 할 일을 '낮음'부터 정렬하는 함수
function sortPriorityAscending() {
var todos = todoList.querySelectorAll('li');
var sortedTodos = Array.from(todos).sort(function(a, b) {
  var priorityA = a.querySelector('span:nth-child(3)').textContent;
  var priorityB = b.querySelector('span:nth-child(3)').textContent;
  return priorityA.localeCompare(priorityB);
});
todoList.innerHTML = '';
sortedTodos.forEach(function(todo) {
  todoList.appendChild(todo);
});
}

// 할 일을 '아주높음' 부터 정렬하는 함수
function sortPriorityDescending() {
var todos = todoList.querySelectorAll('li');
var sortedTodos = Array.from(todos).sort(function(a, b) {
  var priorityA = a.querySelector('span:nth-child(3)').textContent;
  var priorityB = b.querySelector('span:nth-child(3)').textContent;
  return priorityB.localeCompare(priorityA);
});
todoList.innerHTML = '';
sortedTodos.forEach(function(todo) {
  todoList.appendChild(todo);
});
}
