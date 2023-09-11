renderAllQuantityCart();
function renderAllQuantityCart() {
  const listCart = JSON.parse(localStorage.getItem("listCart")) || []; // database gio hang
  const iconCartElement = document.querySelector(".quantity"); // so luong gio hang
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  const cartForUserLogin = listCart.find(
    (cart) => cart.email === userLogin.email
  );
  let qtys = 0;
  if (!userLogin.isLogin) {
    qtys = 0;
  } else if (cartForUserLogin) {
    const carts = cartForUserLogin.carts;
    if (carts.length === 0) {
      qtys = 0;
    } else {
      carts.forEach(function (item) {
        qtys += item.quantity;
      });
    }
  }
  iconCartElement.textContent = qtys;
}
