// Capture HTML elements
const btn_load_users = document.getElementById("btn_load_users");
const loader = document.getElementById("loader");
const error_box = document.getElementById("error_box");
const table = document.getElementById("table");
const form = document.getElementById("form");
let btn_delete = document.getElementById("btn_delete");
let user_name, user_year, user_country, user_email;

btn_load_users.addEventListener("click", getDataFetch); // READ

// Read data from Database
function getDataFetch() {
  // Insert once into HTML Table-Header (So this operation will not run on loops)
  table.innerHTML = `   <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Country</th>
      <th>E-mail</th>
      <th>Action</th>
    </tr>`;
  loader.classList.add("active");
  let results;
  // Testing Url: https://www.json-generator.com/api/json/get/cljKBuMIgO?indent=2
  // fetch() GET method
  fetch("php/users.php")
    .then((response) => response.json())
    .then((data) => {
      results = data;
      console.log("We found this: ", results);
    })
    .then(() => {
      results.forEach((result) => {
        let element = document.createElement("tr");
        element.innerHTML += "<td>" + result.id + "</td>";
        element.innerHTML += "<td>" + result.name + "</td>";
        element.innerHTML += "<td>" + result.year + "</td>";
        element.innerHTML += "<td>" + result.country + "</td>";
        element.innerHTML += "<td>" + result.email + "</td>";
        element.innerHTML += `<td> <button type="submit" onclick=deleteUser(${result.id}) class="btn_delete">Delete</button></td>`;
        document.getElementById("table").appendChild(element);
      });
    })
    .then(() => loader.classList.remove("active"))
    .catch(() => {
      error_box.classList.add("active");
    });
}
form.addEventListener("submit", function (event) {
  // CREATE
  addUsers(event);
});
async function addUsers(event) {
  event.preventDefault();
  // Try validate inputs values and send through fetch()
  try {
    // Clean and capture input values
    // console.log(form); // Access to inputs values through form.inputName.value
    user_name = form.name.value.trim();
    user_year = parseInt(form.year.value.trim());
    user_country = form.country.value.trim();
    user_email = form.email.value.trim();
    // Execute and test validForm() result (sanitize inputs values)
    if (validForm()) {
      error_box.classList.remove("active");
      // success case: Send data as Url-Params to Php module
      // Ex: name&year&country&email
      // console.log("validation: OK");
      // Create the body-info will send to addUsers.php through fetch()
      let params = `name=${user_name}&year=${user_year}&country=${user_country}&email=${user_email}`;
      await fetch("php/addUsers.php", {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })
        .then(() => {
          // Get all data (including newest)
          getDataFetch();
          // Clean inputs
          form.name.value = "";
          form.year.value = "";
          form.country.value = "";
          form.email.value = "";
          console.log("data submit: ", params);
        })
        .then(() => {
          loader.classList.remove("active");
        })
        .catch((error) => {
          // Error case: custom message
          error_box.classList.add("active");
          error_box.innerHTML = "Error sending data";
          console.log("ERROR FETCHING DATA", error);
        });
      loader.classList.add("active");
    } else {
      // Error case: custom message
      error_box.classList.add("active");
      error_box.innerHTML = "Please, complete all inputs form";
    }
  } catch (error) {
    console.log(error);
  }
}
function validForm() {
  if (user_name == "") {
    return false;
  } else if (isNaN(user_year)) return false;
  else if (user_country == "") return false;
  else if (user_email == "") return false;
  return true;
}
function deleteUser(id) {
  console.log("This document will be removed: ", id);
  try {
    let params = `id=${id}`;
    fetch("php/deleteUser.php", {
      method: "POST",
      headers: {
        //"Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }).then(() => {
      getDataFetch();
      console.log("Deleted successfully");
    });
  } catch (error) {
    console.log(error);
  }
}

/*  fetch() structure

const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects */
