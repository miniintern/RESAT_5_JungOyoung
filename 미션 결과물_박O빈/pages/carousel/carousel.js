const carouselContainer = document.querySelector(".carousel-container");
const slidesContainer = document.querySelector(".carousel-slides");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const carouselDots = document.querySelector(".carousel-dots");

let currentSlide = 1;
let slideList = [
  {
    id: 1,
    color: "#17a1ff",
    text: "고객 데이터 분석으로<br/> 고객 중심 서비스 제공하기",
  },
  {
    id: 2,
    color: "#1bc481",
    text: "기업 유튜브 채널로<br/>10만 구독자 모으기 (2탄)",
  },
  {
    id: 3,
    color: "#1bc481",
    text: "기업 유튜브 채널로<br/>10만 구독자 모으기 (1탄)",
  },
  {
    id: 4,
    color: "#384040",
    text: "신규 입사자의 적응을<br/>돕는 효과적인 온보딩<br/>프로그램 알아보기",
  },
];

let intervalId;
const slideInterval = 2000;
const slideLength = slideList.length;
const slideWidth = 330;
const slideSpeed = 300;

slideList.forEach((item) => {
  const slide = document.createElement("div");
  const text = document.createElement("p");

  slide.className = "carousel-slide";
  text.className = "slide-text";

  slide.style.backgroundColor = item.color;
  text.innerHTML = item.text;

  slide.appendChild(text);
  slidesContainer.appendChild(slide);
});

let firstChild = slidesContainer.firstElementChild;
let lastChild = slidesContainer.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slidesContainer.appendChild(clonedFirst);
slidesContainer.prepend(clonedLast);

slidesContainer.style.transition = "0ms";
slidesContainer.style.transform = `translate3d(-${
  slideWidth * currentSlide
}px, 0px, 0px)`;

for (let i = 0; i < slideLength; i++) {
  const dot = document.createElement("span");
  dot.className = "carousel-dot";
  dot.addEventListener("click", () => {
    goToSlide(i);
    clearInterval(intervalId);
    startAutoSlide();
  });
  carouselDots.appendChild(dot);
}

function updateDots() {
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, idx) => {
    if (idx === currentSlide - 1) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function updateCarousel() {
  slidesContainer.style.transition = `${slideSpeed}ms`;
  slidesContainer.style.transform = `translateX(-${
    slideWidth * currentSlide
  }px)`;
  updateDots();
}

function nextSlide() {
  if (currentSlide < slideLength + 1) {
    currentSlide++;
    updateCarousel();
  }

  if (currentSlide === slideLength + 1) {
    currentSlide = 1;
    setTimeout(function () {
      slidesContainer.style.transition = "0ms";
      slidesContainer.style.transform = `translate3d(-${slideWidth}px, 0px, 0px)`;
    }, slideSpeed);
    updateDots();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }

  if (currentSlide === 0) {
    currentSlide = slideLength;
    setTimeout(function () {
      slidesContainer.style.transition = "0ms";
      slidesContainer.style.transform =
        "translate3d(-" + slideWidth * slideLength + "px, 0px, 0px)";
    }, slideSpeed);
    updateDots();
  }
}

prevButton.addEventListener("click", () => {
  prevSlide();
  clearInterval(intervalId);
  startAutoSlide();
});

nextButton.addEventListener("click", () => {
  nextSlide();
  clearInterval(intervalId);
  startAutoSlide();
});

function goToSlide(slideIndex) {
  currentSlide = slideIndex + 1;
  updateCarousel();
  updateDots();
}

function startAutoSlide() {
  intervalId = setInterval(() => {
    nextSlide();
    updateDots();
  }, slideInterval);
}

goToSlide(0);
startAutoSlide();
