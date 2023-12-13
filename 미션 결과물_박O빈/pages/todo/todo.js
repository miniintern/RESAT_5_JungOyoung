const todoInput = document.querySelector(".todo-input");
const priority = document.querySelector(".priority");
const addButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");

let todoValue = todoInput.value;
let priorityValue = priority.value;
let list = [];
let filter = "all";

const handleTodoInput = (e) => {
  todoValue = e.target.value;
};

const handlePriority = (e) => {
  priorityValue = e.target.value;
};

const handleAddTodo = () => {
  if (todoValue === "") {
    alert("할 일을 작성해주세요");
    return;
  }

  if (priorityValue === "") {
    alert("우선순위를 지정해주세요");
    return;
  }

  const item = {
    id: list.length,
    text: todoValue,
    priority: priorityValue,
    done: false,
  };

  list.push(item);
  resetInput();
  handleShowTodo(list);
};

const resetInput = () => {
  todoValue = "";
  priorityValue = "";
  todoInput.value = "";
  priority.value = "";
};

const handleCheckTodo = (id, checked) => {
  const newList = list.map((item) => {
    if (item.id === id) {
      item.done = checked;
    }
    return item;
  });

  if (filter === "all") {
    handleShowTodo(newList);
  } else {
    handleSortTodo(filter, newList);
  }
};

const handleShowTodo = (list) => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  list.forEach((item) => {
    const todoItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const todoText = document.createElement("input");
    const todoPriority = document.createElement("span");

    todoItem.className = "todo-item";
    checkBox.className = "todo-check";
    todoText.className = "todo-text";
    todoPriority.className = "todo-priority";

    checkBox.type = "checkbox";
    checkBox.checked = item.done;
    todoText.value = item.text;
    todoPriority.textContent = item.priority;

    checkBox.addEventListener("click", () =>
      handleCheckTodo(item.id, checkBox.checked)
    );

    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoPriority);
    todoList.appendChild(todoItem);
  });
};

todoInput.addEventListener("input", handleTodoInput);
priority.addEventListener("change", handlePriority);
addButton.addEventListener("click", handleAddTodo);

const allButton = document.querySelector(".all-button");
const doneButton = document.querySelector(".done-button");
const notDoneButton = document.querySelector(".notDone-button");

const showAllTodo = () => {
  filter = "all";
  handleShowTodo(list);
};

const handleSortTodo = (state, list) => {
  filter = state;

  const newList = list.filter((item) => item.done === state);

  handleShowTodo(newList);
};

const handleButtonSelection = (clicked) => {
  allButton.classList.remove("selected");
  doneButton.classList.remove("selected");
  notDoneButton.classList.remove("selected");

  clicked.classList.add("selected");
};

allButton.addEventListener("click", () => {
  showAllTodo(), handleButtonSelection(allButton);
});
doneButton.addEventListener("click", () => {
  handleSortTodo(true, list), handleButtonSelection(doneButton);
});
notDoneButton.addEventListener("click", () => {
  handleSortTodo(false, list), handleButtonSelection(notDoneButton);
});
