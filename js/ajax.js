//
//
// THIS IS TESTING FILE
//
//

let btn = document.getElementById("btn_load_users");
let loader = document.getElementById("loader");

btn.addEventListener("click", getDataFetch);
function getDataFetch() {
  loader.classList.add("active");
  let results;
  // https://www.json-generator.com/api/json/get/cljKBuMIgO?indent=2
  fetch("php/users.php")
    .then((response) => response.json())
    .then((data) => {
      results = data;
      console.log(results);
    })
    .then(() => {
      results.forEach((result) => {
        let element = document.createElement("tr");
        element.innerHTML += "<td>" + result.id + "</td>";
        element.innerHTML += "<td>" + result.nombre + "</td>";
        element.innerHTML += "<td>" + result.edad + "</td>";
        element.innerHTML += "<td>" + result.pais + "</td>";
        element.innerHTML += "<td>" + result.correo + "</td>";
        document.getElementById("table").appendChild(element);
      });
    })
    .then(() => loader.classList.remove("active"));
}

/* Old method
function getDataHttp() {
    let request = new XMLHttpRequest();
    request.open('GET', "https://www.json-generator.com/api/json/get/cljKBuMIgO?indent=2")
    request.send();
}
*/
