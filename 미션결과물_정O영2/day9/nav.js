function onMenuClick() {
    var navbar = document.getElementById('navigation-bar');
    var icon = document.getElementById('icon');
    var responsiveClassName = 'responsive';
    var openIconClassName = 'fa fa-bars';
    var closeIconClassName = 'fa fa-times';
  
    navbar.classList.toggle(responsiveClassName); //클래스명 토글
  
    if (navbar.classList.contains(responsiveClassName)) { //반응형 클래스명이 추가되면
        icon.className = icon.className.replace(openIconClassName, closeIconClassName); //햄버거를 X로 바꾸기
    } else {
        icon.className = icon.className.replace(closeIconClassName, openIconClassName);
    }
  }
  
  