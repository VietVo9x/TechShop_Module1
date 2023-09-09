//login thanh cong
// truy van den the user
//kiem tra du lieu local

checkLogin();
function checkLogin() {
  const userElement = document.querySelector(".user");
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};

  if (userLogin.isLogin) {
    userElement.innerHTML = `<a href="./login.html" id="user-logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>`;
  }
  //user logout
  const logoutElement = document.querySelector("#user-logout");
  if (logoutElement) {
    logoutElement.addEventListener("click", function () {
      localStorage.removeItem("userLogin");
    });
  }
}
