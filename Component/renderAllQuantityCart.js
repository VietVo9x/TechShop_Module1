//truy van den doi tuong hien thi
const listCart = JSON.parse(localStorage.getItem("listCart")) || [];

const categpryProductElement = document.querySelector(".category-products"); //noi hien thi toan bo san pham
const productsDB = JSON.parse(localStorage.getItem("products")) || []; //list san pham hien thi
const iconCartElement = document.querySelector(".quantity"); // so luong gio hang

renderAllQuantityCart();
function renderAllQuantityCart() {
  const cartForUserLogin = listCart.find(
    (cart) => cart.email === userLogin.email
  );
  console.log(cartForUserLogin.carts);
  const carts = cartForUserLogin.carts;
  let qtys = 0;
  carts.forEach(function (item) {
    qtys += item.quantity;
  });
  iconCartElement.textContent = qtys;
}
