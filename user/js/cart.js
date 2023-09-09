//lấy thông tin user đang đăng nhập trên local về
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const listCart = JSON.parse(localStorage.getItem("listCart")) || []; //list oder của user đang login

const categpryProductElement = document.querySelector(".category-products"); //noi hien thi toan bo san pham
const productsDB = JSON.parse(localStorage.getItem("products")) || []; //list san pham hien thi
const iconCartElement = document.querySelector(".quantity"); // so luong gio hang

renderAllQuantityCart();
//check dang nhap thi hien thi ra cart cua account don
if (userLogin.isLogin) {
  const CartForUserLogin = listCart.find(
    (cart) => cart.email === userLogin.email
  );
  if (userLogin.email && CartForUserLogin.carts.length == 0) {
    //truy vấn đến content cho nó là không có gì
    const listCartsElement = document.querySelector(".list-carts");
    listCartsElement.innerHTML =
      "<h3 class='text-center'>Giỏ hàng bạn trống</h3>";
  } else if (CartForUserLogin) {
    const filteredList = listCart.filter(
      (item) => !item.hasOwnProperty("email")
    );

    console.log(filteredList);
    renderCart(filteredList);
    showCartTotals();
  }
} else {
  // renderCart();
  // showCartTotals();
}
//k dang nhap thi hien thi ra san pham cua ng dung k dang nhap
//check có danh sách oder của account này không ? show  : thông báo k có

//hàm render ra danh sách oder
function renderCart(cart) {
  let html = "";
  cart.forEach((element) => {
    html += `<tr>
                  <td class="product-remove">
                    <a href="#" onclick="handleRemoveProductCart(${
                      element.product_id
                    })"><i class="fa-solid fa-x"></i></a>
                  </td>
                  <td class="product-thumnail">
                    <a href=""
                      ><img src="./user/assets/images/product/${
                        element.img
                      }" alt=""
                    /></a>
                  </td>
                  <td class="product-name">
                    <a href="">${element.name}</a>
                  </td>
                  <td class="product-price">${Number(element.price)}</td>
                  <td class="product-quantity">
                    <button class="quantity-down" onclick="handleDownQuantity(${
                      element.product_id
                    })"> - </button
                    ><input
                      type="text"
                      size="2"
                      value="${element.quantity}"
                      class="text-center"
                    /><button href="#" class="quantity-up" onclick="handleUpQuantity(${
                      element.product_id
                    })"> + </button>
                  </td>
                  <td class="subtotal">$${
                    Number(element.price) * Number(element.quantity)
                  }</td>
                </tr>`;
  });
  html += `<tr>
                  <td class="action" colspan="6">
                    <div class="coupon">
                      <div class="d-flex">
                        <input
                          type="text"
                          placeholder="Counpon code"
                          class="coupon-input"
                        />
                        <button
                          class="action-btn coupon-btn"
                          name="apply_coupon"
                          type="submit"
                        >
                          APPLYCOUNPON
                        </button>
                      </div>
                      <button
                        class="update-cart action-btn"
                        name="update_cart"
                        type="submit"
                      >
                        Update Cart
                      </button>
                    </div>
                  </td>
                </tr>`;
  //truy van den table
  const listCartElement = document.querySelector(".list-cart tbody");
  listCartElement.innerHTML = html;
}

// hàm show tính tổng tiền và btn chuyển sang checkout, nếu có danh sách oder ? show ra : không show
function showCartTotals() {
  //truy van den cart-totals
  const cartsTotalElement = document.querySelector(".cart-totals");
  html = `   <h2>Cart totals</h2>
            <table class="table-cart-totals">
              <tr class="cart-subtotal">
                <th>Subtotal</th>
                <td>$$</td>
              </tr>
              <tr class="shipping">
                <th>Shipping</th>
                <td>
                  Enter Your Address To View Shipping Options.
                  <a href="">CALCULATE SHIPPING</a>
                </td>
              </tr>
              <tr class="oder-total">
                <th>Total</th>
                <td>$$</td>
              </tr>
            </table>
            <div class="mt-4 text-center">
              <button class="checkout-btn action-btn">
                PROCEED TO CHECKOUT
              </button>
            </div>`;
  cartsTotalElement.innerHTML = html;
}

//hàm tăng só lượng sản phẩm trong 1 oder
function handleUpQuantity(id) {
  const arrCart = CartForUserLogin.carts; //danh sách oder nếu có
  //tìm ra id trùng với id sản phẩm oder
  const cart = arrCart.find((product) => product.product_id === id); //tìm ra id trùng với id sản phẩm oder

  cart.quantity++; //click thì tăng 1

  localStorage.setItem("listCart", JSON.stringify(listCart)); //gủi lại local
  renderCart(CartForUserLogin.carts); //render lại danh sách oder
  renderAllQuantityCart(); //render lại giỏ hàng header
  showCartTotals();
}

//hàm giảm só lượng sản phẩm trong 1 oder
function handleDownQuantity(id) {
  const arrCart = CartForUserLogin.carts; //danh sách oder nếu có
  let index = 0; // tạo biến để check vị của oder sản phẩm này
  let cart; // tạo biến để sản phẩm oder
  arrCart.filter((product, i) => {
    // lặp quả danh sách oder tìm ra vị trí của oder và oder sản phẩm đó
    if (product.product_id === id) {
      cart = product;
      index = i;
    }
  });
  cart.quantity--; // click thì giảm quantity oder sản phẩm đó
  if (cart.quantity == 0) {
    arrCart.splice(index, 1); // nếu só lượng = 0 thì xoá lun oder sản phẩm đó = index đã có
  }
  //vì là object nên khi truy vấn vào oder sản phẩm đó thì ta truy vấn vào cùng 1 vùng nhớ
  //nên khi ta thay đổi quantity của oder sản phẩm đó ,danh sách oder cũng thay đổi theo
  localStorage.setItem("listCart", JSON.stringify(listCart)); // gửi lại local
  renderAllQuantityCart(); //render lại giỏ hàng header
  renderCart(CartForUserLogin.carts); //render lại danh sách oder
}
//xoa san pham
function handleRemoveProductCart(id) {
  //tương từ handleDownQuantity
  const arrCart = CartForUserLogin.carts;
  let index = 0;
  let cart;
  arrCart.filter((product, i) => {
    if (product.product_id === id) {
      cart = product;
      index = i;
    }
  });
  arrCart.splice(index, 1);

  localStorage.setItem("listCart", JSON.stringify(listCart));
  renderAllQuantityCart();
  renderCart(CartForUserLogin.carts);
}

//ham show gio hang tren header
function renderAllQuantityCart() {
  const cartForUserLogin = listCart.find(
    (cart) => cart.email === userLogin.email
  );
  const carts = cartForUserLogin.carts;
  let qtys = 0;
  carts.forEach(function (item) {
    qtys += item.quantity;
  });
  iconCartElement.textContent = qtys;
}
//ham tính tổng tiền của danh sách oder
// function totalPrice() {
//   const arrCart = CartForUserLogin.carts;
//   console.log(arrCart);
// }
// totalPrice();
