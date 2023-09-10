//lay du lieu product ve
const product = JSON.parse(localStorage.getItem("product")); //product hein thi hientaia
console.log(product.product_id);
//truy van den doi tuong hien thi
const categpryProductElement = document.querySelector(".category-products"); //noi hien thi toan bo san pham
const productsDB = JSON.parse(localStorage.getItem("products")) || []; //list san pham hien thi
const iconCartElement = document.querySelector(".quantity"); // so luong gio hang
const listCart = JSON.parse(localStorage.getItem("listCart")) || []; // list san pham da mua
const userLogin = JSON.parse(localStorage.getItem("userLogin")); //email dang mua

//truy van den phan tu de render ra giao dien sp hien tai
const productElement = document.querySelector(".product-content");

//render so luong gio hang
renderAllQuantityCart();
function renderAllQuantityCart() {
  const listCart = JSON.parse(localStorage.getItem("listCart")) || []; // list san pham da mua
  const userLogin = JSON.parse(localStorage.getItem("userLogin")); //email dang mua
  const cartForUserLogin = listCart.find(
    (cart) => cart.email === userLogin.email
  );
  let qtys = 0;

  if (!cartForUserLogin) {
    iconCartElement.textContent = qtys;
  } else {
    const carts = cartForUserLogin.carts;
    carts.forEach(function (item) {
      qtys += item.quantity;
    });
    iconCartElement.textContent = qtys;
  }
}

renderProduct(); //render sp chi tiet san pham hien tai
function renderProduct() {
  // lấy sản phẩm trên local về
  let html = "";
  //lặp qua gán vào biến html
  
  html = `
            <div class="product-content-left">
              <div class="big-imgage-wrapper ">
                <img src="./user/assets/images/product/${product.image[0]}" alt="" class="big-image"/>
                <a href="" class="btn-zoom"
                  ><i class="fa-solid fa-magnifying-glass"></i
                ></a>
              </div>
              <ul class="list-image-small">
                <li>
                  <a href=""
                    ><img
                      src="./user/assets/images/product/${product.image[0]}"
                      alt=""
                      class="active-border"
                  /></a>
                </li>
                <li>
                  <a href=""
                    ><img src="./user/assets/images/product/${product.image[1]}" alt=""
                  /></a>
                </li>
                <li>
                  <a href=""
                    ><img
                      src="./user/assets/images/product/${product.image[2]}"
                      alt=""
                  /></a>
                </li>
                <li>
                  <a href=""
                    ><img src="./user/assets/images/product/${product.image[3]}" alt=""
                  /></a>
                </li>
              </ul>
            </div>
            <div class="product-content-right">
              <h2 class="product-title">${product.name}</h2>
              <p class="price">$34</p>
              <div class="product-short-description">
                <p>
                  ${product.description}
                </p>
              </div>
              <div class="product-meta">
                <span class="sku-wrapper"
                  >SKU: <span class="sku">${product.product_code}</span></span
                >
                <span class="poster-in"
                  >Category: <a href="">${product.category}</a></span
                >
              </div>
              <p class="stock-in">${product.quantity_stock} in stock</p>
              
                <div class="quantity-btns">
                  <a href="#" class="quantity-down" 
                  > - </a>
                  <input type="text" value="1" class="text-center quantity-cart" />
                  <a href="#" class="quantity-up"> + </a>
                </div>
                <div class="d-flex align-items-center">
                  <button class="add-to-cart btn-cart" onclick="handleAddToCart(${product.product_id})" >ADD TO CART</button>
                  <a href="./checkout.html" class="go-to-cart ms-3 btn-cart" >CHECKOUT</a>
                </div>
                <div class="btns-single-page mt-3 d-flex align-items-center">
                    <a href="" class="whishlist"
                      ><i class="fa-solid fa-heart"></i
                    ></a>
                    <a href="" class="compare"
                      ><i class="fa-solid fa-right-left"></i
                    ></a>
                  </div>
             
            </div>
          `;

  //inner ra giao diện
  productElement.innerHTML = html;
  renderRelatedProduct();
}

