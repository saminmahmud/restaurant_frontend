const foodload = async (id) => {
  try {
    const response = await fetch(
      `https://restaurant-zz0i.onrender.com/food/${id}/`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("data name is: ", data.name);
    return data.name;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error; // Re-throw the error to handle it outside the function if needed
  }
};
const priceload = async (id) => {
  try {
    const response = await fetch(
      `https://restaurant-zz0i.onrender.com/food/${id}/`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("data name is: ", data.price);
    return data.price;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error; // Re-throw the error to handle it outside the function if needed
  }
};

var totalPrice = 0;

try {
  const id = localStorage.getItem("user_id");
  if (id) {
    fetch("https://restaurant-zz0i.onrender.com/cart/")
      .then((response) => response.json())
      .then(async (data) => {
        const userCarts = data.filter((cart) => cart.user === parseInt(id));
        // console.log(userCarts);
        const parent = document.getElementById("cartTable");
        for (const item of userCarts) {
          const name = await foodload(item.food);
          const price = await priceload(item.food);
          totalPrice = totalPrice + price * item.quantity;
          // console.log("total price in: ",totalPrice);
          // console.log("price: ", typeof(price));
          // console.log("item.quantity: ", typeof(item.quantity));
          const tr = document.createElement("tr");
          tr.innerHTML = `
                        <td>${name}</td>
                        <td>${item.quantity}</td>
                        <td>${price}</td>
                        <td>${price * item.quantity}</td>
                    `;
          parent.appendChild(tr);
        }
        total(totalPrice);
        // console.log("total price after loop: ", totalPrice);
        // const par= document.getElementById("total_price").innerText;
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
      });
  } else {
    console.log("User ID is not available");
  }
} catch (error) {
  console.error("Error:", error);
}

function total(n) {
  // console.log("n is:", n);
  const totalPriceElement = document.getElementById("total_price");
  if (totalPriceElement) {
    totalPriceElement.textContent = `${n}`;
  }
}


const totalPbtn = (e) => {
  e.preventDefault();
  postorderr(event);
  fetch("https://restaurant-zz0i.onrender.com/cart/")
    .then((response) => response.json())
    .then((data) => {
        // console.log("dis ", data)
      // Filter out cart items where user_id is 1
      const userCarts = data.filter((cart) => cart.user === parseInt(user_id));
        // console.log("is ", userCarts)
      // Delete each cart item individually
      userCarts.forEach((cart) => {
        fetch(`https://restaurant-zz0i.onrender.com/cart/${cart.id}/`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // console.log(`Cart item with id ${cart.id} deleted successfully.`);
              // window.location.href = "menu.html";
              swtcartadd();
            } else {
              console.error(`Failed to delete cart item with id ${cart.id}.`);
            }
          })
          .catch((error) => {
            console.error(
              `Error deleting cart item with id ${cart.id}:`,
              error
            );
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
    });
};



const postorderr = (e) => {
  e.preventDefault();
  fetch("https://restaurant-zz0i.onrender.com/cart/")
    .then((response) => response.json())
    .then((data) => {
        console.log("dis ", data)
      // Filter out cart items where user_id is 1
      const userCarts = data.filter((cart) => cart.user === parseInt(user_id));
        // console.log("is ", userCarts)
      // Delete each cart item individually
      userCarts.forEach((cart) => {
        const info = {
          "quantity": cart.quantity,
          "user": user_id,
          "food": cart.food,
          "cart": cart.id
        };
        // console.log(info);
        fetch(`https://restaurant-zz0i.onrender.com/order/`, {
          method:"Post",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify(info),
        })
        .then(res=>res.json())
        .then(json=>{
          // console.log(json)
          // swtcartadd();
          // location.reload();
        })
        .catch(error => console.error("Error:", error));
      }
      );
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
    });
};


const swtcartadd = () => {
  // e.preventDefault();
  Swal.fire({
    text: "Purchase successfully.",
    icon: "success",
    confirmButtonText: "Close",
    onClose: () => {
      // Reload the page after the SweetAlert is closed
      // location.reload();
      window.location.href = "menu.html";
    },
  });
};


