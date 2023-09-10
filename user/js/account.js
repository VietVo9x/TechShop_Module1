//truy van den cac doi tuong form
const formUpdateElement = document.querySelector("#form-update");
const phoneElement = document.querySelector("#phone");
const nameElement = document.querySelector("#name");
const addressElement = document.querySelector("#address");
const passwordElement = document.querySelector("#password");
const listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
let indexUser = 0;
// console.log(phoneElement, nameElement, addressElement, passwordElement);

//render
render();
function render() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};

  if (!userLogin.isLogin) {
    alert("Vui lòng đăng nhập để xem thông tin Account");
    document.location.href = "./login.html";
  }

  listUsers.map((user, index) => {
    if (user.mail == userLogin.email) {
      indexUser = index;
    }
  });
  let updateUser = listUsers[indexUser];
  console.log(updateUser);
  phoneElement.value = updateUser.phone;
  nameElement.value = updateUser.name;
  addressElement.value = updateUser.address;
  passwordElement.value = updateUser.password;
}
//validate form
//addevent cho form
formUpdateElement.addEventListener("submit", (e) => {
  e.preventDefault();

  // B1: Lấy user

  const user = getUser();

  //  Validator
  const error = checkError(user);

  //
  renderError(error);
  if (error.isError) {
    return;
  }

  //Gui len lai local
  listUsers.splice(indexUser, 1, user);
  localStorage.setItem("listUsers", JSON.stringify(listUsers));
});

function getUser() {
  return {
    phone: phoneElement.value.trim(),
    name: nameElement.value.trim(),
    address: addressElement.value.trim(),
    password: passwordElement.value.trim(),
  };
}

//Hiển thị lỗi
function renderError(error) {
  //truy van den the hien thi loi

  const phoneErrorElement = document.querySelector(".phone-error");
  const nameErrorElement = document.querySelector(".name-error");
  const addressErrorElement = document.querySelector(".address-error");
  const passwordElement = document.querySelector(".password-error");

  //hien thi loi

  phoneErrorElement.textContent = error.msgPhone;
  nameErrorElement.textContent = error.msgName;
  addressErrorElement.textContent = error.msgAddress;
  passwordElement.textContent = error.msgPassword;
}

function checkError(user) {
  const error = {
    isError: false,

    msgPhone: "",
    msgName: "",
    msgAddress: "",
    msgPassword: "",
  };

  //check  phone
  if (!user.phone) {
    error.isError = true;
    error.msgPhone = "Phone number cannot be empty";
  } else if (user.phone < 10) {
    error.isError = true;
    error.msgPhone = "Phone number cannot be less than 10 digits";
  }

  //check name
  if (!user.name) {
    error.isError = true;
    error.msgName = "Name cannot be empty";
  } else if (user.name.length < 6) {
    console.log(user.name);
    error.isError = true;
    error.msgName = "Name cannot be shorter than 6 characters";
  }
  //check address
  if (!user.address) {
    error.isError = true;
    error.msgAddress = "Address cannot be empty";
  }

  //check password
  if (!user.password) {
    error.isError = true;
    error.msgPassword = "Password cannot be empty";
  } else if (user.password.length < 6) {
    error.isError = true;
    error.msgPassword = "Password must be at least 6 characters long";
  } else if (user.password.length > 20) {
    error.isError = true;
    error.msgPassword = "Password cannot exceed 20 characters";
  }

  //return all errors
  return error;
}
