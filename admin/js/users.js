//lay du lieu ve
const listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
//truy van den tat ca phan tu form
const emailEl = document.querySelector("#email");
const nameEl = document.querySelector("#name");
const addressEl = document.querySelector("#address");
const phoneEl = document.querySelector("#phone");
const statusEl = document.querySelector("#status");

renderListUsers(listUsers);
function renderListUsers(list) {
  let html = "";
  list.forEach(function (user, index) {
    html += ` <tr>
                      <td>${index + 1}</td>
                      <td>${user.email}</td>
                      <td>${user.name}</td>
                      <td>${user.phone}</td>
                      <td>${user.address}</td>
                      <td>${user.status}</td>
                      <td class="td-action">
                        <button
                          class="action view primary-color"
                          data-bs-toggle="modal"
                          data-bs-target="#view-user"
                          onclick='handleViewUser("${user.email}")'
                        >
                          VIEW</button
                        ><button class="action block secondary-color" onclick="handleBlock('${
                          user.email
                        }')">
                          ${user.status === "active" ? "BLOCK" : "ACTIVE"}
                        </button>
                      </td>
                    </tr>`;
  });
  //truy van den phan tu de render
  const listUsersEl = document.querySelector("#list-user tbody");
  listUsersEl.innerHTML = html;
}
//view user info
function handleViewUser(email) {
  const user = listUsers.find((user) => user.email === email);
  emailEl.value = user.email;
  nameEl.value = user.name;
  addressEl.value = user.address;
  phoneEl.value = user.phone;
  statusEl.value = user.status;
}
//block or active user
function handleBlock(email) {
  const user = listUsers.find((user) => user.email === email);
  if (user.status === "active") {
    user.status = "block";
  } else {
    user.status = "active";
  }
  localStorage.setItem("listUsers", JSON.stringify(listUsers));
  renderListUsers(listUsers);
}
//tim kiem theo ten the select
function sortUsersByName() {
  const newList = [...listUsers];
  const selectElement = document.querySelector("#sort-user");
  let sortUsersByNameArr = [];
  if (selectElement.value) {
    sortUsersByNameArr = newList.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Chuyển tên thành chữ hoa để so sánh không phân biệt hoa thường
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1; // Trả về -1 nếu a đứng trước b
      } else if (nameA > nameB) {
        return 1; // Trả về 1 nếu b đứng trước a
      } else {
        return 0; // Trả về 0 nếu tên của a và b bằng nhau
      }
    });
    renderListUsers(sortUsersByNameArr);
  }
}
//search bar user
function handleSearch() {
  const searchUserElement = document.querySelector("#search-user-input");

  const newArrUser = listUsers.filter(function (user) {
    return (
      user.email.includes(searchUserElement.value) ||
      user.name.includes(searchUserElement.value)
    );
  });
  renderListUsers(newArrUser);
}