//render sp cung category voi sp hien tai
function renderRelatedProduct() {
  const relatedProductElement = document.querySelector(
    ".product-related-content"
  );
  const relatedProducts = filterProduct();
  let html = "";
  relatedProducts.forEach((relatedProduct) => {
    html += ` <div class="card">
                <div class="card-top">
                  <a href=""
                    ><img src="./user/assets/images/product/${relatedProduct.image[0]}" alt="..."
                  /></a>
                  <div class="btn-position">
                    <button onclick="handleViewProduct(${relatedProduct.product_id})"><i class="fa-regular fa-eye"></i></button>
                    <a href=""><i class="fa-solid fa-heart"></i></a>
                    <button onclick="handleAddToCartProduct(${relatedProduct.product_id})"><i class="fa-solid fa-cart-shopping"></i></button>
                  </div>
                </div>
                <div class="card-body">
                  <a class="card-title" href="">${relatedProduct.name}</a>
                  <p class="card-price">$${relatedProduct.price}</p>
                </div>
              </div>`;
  });
  relatedProductElement.innerHTML = html;
}

//phóng to list-image-small
//big-image
const imageBig = document.querySelector(".big-image");
//b1: truy vấn đến list-small-image
const imageSmalls = document.querySelectorAll(".list-image-small img");

function handleClick(e) {
  // Loại bỏ lớp "active-border" khỏi tất cả các phần tử image-small
  imageSmalls.forEach((element) => {
    element.classList.remove("active-border");
  });

  // Ngăn chặn hành động mặc định của sự kiện (ví dụ: ngăn chặn mở liên kết)
  e.preventDefault();

  // Thêm hoặc xóa lớp "active-border" cho phần tử được click
  e.target.classList.toggle("active-border");

  // Cập nhật src của phần tử image-big bằng src của phần tử được click
  imageBig.src = e.target.src;
}

// Lắng nghe sự kiện click trên từng phần tử image-small và gọi hàm handleClick khi có sự kiện xảy ra
imageSmalls.forEach((imageSmall) => {
  imageSmall.addEventListener("click", handleClick);
});

//btn + - sản phẩm
//truy van den so luong san pham va btn thay doi so luong
const valueQuantityElement = document.querySelector(".quantity-cart");
const downQuantityElement = document.querySelector(".quantity-down");
const upQuantityElement = document.querySelector(".quantity-up");
//adevent
downQuantityElement.addEventListener("click", function (e) {
  e.preventDefault();
  valueQuantityElement.value--;
  if (valueQuantityElement.value == 0) {
    valueQuantityElement.value = 1;
  }
});
upQuantityElement.addEventListener("click", function (e) {
  e.preventDefault();
  valueQuantityElement.value++;
});

