const inputs = document.querySelectorAll(".input");

function addcl(){
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl(){
  let parent = this.parentNode.parentNode;
  if(this.value == ""){
    parent.classList.remove("focus");
  }
}


inputs.forEach(input => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});

// ------------------------------------------------------



const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("loginBtn");
const loginMessage = document.getElementById("message");

loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const id = loginForm.id.value;
    const password = loginForm.password.value;

    if (id === "admin" && password === "1111") {
        loginMessage.textContent = "로그인 되었습니다.";
        loginMessage.classList.remove("alert-danger");
        loginMessage.classList.add("alert-success");
        loginMessage.style.opacity = 1;

        setTimeout(() => {
            loginMessage.style.opacity = 0; // 3초 후에 메시지를 사라지게 함
        }, 2000); // 3초 (3000ms) 설정

        // 아이디와 비밀번호 입력 필드 초기화
        loginForm.id.value = "";
        loginForm.password.value = "";

    } else { //로그인 실패 시 
        loginMessage.textContent = "ID 혹은 PW가 잘못되었습니다.";
        loginMessage.classList.remove("alert-success");
        loginMessage.classList.add("alert-danger");
        loginMessage.style.opacity = 1;

        setTimeout(() => {
            loginMessage.style.opacity = 0; // 3초 후에 메시지를 사라지게 함
        }, 2000); // 3초 (3000ms) 설정

        // 아이디와 비밀번호 입력 필드 초기화
        loginForm.id.value = "";
        loginForm.password.value = "";
    }

    if (id === "" && password === "") {
        loginMessage.textContent = "ID 혹은 PW를 모두 입력해주세요";
        loginMessage.classList.remove("alert-success");
        loginMessage.classList.add("alert-danger");
        loginMessage.style.opacity = 1;

        setTimeout(() => {
            loginMessage.style.opacity = 0; // 3초 후에 메시지를 사라지게 함
        }, 2000); // 3초 (3000ms) 설정
    }

});
