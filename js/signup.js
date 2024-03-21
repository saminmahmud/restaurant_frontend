// alert()
const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };
  // console.log(info);

  if (password === confirm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      //   console.log(info);

      fetch("https://restaurant-zz0i.onrender.com/account/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          getValuenull("username");
          getValuenull("first_name");
          getValuenull("last_name");
          getValuenull("email");
          getValuenull("password");
          getValuenull("confirm_password");
          //     document.getElementById("error").innerText =
          // "Check email for account validation";
          swt();
        });
    } else {
      document.getElementById("error").innerText =
        "pass must contain eight characters, at least one letter, one number and one special character:";
      getValuenull("password");
      getValuenull("confirm_password");
    }
  } else {
    document.getElementById("error").innerText =
      "password and confirm password do not match";
    alert("password and confirm password do not match");
    getValuenull("password");
    getValuenull("confirm_password");
  }

  //   window.location.href = "login.html";
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const getValuenull = (id) => {
  const value = (document.getElementById(id).value = "");
  return value;
};

const swt = () => {
  // e.preventDefault();
  Swal.fire({
    title: "Thank you for creating an account.",
    text: "Check email for account validation!",
    icon: "success",
    confirmButtonText: "Close",
    onClose: () => {
      // Reload the page after the SweetAlert is closed
      window.location.href = "login.html";
    },
  });
};

const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");

const cartbtnnnn = () => {
  // console.log("useri d",user_id );
  parent = document.getElementById(`cartno`);
  fetch("https://restaurant-zz0i.onrender.com/cart/")
    .then((response) => response.json())
    .then((data) => {
      // Calculate the total number of items
      if (user_id && token) {
        const userCartItems = data.filter(
          (item) => item.user === parseInt(user_id)
        );
        const totalItems = userCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        document.getElementById(`cartno`).innerText = `${totalItems}`;
      }
      // Print the total number of items
      // console.log("Total items:", totalItems);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

cartbtnnnn();

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const parent3 = document.getElementById("login");
  const parent4 = document.getElementById("logoutButton");

  if (user_id && token) {
    parent3.style.display = "none"; // Hide login
    parent4.style.display = "block"; // Show logout

    fetch(`https://restaurant-zz0i.onrender.com/account/list/${user_id}/`)
      .then((res) => res.json())
      .then((userData) => {
        if (userData.user_super) {
          const parent1 = document.getElementById("addfood");
          // const parent2 = document.getElementById("addcategory");
          parent1.style.display = "block";
          // parent2.style.display = "block";
        } else {
          // console.log("ok");
        }
      });
  } else {
    const logoutButton = document.getElementById("cartbtn");
    logoutButton.addEventListener("click", () => {
      logoutButton.href = "login.html";
      // console.log("clicked login");
    });
  }
});
