const randomUsername = "user";
const randomPassword = "1234";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username) {
    showNotification("ID를 입력해주세요");
  } else if (!password) {
    showNotification("PW를 입력해주세요");
  } else if (username === randomUsername && password === randomPassword) {
    showNotification("로그인이 되었습니다");
  } else {
    showNotification("ID 혹은 PW가 잘못되었습니다");
  }
});

function showNotification(message) {
  const notification = document.createElement("div");

  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(function () {
    document.body.removeChild(notification);
  }, 2000);
}
