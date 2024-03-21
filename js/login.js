
// window.addEventListener("DOMContentLoaded", () => {
//   cartbtnnnn();
// });


const lll = () =>{
  console.log('lll');
  // window.onload = function() {
    swtlogin(); 
  // };
};

const ooo = () =>{
  console.log('ooo');
  // window.onload = function() {
    swtlogout(); 
  // };
};

document.addEventListener("DOMContentLoaded", function() {
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
          const parent2 = document.getElementById("orders");
          parent1.style.display = "block";
          parent2.style.display = "block";
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


const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};


const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  // console.log(username, password);
  if (username && password) {
    fetch("https://restaurant-zz0i.onrender.com/account/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data);
        // console.log("login done");
        // swt();
        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);

          fetch(
            `https://restaurant-zz0i.onrender.com/account/list/${data.user_id}/`
          )
            .then((res) => res.json())
            .then((userData) => {
              // console.log(userData);
            });
            
          swt();
        }
      });
  }
};


// logout part
const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");

const handlelogOut = async () => {
    // const token = localStorage.getItem("token");
    // console.log(token);
    // Check if token exists
    if (!token) {
      console.log("No token found, unable to logout.");
      return;
    }
  
    try {
      // Make API call to logout
      const response = await fetch("https://restaurant-zz0i.onrender.com/account/login/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // Check if logout was successful
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
  
      // Remove token and user_id from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
  
      lwt();
      // console.log("Logout successful");
      // Redirect to index.html or any other page after logout
      
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };
  
  // Add event listener to the logout button
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", handlelogOut);



  const cartbtnnnn = () => {
  // alert()
  // console.log("useri d",user_id );
  parent = document.getElementById(`cartno`);
  fetch("https://restaurant-zz0i.onrender.com/cart/")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of items
    if(user_id && token){
      const userCartItems = data.filter(item => item.user === parseInt(user_id));
      const totalItems = userCartItems.reduce((total, item) => total + item.quantity, 0);
      document.getElementById(`cartno`).innerText=`${totalItems}`;
      // console.log("Total items:", userCartItems);
    }
    // Print the total number of items
  })
  .catch((error) => console.error("Error fetching data:", error));

};

cartbtnnnn();



const swt= () => {
  // e.preventDefault();
  Swal.fire({
    // title: "Thank You",
    text: "Logged in successfully",
    icon: "success",
    confirmButtonText: "Close",
    onClose: () => {
      // Reload the page after the SweetAlert is closed
      window.location.href = "index.html";
    },
  });
};


const lwt = () => {
  // e.preventDefault();
  Swal.fire({
    text: 'Logout Successfully',
    icon: 'success',
    confirmButtonText: "Close",
    onClose: () => {
      // Reload the page after the SweetAlert is closed
      window.location.href = "index.html";
    },
  });
};

