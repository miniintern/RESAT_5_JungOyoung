const navMenu = document.querySelector(".navbar-menu");
const navButton = document.querySelector(".navbar-button");

navButton.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
