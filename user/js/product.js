//truy van den doi tuong hien thi
const categpryProductElement = document.querySelector(".category-products"); //noi hien thi toan bo san pham
const productsDB = JSON.parse(localStorage.getItem("products")) || []; //list san pham hien thi
const iconCartElement = document.querySelector(".quantity"); // so luong gio hang
const listCart = JSON.parse(localStorage.getItem("listCart")) || []; // list san pham da mua
const userLogin = JSON.parse(localStorage.getItem("userLogin")); //email dang mua
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
//ham render toan bo san pham
function renderProducts(listItems) {
  let html = "";
  listItems.map(function (user) {
    html += `<div class="card">
                  <div class="card-top">
                    <a href=""
                      ><img src="./user/assets/images/product/${user.image[0]}" alt="..."
                    /></a>
                    <div class="btn-position">
                      <a href="#" onclick="handleViewProduct(${user.product_id})"><i class="fa-regular fa-eye"></i></a>
                      <a href=""><i class="fa-solid fa-heart"></i></a>
                      <a href="#" onclick="handleAddToCartProduct(${user.product_id})"><i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                  </div>
                  <div class="card-body">
                    <a class="card-title" href="">${user.name}</a>
                    <p class="card-price">$${user.price}</p>
                  </div>
                </div>`;
  });
  categpryProductElement.innerHTML = html;
}
renderProducts(productsDB);

// truy van den the ul menu-category lay tat ca the input
const categorysInputElement = document.querySelectorAll(".menu-category input");
// lặp qua tất cả phần tử
categorysInputElement.forEach(function (inputElement) {
  inputElement.addEventListener("change", function (e) {
    //addeventlistener cho các thẻ input
    const filterCategory = []; // tạo mảng chứa các filter category
    const filterPrice = []; // tạo mảng chứa các filter price

    let isCheckedCategory = false; //tạo biến để check điều kiện category
    let isCheckedPrice = false; //tạo biến để check điều kiện price
    categorysInputElement.forEach((input) => {
      const dataFilter = input.dataset.filter; //truy vấn đén các thẻ input có attribues data-filter
      //nếu input được checked và data-filter là category
      if (input.checked && dataFilter === "category") {
        isCheckedCategory = true; //đổi biến check điều kiện category thành true
        filterCategory.push(Number(input.value)); //đổi input.value thành number và push vào mảng filterCategory
      }
      //nếu input được checked và datafiler là price
      else if (input.checked && dataFilter === "price") {
        isCheckedPrice = true; //đổi biến check điều kiện price thành true
        const value = input.value.split("-"); //đổi input.value thành mảng []
        //thêm giá trị mảng value vào mảng filterPrice theo mảng như sau : [min,max]
        filterPrice.push({ min: Number(value[0]), max: Number(value[1]) });
      }
    });
    let dataCategory = listProduct; //nếu lúc mình chưa filter thì dataCategory = data ban đầu
    if (isCheckedCategory) {
      //nếu isCheckedCategory = true là mình đã checked
      dataCategory = listProduct.filter((product) =>
        filterCategory.find((category) => category === product.category)
      );
      /**đoạn mã trên sẽ lọc listProduct và chỉ trả về các sản phẩm có product.category trùng với một phần tử
       * trong filterCategory. Kết quả cuối cùng là một danh sách các sản phẩm thuộc các danh mục được
       * chỉ định trong filterCategory, và danh sách này được gán cho biến dataCategory.
       */
    }
    let dataFilter = dataCategory;
    //lấy dữ liệu đã filter ở trên gán lại cho biến datafilter,nếu không filter thì trả lại mảng trên

    if (isCheckedPrice) {
      //check tiếp nếu có filter thì xử lý
      dataFilter = dataCategory.filter(
        (product) =>
          filterPrice.find(
            (price) => price.min <= product.price && price.max >= product.price
          ) // tìm những sản phẩm có trong khoảng giá min -> max ở trên cho vào mảng
      );
    }

    renderProducts(dataFilter); // ta được mảng sản phẩm đã filter vả render ra
    console.log(1111, dataFilter);
  });
});

//handle view product
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
