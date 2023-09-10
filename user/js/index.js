//lay du lieu local ve
const productsDB = JSON.parse(localStorage.getItem("products")) || [];
const iconCartElement = document.querySelector(".quantity"); // so luong gio hang
const listCart = JSON.parse(localStorage.getItem("listCart")) || []; // database gio hang
const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};
renderAllQuantityCart();
//truy van den cac phan tu can render
const categoryProductsElement = document.querySelector("#category-product");
const bestSellProductsElement = document.querySelector(
  "#best-selling-products"
);

//bien check new product or best deal product
let isProducts = 1;

indexProductInner();
//funtion render all product index
function indexProductInner() {
  //neu bien cuc bo la 1 thi render ra new product , nguoc lai render ra best deal
  const bestDealsProduct = filterProducts(productsDB, "best_deal");
  const sellsProduct = filterProducts(productsDB, "sell");
  const newsProduct = filterProducts(productsDB, "new");
  const htmlBestDealsProduct = renderHtml(bestDealsProduct);
  const htmlSellsProduct = renderHtml(sellsProduct);
  const htmlNewsProduct = renderHtml(newsProduct);

  if (isProducts == 1) {
    //ren der ra new product
    categoryProductsElement.innerHTML = htmlNewsProduct;
    bestSellProductsElement.innerHTML = htmlSellsProduct;
  } else {
    //render ra best deal

    categoryProductsElement.innerHTML = htmlBestDealsProduct;
    bestSellProductsElement.innerHTML = htmlSellsProduct;
  }
}

//function render product
function renderHtml(list) {
  let html = "";
  list.forEach((element) => {
    html += ` <div class="card">
              <div class="card-top">
                <a href=""
                  ><img
                    src="./user/assets/images/product/${element.image[0]}"
                    alt="..."
                /></a>
                <div class="btn-position">
                  <button  onclick="handleViewProduct(${element.product_id})"><i class="fa-regular fa-eye"></i></button>
                  <a href="" ><i class="fa-solid fa-heart"></i></a>
                  <button  onclick="handleAddToCartProduct(${element.product_id})"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>
              </div>
              <div class="card-body">
                <button class="card-title" href="" onclick="handleViewProduct(${element.product_id})">${element.name}</button>
                <p class="card-price">$${element.price}</p>
              </div>
            </div>`;
  });
  return html;
}

// Hàm filter tái sử dụng cho mảng sản phẩm
function filterProducts(products, condition) {
  // Sử dụng phương thức filter để lọc sản phẩm dựa trên điều kiện
  const filteredProducts = products.filter((product) => {
    // Kiểm tra điều kiện, ở đây ta sử dụng "condition" để xác định loại điều kiện lọc
    if (condition === "best_deal") {
      return product.best_deal === true;
    } else if (condition === "new") {
      // Thay "product.key" bằng tên thuộc tính cụ thể mà bạn muốn kiểm tra
      return product.new === true;
    } else if (condition === "sell") {
      // Thay "product.key" bằng tên thuộc tính cụ thể mà bạn muốn kiểm tra
      return product.sell === true;
    }
    // Trong trường hợp không xác định, trả về false để không lọc sản phẩm
    return false;
  });

  return filteredProducts;
}

//click set bien cuc bo va render category-product
function handleClickNewProduct() {
  const newProductBtnElement = document.querySelector("#new-product-btn");
  const bestDealBtnElement = document.querySelector("#best-deal-btn");
  newProductBtnElement.setAttribute("style", "border-bottom: 2px solid black;");
  bestDealBtnElement.setAttribute("style", "border-bottom: none");
  isProducts = 1;
  indexProductInner();
}
function handleClickBestDealProduct() {
  const newProductBtnElement = document.querySelector("#new-product-btn");

  const bestDealBtnElement = document.querySelector("#best-deal-btn");
  bestDealBtnElement.setAttribute("style", "border-bottom: 2px solid black;");
  newProductBtnElement.setAttribute("style", "border-bottom: none");
  isProducts = 2;
  indexProductInner();
}

//handle view product
function handleViewProduct(product_id) {
  console.log(product_id);
  const product = productsDB.find((item) => product_id === item.product_id);
  localStorage.setItem("product", JSON.stringify(product));
  document.location.href = "./product-detail.html";
}
//ham mua san pham neu dang nhap roi
function handleAddToCartProduct(id) {
  if (!userLogin.isLogin) {
    window.location.href = "./login.html";
  }
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

//render quantity cart header
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

    carts.forEach(function (item) {
      qtys += item.quantity;
    });
  }
  iconCartElement.textContent = qtys;
}

//click open search-bar
function handleToggleSearchBar() {
  const searchBarWrapperElement = document.querySelector(".search-bar-toggle");
  searchBarWrapperElement.classList.toggle("hiden");
  searchBtnElement.classList.toggle("hiden");
}

