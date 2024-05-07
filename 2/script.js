let fetchData = () => {
  // Clear existing records from local storage
  localStorage.removeItem("users");

  let httprequest = new XMLHttpRequest();
  httprequest.open("GET", "https://jsonplaceholder.typicode.com/users/");
  httprequest.send();
  httprequest.onload = () => {
    let res = JSON.parse(httprequest.responseText);
    console.log(res);
    localStorage.setItem("users", JSON.stringify(res));
    displayData();
  };
};
// Rest of the code remains the same

let displayData = () => {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  let storedUser = JSON.parse(localStorage.getItem("users"));
  storedUser.map(
    (user, index) =>
      (tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.address.city}</td>
                    <td>${user.website}</td>
                </tr>`)
  );
};
//initial Data
fetchData();

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const website = document.getElementById("website").value;
  const phone = document.getElementById("phone").value;

  let postObject = {
    email,
    password,
    name,
    website,
    phone,
    username,
    address: {
      city: city,
    },
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users/");
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(JSON.stringify(postObject));

  xhr.onload = () => {
    if (xhr.status == 201) {
      // let res = xhr.response
      // console.log(res)
      let storedUser = JSON.parse(localStorage.getItem("users"));
      storedUser.unshift(postObject);
      localStorage.setItem("users", JSON.stringify(storedUser));
      displayData();
    }
  };
});

// Clear local storage when the page loads
window.onload = () => {
  localStorage.removeItem("users");
};