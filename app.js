function maskPassword(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt);
  alert("Copied the Text :" + txt);
}

const deletepassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrupdate = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrupdate));
  alert(`Successfully Delete ${website}'s password !`);
  showPassword();
};

// logic to fill the table

const showPassword = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");

  if (data === null || JSON.parse(data).length == 0) {
    tb.innerHTML = ` <tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
  </tr>`;
    tb.style.border = "none";
  } else {
    tb.innerHTML = ` <tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
  </tr>`;
    let arr = JSON.parse(data);
    let str = "";

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
        <td>${element.website}  <img  onclick="copyText('${
        element.website
      }')" src="copy.svg" alt="Copy Button" width ="15" height="15"> </td>
        <td>${element.username} <img onclick="copyText('${
        element.username
      }')" src="copy.svg" alt="Copy Button" width ="15" height="15"> </td>
        <td> ${maskPassword(element.password)} <img onclick="copyText('${
        element.password
      }')" src="copy.svg" alt="Copy Button" width ="15" height="15"> </td>
        <td> <button class="dbtn" onclick="deletepassword('${
          element.website
        }')">Delete</button> </td>
        </tr>`;
    }
    tb.innerHTML += str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

// working

showPassword();
let btns = document.querySelector(".btn");

btns.addEventListener("click", (e) => {
  e.preventDefault();

  let passwords = localStorage.getItem("passwords");

  if (passwords === null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password is Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password is Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPassword();
});
