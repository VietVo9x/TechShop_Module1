//truy van den doi tuong hien thi
const categpryProductElement = document.querySelector(".category-products");
const listProduct = JSON.parse(localStorage.getItem("products"));
//lay san pham tren local ve
renderProducts(listProduct);
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
                      <a href=""><i class="fa-solid fa-cart-shopping"></i></a>
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

    renderProduct(dataFilter); // ta được mảng sản phẩm đã filter vả render ra
    console.log(1111, dataFilter);
  });
});

//handle view product
function handleViewProduct(product_id) {
  console.log(product_id);
  const product = listProduct.filter((item) => {
    return product_id === item.product_id;
  });
  localStorage.setItem("product", JSON.stringify(product));
  document.location.href = "./product-detail.html";
}
