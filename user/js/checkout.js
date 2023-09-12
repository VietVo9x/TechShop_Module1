//forcus vao nav item
const navItemElement = document.querySelector(".menu-item .link-checkout ");
console.log(navItemElement);
navItemElement.style.color = "#fc4d4d";

//lay du lieu local ve
const listCart = JSON.parse(localStorage.getItem("listCart")) || [];
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
//truy van den tat ca doi tuong form
const formBillingDetailElement = document.querySelector("#form-billing-detail");
const firstNameEl = document.querySelector("#first-name");
const lastNameEl = document.querySelector("#last-name");
const addressEl = document.querySelector("#address");
const apartmentEl = document.querySelector("#apartment");
const cityEl = document.querySelector("#city");
const phoneEl = document.querySelector("#phone");
const emailEl = document.querySelector("#email");

let i = 0; // tao bien chua index gio hang cua user dang login
//tim index gio hang cua user dang login
if (!userLogin) {
  document.location.href = "./login.html";
}
listCart.forEach(function (cart, index) {
  if (cart.email === userLogin.email) {
    i = index;
  }
});
console.log(i);
const CartForUserLogin = listCart.find(
  (cart) => cart.email === userLogin.email
);

if (!CartForUserLogin || CartForUserLogin.carts.length === 0) {
  //truy vấn đến content cho nó là không có gì
  const checkoutElement = document.querySelector(".checkout");
  checkoutElement.innerHTML =
    "<h3 class='text-center'>Your cart is empty.</h3>";
} else {
  renderCheckout();
  formBillingDetailElement.addEventListener("submit", function (e) {
    e.preventDefault();

    // B1: Lấy thong tin oder

    const orderInfo = getOrderInfo();

    //  Validator
    const error = checkError(orderInfo);

    // co loi hien thi ra
    renderError(error);
    if (error.isError) {
      return;
    }
    //khong co loi

    //ngày checkout
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, "0"); // Lấy ngày và định dạng thành 2 chữ số
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và định dạng thành 2 chữ số
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    //tao bien checkout chua tat ca thong tin
    let checkout = {
      infoOrder: orderInfo,
      id: 1,
      email_user: userLogin.email,
      date: formattedDate,
      listProduct: [CartForUserLogin.carts],
      total: calculateTotalPrice(),
      status: 1, // da mua
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || []; //kiem tra xem co orders chua
    orders.push(checkout);
    localStorage.setItem("orders", JSON.stringify(orders));
    listCart.splice(i, 1); //bien i ở trên là vị tri đơn hàng của user trong listCart
    localStorage.setItem("listCart", JSON.stringify(listCart));
    alert("you have successfully purchased the item");
    window.location.href = "./product.html";
  });
}
function renderCheckout() {
  let html = "";
  CartForUserLogin.carts.forEach((element) => {
    const total = element.quantity * Number(element.price);
    html += `<tr>
                  <td>${element.name} x ${element.quantity}</td>
                  <td>$${total}</td>
                </tr>`;
  });
  html += `<tr>
                  <th>Total</th>
                  <td>$${calculateTotalPrice()}</td>
                </tr>`;
  //truy van den doi tuong inner ra
  const tbodyElement = document.querySelector(".table-your-oder tbody");
  tbodyElement.innerHTML = html;
}
//tinh tinh tien order
function calculateTotalPrice() {
  const arrCart = CartForUserLogin.carts;
  let totalPrice = 0;
  arrCart.forEach(function (product) {
    totalPrice += product.price * product.quantity;
  });
  return totalPrice;
}
// validate form-billing-detail

//get order info
function getOrderInfo() {
  return {
    firstName: firstNameEl.value.trim(),
    lastName: lastNameEl.value.trim(),
    address: addressEl.value.trim(),
    apartment: apartmentEl.value.trim(),
    city: cityEl.value.trim(),
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
  };
}

//Hiển thị lỗi
function renderError(error) {
  //truy van den the hien thi loi
  const firstNameErrorElement = document.querySelector(".error-first-name");
  const lastNameErrorElement = document.querySelector(".error-last-name");
  const addressErrorElement = document.querySelector(".error-address");
  const cityErrorElement = document.querySelector(".error-city");
  const phoneErrorElement = document.querySelector(".error-phone");
  const emailErrorElement = document.querySelector(".error-email");

  //hien thi loi
  firstNameErrorElement.textContent = error.msgFirstName;
  lastNameErrorElement.textContent = error.msgLastName;
  addressErrorElement.textContent = error.msgAddress;
  cityErrorElement.textContent = error.msgCity;
  phoneErrorElement.textContent = error.msgEmail;
  emailErrorElement.textContent = error.msgPhone;
}

function checkError(oder) {
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const error = {
    isError: false,
    msgFirstName: "",
    msgLastName: "",
    msgAddress: "",
    msgCity: "",
    msgEmail: "",
    msgPhone: "",
  };

  //check mail
  if (!oder.email) {
    error.isError = true;
    error.msgEmail = "Email cannot be empty";
  } else if (!validRegex.test(oder.email)) {
    error.isError = true;
    error.msgEmail = "Email is not in the correct format";
  }

  //check  phone
  if (!oder.phone) {
    error.isError = true;
    error.msgPhone = "Phone number cannot be empty";
  }

  //check first name
  if (!oder.firstName) {
    error.isError = true;
    error.msgFirstName = "Fist Name cannot be empty";
  }
  //check last name
  if (!oder.lastName) {
    error.isError = true;
    error.msgLastName = "Last Name cannot be empty";
  }
  //check address
  if (!oder.address) {
    error.isError = true;
    error.msgAddress = "Address cannot be empty";
  }
  //check address
  if (!oder.city) {
    error.isError = true;
    error.msgCity = "City cannot be empty";
  }

  //return all errors
  return error;
}
