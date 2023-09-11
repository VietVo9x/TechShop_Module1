// truy van den form
const formEl = document.querySelector("#form-login");
// truy van den cac phan tu trong form
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

//addevent cho form
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // B1: Lấy user

  const user = getUser();
  console.log(user);

  //  Validator
  const error = checkError(user);

  // hiển thị lỗi
  renderError(error);
  if (error.isError) {
    return;
  }
  //kiểm tra trùng dữ liệu trên local
  const listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
  let isError = false; // dat bien check loi trung lap
  //chay vong lap du lieu tren local so sanh voi user.email
  if (listUsers.length > 0) {
    for (let i = 0; i < listUsers.length; i++) {
      console.log(i);
      if (listUsers[i].email === user.email) {
        if (listUsers[i].password === user.password) {
          if (listUsers[i].status === "active") {
            alert("ok");
            // Thực hiện các tác vụ cần thiết ở đây sau khi đăng nhập thành công
          } else if (listUsers[i].status === "block") {
            error.msgEmail = "Email is blocked";
            isError = true;
          }
          break; // Dừng lại sau khi kiểm tra xong email và password
        } else {
          error.msgPassword = "Incorrect password, please check again";
          isError = true;
          break; // dừng lai , để k chạy code bên dưới
        }
      }
    }
  } else {
    error.msgEmail = "Incorrect email, please check again";
    isError = true;
  }
  if (isError) {
    renderError(error);
    return;
  } else {
    // // B4: Điều hướng login
    const userLogin = {
      email: user.email,
      isLogin: true,
    };
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    document.location.href = "./index.html";
  }
});

function getUser() {
  return {
    email: emailEl.value.trim(),
    password: passwordEl.value.trim(),
  };
}

//Hiển thị lỗi
function renderError(error) {
  //truy van den the hien thi loi
  const emailErrorElement = document.querySelector(".error-email");
  const passwordElement = document.querySelector(".error-password");
  //hien thi loi
  emailErrorElement.textContent = error.msgEmail;
  passwordElement.textContent = error.msgPassword;
}

function checkError(user) {
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const error = {
    isError: false,
    msgEmail: "",
    msgPassword: "",
  };

  //check mail
  if (!user.email) {
    error.isError = true;
    error.msgEmail = "Email cannot be empty";
  } else if (!validRegex.test(user.email)) {
    error.isError = true;
    error.msgEmail = "Email is not in the correct format";
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
  console.log(error);
  return error;
}
