//lay du lieu ve
const products = JSON.parse(localStorage.getItem("products")) || [];

let i = 0; //tao bien i de tim vi tri product trong products dung de edit product

//truy van den thong tin form edit
const formEditElement = document.querySelector("#form-edit-product");
//truy van den thong tin form edit
const formAddElement = document.querySelector("#form-add-product");
//truy van den danh sach the input cua form edit product
const inputFormEditElement = document.querySelectorAll(
  "#form-edit-product input"
);
//truy van den input form-dit
const productIdElement = document.querySelector("#product-id");
const productNameElement = document.querySelector("#product-name");
const productPriceElement = document.querySelector("#product-price");
const productOldPriceElement = document.querySelector("#product-old-price");
const productCategoryElement = document.querySelector("#product-category");
const productCodeElement = document.querySelector("#product-code");
const productImageElement = document.querySelector("#product-images");
const productDateInElement = document.querySelector("#product-date-in");
const productDateOutElement = document.querySelector("#product-date-out");
const productNewElement = document.querySelector("#product-new");
const productBestSellElement = document.querySelector("#product-best-sell");
const productBestDealElement = document.querySelector("#product-best-deal");
const productDescElement = document.querySelector("#product-description");
const productStockElement = document.querySelector("#product-instock");

renderProduct(products);
//render danh sach product
function renderProduct(listProduct) {
  let html = "";
  listProduct.forEach(function (product, index) {
    html += ` <tr>
                      <td>${index + 1}</td>
                      <td>${product.code}</td>
                      <td>${product.name}</td>
                      <td>$${product.price}</td>
                      <td>${product.date_in}</td>
                      <td>${product.in_stock}</td>
                     
                      <td class="td-action">
                        <button
                          class="action  blue-color"
                          id="btn-view"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-product"
                          onclick='handleEditProduct(${product.id})'
                        >
                          Edit
                        </button>
                        <button class="action  secondary-color" id="btn-delete" onclick="handleDeleteProduct(${
                          product.id
                        })">
                          Delete
                        </button>
                      </td>
                    </tr>
        `;
  });
  //ttruy van phan tu render
  const renderEl = document.querySelector("#list-product tbody");
  renderEl.innerHTML = html;
}

//delete product
function handleDeleteProduct(id) {
  let i = 0;
  products.filter((product, index) => {
    if (product.id === id) {
      i = index;
    }
  });
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProduct(products);
}

//View all info product
function handleEditProduct(id) {
  console.log(id);
  //tim product trong mang products
  const product = products.find((p) => p.id == id);
  console.log(product);
  //tim vi tri product trong mang products de edit
  products.filter(function (product, index) {
    if (product.id == id) {
      i = index;
    }
  });

  //in gia tri ra form va chi duoc xem
  productIdElement.value = product.id;
  productNameElement.value = product.name;
  productPriceElement.value = product.price;
  productOldPriceElement.value = product.oldPrice || "";
  productCategoryElement.value = product.category;
  productDateInElement.value = product.date_in;
  productDateOutElement.value = product.date_out;
  productNewElement.value = product.new || "";
  productBestSellElement.value = product.best_sell || "";
  productBestDealElement.value = product.best_deal || "";
  productDescElement.value = product.description;
  productCodeElement.value = product.code;
  productStockElement.value = product.in_stock || "";
  //them readOnly cho input

  inputFormEditElement.forEach((input) => {
    input.readOnly = true;
  });
  // Kiểm tra thuộc tính "type" của input
  const isFileType = productImageElement.type === "file";

  if (isFileType) {
    productImageElement.setAttribute("type", "text");
  }
  productImageElement.value = product.images;
}

function handleFormEditProduct(event) {
  //loai bo hanh dong mac dinh cua btn
  event.preventDefault();

  inputFormEditElement.forEach((input) => {
    input.readOnly = false;
  });
  // Đặt lại thuộc tính 'type' thành 'file'
  productImageElement.setAttribute("type", "file");

  // Thêm thuộc tính 'multiple'
  productImageElement.setAttribute("multiple", "multiple");
}

