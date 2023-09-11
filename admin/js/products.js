//lay du lieu ve
const products = JSON.parse(localStorage.getItem("products"));

//truy van den thong tin form
const formEditElement = document.querySelector("#form-edit-product");
//truy van den input form
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

renderProduct();
//render du lieu
function renderProduct() {
  let html = "";
  products.forEach(function (product, index) {
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
  renderProduct();
}

//edit product
function handleEditProduct(id) {
  const product = products.find((p) => p.product_id === id);
  console.log(product);
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
