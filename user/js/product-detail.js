//truy van den phan tu de render ra giao dien
const productElement = document.querySelector(".product-content");
renderProduct();
function renderProduct() {
  const productItem = JSON.parse(localStorage.getItem("product"));
  console.log(productItem);
}