//validate form edit
formEditElement.addEventListener("submit", function (e) {
  e.preventDefault();

  // B1: Lấy product

  const product = getProduct();
  console.log(product);

  //  Validator
  const error = checkError(product);

  // hien thi loi
  renderError(error);
  if (error.isError) {
    return;
  }

  //update lai product trong products
  products.splice(i, 1, product);
  //Gui len lai local
  localStorage.setItem("products", JSON.stringify(products));

  renderProduct(products);
});

function getProduct() {
  let images = [];
  if (productImageElement.files) {
    for (let i = 0; i < productImageElement.files.length; i++) {
      images.push(productImageElement.files[i].name);
    }
  }

  console.log(images);
  return {
    id: productIdElement.value.trim(),
    name: productNameElement.value.trim(),
    price: productPriceElement.value.trim(),
    old_price: productOldPriceElement.value.trim(),
    category: productCategoryElement.value.trim(),
    code: productCodeElement.value.trim(),
    images: images,
    date_in: productDateInElement.value.trim(),
    date_out: productDateOutElement.value.trim(),
    new: productNewElement.value.trim(),
    best_sell: productBestSellElement.value.trim(),
    best_deal: productBestDealElement.value.trim(),
    description: productDescElement.value.trim(),
    in_stock: productStockElement.value.trim(),
  };
}

//Hiển thị lỗi
function renderError(error) {
  //truy van den the hien thi loi edit product
  const idErrorElement = document.querySelector(".error-product-id");
  const nameErrorElement = document.querySelector(".error-name");
  const productPriceErrorElement = document.querySelector(
    ".error-product-price"
  );
  const productCodeErrorElement = document.querySelector(".error-product-code");
  const productCategoryElement = document.querySelector(
    ".error-product-category"
  );
  const productImagesElement = document.querySelector(".error-product-images");
  const productDateInErrorElement = document.querySelector(".error-date-in");
  const productDescErrorElement = document.querySelector(".error-product-desc");

  //hien thi loi edit product

  idErrorElement.textContent = error.msgId;
  nameErrorElement.textContent = error.msgName;
  productPriceErrorElement.textContent = error.msgPrice;
  productCodeErrorElement.textContent = error.msgCode;
  productCategoryElement.textContent = error.msgCategory;
  productImagesElement.textContent = error.msgImages;
  productDescErrorElement.textContent = error.msgDesc;
  productDateInErrorElement.textContent = error.msgDateIn;
}
//check loi
function checkError(product) {
  const error = {
    isError: false,
    msgId: "",
    msgName: "",
    msgPrice: "",
    msgCode: "",
    msgCategory: "",
    msgImages: "",
    msgDateIn: "",
    msgDesc: "",
    msgInStock: "",
  };

  //check  id
  if (!product.id) {
    error.isError = true;
    error.msgId = "Product Id cannot be empty";
  }
  //check  name
  if (!product.name) {
    error.isError = true;
    error.msgName = "Product Name cannot be empty";
  }
  //check  category
  if (!product.category) {
    error.isError = true;
    error.msgCategory = "Product Category cannot be empty";
  }
  //check  price
  if (!product.price) {
    error.isError = true;
    error.msgPrice = "Product Price cannot be empty";
  }
  //check  code
  if (!product.code) {
    error.isError = true;
    error.msgCode = "Product Code cannot be empty";
  }
  //check  image
  if (!product.images) {
    error.isError = true;
    error.msgImages = "Product Image cannot be empty";
  } else if (product.images.length < 4 || product.images.length > 4) {
    error.isError = true;
    error.msgImages = "You must enter 4 image";
  }
  //check  date in
  if (!product.date_in) {
    error.isError = true;
    error.msgDateIn = "Product Date In cannot be empty";
  }
  //check  in stock
  if (!product.in_stock) {
    error.isError = true;
    error.msgDesc = "Product in stock cannot be empty";
  }
  //check  desc
  if (!product.description) {
    error.isError = true;
    error.msgInStock = "Product description cannot be empty";
  }
  console.log(error);
  //return all errors
  return error;
}

