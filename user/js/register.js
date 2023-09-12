//truy van den phan tu logi
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
if (userLogin) {
  document.location.href = "./index.html";
}
// truy van den form
const formEl = document.querySelector("#form-register");
// truy van den cac phan tu trong form
const emailEl = document.querySelector("#email");
const phoneEl = document.querySelector("#phone");
const nameEl = document.querySelector("#name");
const addressEl = document.querySelector("#address");
const passwordEl = document.querySelector("#password");
const repeatPassEl = document.querySelector("#repeat-password");
const checkBoxEl = document.querySelector("#checkbox");
//addevent cho form
formEl.addEventListener("submit", (e) => {
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

  //kiểm tra trùng dữ liệu trên local
  const listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
  let isCheck = false;
  console.log(listUsers);
  for (let i = 0; i < listUsers.length; i++) {
    console.log(listUsers[i]);
    if (listUsers[i].email === user.email) {
      isCheck = true;
      break;
    }
  }
  //   B4: Điều hướng login
  if (!isCheck) {
    // Ok --> đẩy lên local
    delete user.repeatPass;
    delete user.checked;
    listUsers.push(user);
    localStorage.setItem("listUsers", JSON.stringify(listUsers));
    // Điều hướng login
    window.location.href = "/login.html";
  } else {
    error.isError = true;
    error.msgEmail =
      "The email already exists, please register with a different email.";
    renderError(error);
  }
});

function getUser() {
  return {
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    name: nameEl.value.trim(),
    address: addressEl.value.trim(),
    password: passwordEl.value.trim(),
    repeatPass: repeatPassEl.value.trim(),
    checked: checkBoxEl.checked,
  };
}

//Hiển thị lỗi
function renderError(error) {
  //truy van den the hien thi loi
  const emailErrorElement = document.querySelector(".email-error");
  const phoneErrorElement = document.querySelector(".phone-error");
  const nameErrorElement = document.querySelector(".name-error");
  const addressErrorElement = document.querySelector(".address-error");
  const passwordElement = document.querySelector(".password-error");
  const repeatPassElement = document.querySelector(".rpp-error");
  const checkboxErrorElement = document.querySelector(".checkbox-error");
  //hien thi loi
  emailErrorElement.textContent = error.msgEmail;
  phoneErrorElement.textContent = error.msgPhone;
  nameErrorElement.textContent = error.msgName;
  addressErrorElement.textContent = error.msgAddress;
  passwordElement.textContent = error.msgPassword;
  repeatPassElement.textContent = error.msgPasswordConfirm;
  checkboxErrorElement.textContent = error.msgCheckbox;
}

function checkError(user) {
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const error = {
    isError: false,
    msgEmail: "",
    msgPhone: "",
    msgName: "",
    msgAddress: "",
    msgPassword: "",
    msgPasswordConfirm: "",
    msgCheckbox: "",
  };

  //check mail
  if (!user.email) {
    error.isError = true;
    error.msgEmail = "Email cannot be empty";
  } else if (!validRegex.test(user.email)) {
    error.isError = true;
    error.msgEmail = "Email is not in the correct format";
  }

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

  //check repeat password
  if (!user.repeatPass) {
    error.isError = true;
    error.msgPasswordConfirm = "Password confirmation cannot be empty";
  } else if (user.repeatPass !== user.password) {
    error.isError = true;
    error.msgPasswordConfirm = "Password confirmation does not match";
  }

  //check checkbox
  if (!user.checked) {
    error.isError = true;
    error.msgCheckbox = "Please check here.";
  }

  //return all errors
  return error;
}