//add to cart
//truy van den btn add to cart
const addToCartBtnElement = document.querySelector(".add-to-cart");
//icon gio hang tren header
function handleAddToCart(id) {
  console.log(valueQuantityElement.value);
  // console.log(id); //product_id
  // lấy được product_id
  const productsDB = JSON.parse(localStorage.getItem("products")); //products database
  const listCart = JSON.parse(localStorage.getItem("listCart")) || []; //list sản phẩm đã mua
  const userLogin = JSON.parse(localStorage.getItem("userLogin")); //email dang mua

  //có product_id -> tìm produc trong products database
  const product = productsDB.find((item) => item.product_id === id);

  //ngày mua sản phẩm
  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, "0"); // Lấy ngày và định dạng thành 2 chữ số
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và định dạng thành 2 chữ số
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  // sản phẩm muốn mua
  const productBuy = {
    product_id: product.product_id,
    price: product.price,
    name: product.name,
    img: product.image[0],
    quantity: Number(valueQuantityElement.value),
    date: formattedDate,
    status: 0,
  };
  // Tìm nơi chứa sản phẩm của user
  const myCart = listCart.find((cart) => cart.email == userLogin.email);
  if (!myCart) {
    //nếu chưa có dữ liệu
    const newCart = {
      //tạo nơi chứa giỏ hàng mới
      email: userLogin.email, //có email login
      carts: [productBuy], //giỏ hàng gồm mảng nhiều sản phẩm []
    };
    listCart.push(newCart); // tạo mới listCart nếu chưa có , có rồi thì push sản phẩm mới vào
    localStorage.setItem("listCart", JSON.stringify(listCart)); //đẩy lên lại local
    return;
  } else {
    //tạo biến newCart : tìm trong listCart có email = email đang login
    const newCart = listCart.find((cart) => cart.email == userLogin.email);
    const carts = newCart.carts; // giỏ hàng

    const cart = carts.find(
      //tìm trong giỏ hàng có sản phẩm trùng với sản phẩm mún mua
      (product) => product.product_id === productBuy.product_id
    );
    if (cart) {
      //nếu có thì tăng số lượng lên
      cart.quantity += Number(valueQuantityElement.value);
    } else {
      carts.push(productBuy); //nếu không có thì thêm sản phẩm muốn mua vào giỏ hàng
    }

    localStorage.setItem("listCart", JSON.stringify(listCart)); //gởi lên lại local
    renderAllQuantityCart();
  }

  // myCart.listCart;

  // Bây giờ bạn có thể truy cập các thuộc tính của đối tượng user và thực hiện các thao tác cần thiết
}
//filter san pham co category giong sp đang hien thi
function filterProduct() {
  console.log(product.product_id);
  const relatedRroducts = productsDB.filter(
    // tìm ra mảng sản phẩm có category tương tự sp hiện tại
    (item) => item.category === product.category
  );
  const newArr = relatedRroducts.filter(
    // xoá sp hiện tại trong mảng category đi
    (item) => item.product_id !== product.product_id
  );
  return newArr; //trả về arr có cùng category với sp hiện tại
}

//handle view product related products
function handleViewProduct(product_id) {
  const product = productsDB.find((item) => product_id === item.product_id);
  localStorage.setItem("product", JSON.stringify(product));
  document.location.href = "./product-detail.html";
}

//handle add to cart product

function handleAddToCartProduct(id) {
  //có product_id -> tìm produc trong products database
  const product = productsDB.find((item) => item.product_id === id);

  //ngày mua sản phẩm
  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, "0"); // Lấy ngày và định dạng thành 2 chữ số
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và định dạng thành 2 chữ số
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  // sản phẩm muốn mua
  const productBuy = {
    product_id: product.product_id,
    price: product.price,
    name: product.name,
    img: product.image[0],
    quantity: 1,
    date: formattedDate,
    status: 0,
  };
  // Tìm nơi chứa sản phẩm của user
  const myCart = listCart.find((cart) => cart.email == userLogin.email);
  if (!myCart) {
    //nếu chưa có dữ liệu
    const newCart = {
      //tạo nơi chứa giỏ hàng mới
      email: userLogin.email, //có email login
      carts: [productBuy], //giỏ hàng gồm mảng nhiều sản phẩm []
    };
    listCart.push(newCart); // tạo mới listCart nếu chưa có , có rồi thì push sản phẩm mới vào
    localStorage.setItem("listCart", JSON.stringify(listCart)); //đẩy lên lại local
    renderAllQuantityCart();

    return;
  } else {
    //tạo biến newCart : tìm trong listCart có email = email đang login
    const newCart = listCart.find((cart) => cart.email == userLogin.email);
    const carts = newCart.carts; // giỏ hàng

    const cart = carts.find(
      //tìm trong giỏ hàng có sản phẩm trùng với sản phẩm mún mua
      (product) => product.product_id === productBuy.product_id
    );
    if (cart) {
      //nếu có thì tăng số lượng lên
      cart.quantity++;
    } else {
      carts.push(productBuy); //nếu không có thì thêm sản phẩm muốn mua vào giỏ hàng
    }

    localStorage.setItem("listCart", JSON.stringify(listCart)); //gởi lên lại local
    renderAllQuantityCart();
  }
}