//truy van den cac thanh phan form add product
const addIdProductEl = document.querySelector("#add-product-id");
const addNameProductEl = document.querySelector("#add-product-name");
const addPriceProductEl = document.querySelector("#add-product-price");
const addOldPriceProductEl = document.querySelector("#add-product-old-price");
const addCodeProductEl = document.querySelector("#add-product-code");
const addCategoryProductEl = document.querySelector("#add-product-category");
const addImagesProductEl = document.querySelector("#add-product-images");
const addDateInProductEl = document.querySelector("#add-product-dateIn");
const addNewProductEl = document.querySelector("#add-product-new");
const addSellProductEl = document.querySelector("#add-product-sell");
const addDateOutProductEl = document.querySelector("#add-product-date-out");
const addDealProductEl = document.querySelector("#add-product-deal");
const addStockProductEl = document.querySelector("#add-product-stock");
const addDescProductEl = document.querySelector("#add-product-desc");

////validate add product
formAddElement.addEventListener("submit", function (e) {
  //loai bo hanh dong mac dinh cua form
  e.preventDefault();

  // B1: Lấy product

  const productAdd = getAddProduct();

  //  Validator
  const error = checkError(productAdd);

  // hien thi loi
  renderErrorAdd(error);
  if (error.isError) {
    return;
  }
  products.push(productAdd);
  //Gui len lai local
  localStorage.setItem("products", JSON.stringify(products));
  alert("da them mat hang thanh cong");
  renderProduct(products);
});

//get add product
function getAddProduct() {
  let images = [];
  if (addImagesProductEl.files) {
    for (let i = 0; i < addImagesProductEl.files.length; i++) {
      images.push(addImagesProductEl.files[i].name);
    }
  }

  return {
    id: addIdProductEl.value.trim(),
    name: addNameProductEl.value.trim(),
    price: addPriceProductEl.value.trim(),
    old_price: addOldPriceProductEl.value.trim(),
    category: addCategoryProductEl.value.trim(),
    code: addCodeProductEl.value.trim(),
    images: images,
    date_in: addDateInProductEl.value.trim(),
    date_out: addDateOutProductEl.value.trim(),
    new: addNewProductEl.value.trim(),
    best_sell: addSellProductEl.value.trim(),
    best_deal: addDealProductEl.value.trim(),
    description: addDescProductEl.value.trim(),
    in_stock: addStockProductEl.value.trim(),
  };
}

//render error add product
function renderErrorAdd(error) {
  //truy van den the hien thi loi add product
  const addIdErrorElement = document.querySelector(".add-id-error");
  const addNameErrorElement = document.querySelector(".add-name-error");
  const addPriceErrorElement = document.querySelector(".add-price-error");
  const addCodeErrorElement = document.querySelector(".add-code-error");
  const addCategoryElement = document.querySelector(".add-category-error");
  const addImagesElement = document.querySelector(".add-images-error");
  const addDateInErrorElement = document.querySelector(".add-dateIn-error");
  const addStockErrorElement = document.querySelector(".add-error-instock");
  const addDescErrorElement = document.querySelector(".add-error-desc");
  //hien thi loi add product
  addIdErrorElement.textContent = error.msgId;
  addNameErrorElement.textContent = error.msgName;
  addPriceErrorElement.textContent = error.msgPrice;
  addCodeErrorElement.textContent = error.msgCode;
  addCategoryElement.textContent = error.msgCategory;
  addImagesElement.textContent = error.msgImages;
  addDescErrorElement.textContent = error.msgDesc;
  addDateInErrorElement.textContent = error.msgDateIn;
  addStockErrorElement.textContent = error.msgInStock;
}
