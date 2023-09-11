//navbar responesive
function handleOpenNavbarMobile() {
  const menuListMobileElement = document.querySelector(".menu-list-mobile");
  const overlayElement = document.querySelector(".nav__overlay");
  menuListMobileElement.classList.toggle("translate-x");
  overlayElement.classList.toggle("hiden");
}
//close modal
const closeModalElement = document.querySelector(".menu-list-mobile-close");
closeModalElement.addEventListener("click", function () {
  handleOpenNavbarMobile();
});
const overlayElement = document.querySelector(".nav__overlay");
overlayElement.addEventListener("click", function () {
  handleOpenNavbarMobile();
});
