//lay du lieu ve
const products = JSON.parse(localStorage.getItem("products"));

let i = 0; //tao bien i de tim vi tri product trong products dung de edit product

//truy van den thong tin form
const formEditElement = document.querySelector("#form-edit-product");
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

renderProduct(products);
//render du lieu
function renderProduct(listProduct) {
  let html = "";
  listProduct.forEach(function (product, index) {
    html += ` <tr>
                      <td>${index + 1}</td>
                      <td>${product.product_code}</td>
                      <td>${product.name}</td>
                      <td>$${product.price}</td>
                      <td>$${product.old_price}</td>
                      <td>$${product.quantity_stock}</td>
                     
                      <td class="td-action">
                        <button
                          class="action  blue-color"
                          id="btn-view"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-product"
                          onclick='handleEditProduct(${product.product_id})'
                        >
                          Edit
                        </button>
                        <button class="action  secondary-color" id="btn-delete" onclick="handleDeleteProduct(${
                          product.product_id
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
    if (product.product_id === id) {
      i = index;
    }
  });
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProduct(products);
}

//View product
function handleEditProduct(id) {
  //tim product trong mang products
  const product = products.find((p) => p.product_id === id);
  //tim vi tri product trong mang products de edit
  products.filter(function (product, index) {
    if (product.product_id === id) {
      i = index;
    }
  });

  //in gia tri ra form
  productIdElement.value = product.product_id;
  productNameElement.value = product.name;
  productPriceElement.value = product.price;
  productOldPriceElement.value = product.oldPrice || "";
  productCategoryElement.value = product.category;
  productImageElement.value = product.image;
  productDateInElement.value = product.date_in;
  productDateOutElement.value = product.date_out;
  productNewElement.value = product.new || "";
  productBestSellElement.value = product.sell || "";
  productBestDealElement.value = product.best_deal || "";
  productDescElement.value = product.description;
  productCodeElement.value = product.product_code;
}

//validate form edit
formEditElement.addEventListener("submit", function (e) {
  e.preventDefault();

  // B1: Lấy product

  const product = getProduct();

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
  return {
    id: productIdElement.value.trim(),
    name: productNameElement.value.trim(),
    price: productPriceElement.value.trim(),
    old_price: productOldPriceElement.value.trim(),
    category: productCategoryElement.value.trim(),
    code: productCodeElement.value.trim(),
    images: productImageElement.value.trim(),
    date_in: productDateInElement.value.trim(),
    date_out: productDateOutElement.value.trim(),
    new: productNewElement.value.trim(),
    best_sell: productBestSellElement.value.trim(),
    best_deal: productBestDealElement.value.trim(),
    description: productDescElement.value.trim(),
  };
}

//Hiển thị lỗi
function renderError(error) {
  //truy van den the hien thi loi

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
  const productDateInElement = document.querySelector(".error-date-in");
  const productDescElement = document.querySelector(".error-product-desc");

  //hien thi loi

  idErrorElement.textContent = error.msgId;
  nameErrorElement.textContent = error.msgName;
  productPriceErrorElement.textContent = error.msgPrice;
  productCodeErrorElement.textContent = error.msgCode;
  productCategoryElement.textContent = error.msgCategory;
  productImagesElement.textContent = error.msgImages;
  productDescElement.textContent = error.msgDesc;
  productDateInElement.textContent = error.msgDateIn;
}
//check loi
function checkError(product) {
  const imageInput = product.images.split(",");
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
  } else if (imageInput.length < 4 || imageInput.length > 4) {
    error.isError = true;
    error.msgImages = "You must enter 4 image names separated by commas.";
  }
  //check  date in
  if (!product.date_in) {
    error.isError = true;
    error.msgDateIn = "Product Date In cannot be empty";
  }
  //check  code
  if (!product.description) {
    error.isError = true;
    error.msgDesc = "Product description cannot be empty";
  }

  //return all errors
  return error;
}
