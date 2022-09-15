const userForm = document.querySelector("#userForm");
const tbody = document.querySelector(".table-group-divider");
const submit = document.querySelector("#userFormSubmit");
const keys = ["id", "first_name", "last_name", "code", "phone", "email"];
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  if (submit.value === "update") {
    const row = document.getElementById(data.id);
    for (let i = 0; i < keys.length; i++) {
      row.childNodes[i].innerText = data[keys[i]];
    }
  } else {
    data.id = Math.floor(Math.random() * 1000);
    const row = document.createElement("tr");
    row.id = data.id;
    for (let key of keys) {
      const td = document.createElement("td");
      td.innerText = data[key];
      row.appendChild(td);
    }
    //  add action column
    const td = document.createElement("td");
    //  add Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.innerText = "DELETE";
    deleteButton.addEventListener("click", function (e) {
      tbody.removeChild(e.target.parentElement.parentElement);
    });
    //  add Update button
    const updateButton = document.createElement("button");
    updateButton.classList.add("btn", "btn-success");
    updateButton.innerText = "UPDATE";
    updateButton.addEventListener("click", function (e) {
      submit.value = "update";
      const row = e.target.parentElement.parentElement;
      for (let i = 0; i < row.childNodes.length - 1; i++) {
        const input = document.getElementById(keys[i]);
        input.value = row.childNodes[i].innerText;
      }
    });
    // append row to table
    td.appendChild(deleteButton);
    td.appendChild(updateButton);
    row.appendChild(td);
    tbody.appendChild(row);
  }
  submit.value = "create";
  e.target.reset();
});
