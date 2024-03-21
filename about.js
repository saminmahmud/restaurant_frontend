const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");

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


const cartbtnnnn = () => {
  // console.log("useri d",user_id );
  parent = document.getElementById(`cartno`);
  fetch("https://restaurant-zz0i.onrender.com/cart/")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of items
    if(user_id && token){
      const userCartItems = data.filter(item => item.user === 1);
      const totalItems = userCartItems.reduce((total, item) => total + item.quantity, 0);
      document.getElementById(`cartno`).innerText=`${totalItems}`;
    }
    // Print the total number of items
    // console.log("Total items:", totalItems);
  })
  .catch((error) => console.error("Error fetching data:", error));

};

cartbtnnnn();


const loadreview = () => {
  // e.preventDefault();
  document.getElementById("review").innerHTML = "";
  parent = document.getElementById("review");
  fetch("https://restaurant-zz0i.onrender.com/review/")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.name);
      data.forEach((item) => {
        const createdDate = new Date(item.created);
        const formattedDate = createdDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // const formattedTime = createdDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const div = document.createElement("div");
        div.setAttribute(
          "style",
          "background-color: rgb(56, 54, 50); padding: 10px; border: 2px solid; border-radius: 10px; margin-bottom: 7px;color: aliceblue;"
        );
        div.innerHTML = `
                <p>${formattedDate}</p>
                <h6><strong>Name:</strong> ${item.name}</h6>
                <h6><strong>Rating:</strong> ${item.rating}</h6>
                <h6><strong>Massage:</strong> ${item.body}</h6>    
            `;
        parent.appendChild(div);
      });
    });
};

window.addEventListener("DOMContentLoaded", () => {
  loadreview();
});



const submitreview = (e) => {
  e.preventDefault();
  const rt = document.getElementById("rateSelect").value;
  let rating = "";
  for (let i = 0; i < rt; i++) {
    rating += "⭐";
  }
  //   console.log(rating);

  const name = document.getElementById("your_name").value;
  const body = document.getElementById("subject").value;

  const info = {
    rating,
    name,
    body,
  };

//   console.log("info:", info);

  fetch("https://restaurant-zz0i.onrender.com/review/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
  })
  .then((res) => {
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }
      return res.json();
  })
  .then((data) => {
    //   console.log(data);
      // document.getElementById("rateSelect").value = "5";
      document.getElementById("your_name").value = "";
      document.getElementById("subject").value = "";
      loadreview();
      // swal("Success", "Review submitted successfully!", "success");
      swt();
  })
  .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
  });
};



const swt = () => {
  // e.preventDefault();
  Swal.fire({
    // title: "Thank You!",
    text: "Your review submitted successfully.",
    icon: "success",
    confirmButtonText: "Close",
    // onClose: () => {
    //   // Reload the page after the SweetAlert is closed
    //   location.reload();
    // },
  });
};





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

    // console.log("Logout successful");
    // Redirect to index.html or any other page after logout
    lwt();
    
  } catch (error) {
    console.error("Error occurred during logout:", error);
  }
};

// Add event listener to the logout button
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", handlelogOut);



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

