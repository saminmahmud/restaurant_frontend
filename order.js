window.addEventListener("DOMContentLoaded", () => {
  allorders();

});
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

const user_n = async (id) => {
  try {
    const response = await fetch(
      `https://restaurant-zz0i.onrender.com/account/list/${id}/`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("data name is: ", data.name);
    return data.user;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error; // Re-throw the error to handle it outside the function if needed
  }
};


const allorders = () => {
const parent = document.getElementById("orderTable");

fetch("https://restaurant-zz0i.onrender.com/order/")
  .then((response) => response.json())
  .then(async (data) => {
    // Group orders by user
    const ordersByUser = {};
    data.forEach((order) => {
      const { user } = order;
      if (!ordersByUser[user]) {
        ordersByUser[user] = [];
      }
      ordersByUser[user].push(order);
    });

    // Function to display user's orders
    const displayUserOrders = async (user, orders) => {
      // Display user's name
      await Promise.all(
        orders.map(async (order, index) => {
          if(order.status === "Pending" && index === orders.length - 1){
            const userName = await user_n(user);
            parent.innerHTML += `
              <tr id="tusername${user}">
                <th style="margin: auto; text-align: center;color:yellow;">User Name : ${userName}</th>
              </tr>
              <tr>
                <th style="color: rgb(244, 221, 171);">Food Name</th>
                <th style="color: rgb(244, 221, 171);">Quantity</th>
              </tr>
            `;
            // return;
          }
        })
      );

      // Display each order
      let boo = true;

      await Promise.all(
        orders.map(async (order, index) => {
          if(order.status === "Pending"){
            const foodName = await foodload(order.food);
            parent.innerHTML += `
            <tr>
                <th>${foodName}</th>
                <th>${order.quantity}</th>
            </tr>
            `;
            if (index === orders.length - 1 && boo) {
              boo = false;
              pp(user);
            }

          }
        })
      );
    };

    // Process each user's orders sequentially
    for (const [user, orders] of Object.entries(ordersByUser)) {
      await displayUserOrders(user, orders);
    }
  })
  .catch((error) => {
    console.error("Error fetching orders:", error);
  });
};

const orderdelete = (e) =>{
  e.preventDefault();
  postorderr(event);
  fetch("https://restaurant-zz0i.onrender.com/order/")
    .then((response) => response.json())
    .then((data) => {
        // console.log("dis ", data)
      // Filter out cart items where user_id is 1
      const userorder = data.filter((order) => order.user === parseInt(user_id));
        // console.log("is ", userorder)
      // Delete each cart item individually
      userorder.forEach((or) => {
        fetch(`https://restaurant-zz0i.onrender.com/order/${or.id}/`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // console.log(`Cart order with id ${or.id} deleted successfully.`);
              // window.location.href = "menu.html";
              swtorderdel();
            } else {
              console.error(`Failed to delete order item with id ${or.id}.`);
            }
          })
          .catch((error) => {
            console.error(
              `Error deleting cart order with id ${or.id}:`,
              error
            );
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching order:", error);
    });
}

const pp = (user) => {
  par = document.getElementById(`tusername${user}`);
  par.innerHTML += `
    <tr>
      <th style="color: rgb(244, 221, 171); text-align: end; ">Status:<button onclick="pendingbtn(event, ${user})" id="pendingbtn${user}" class="btn btn-danger">Pending</button></th>
    </tr>
  `;
};

const cc = (user) => {
  par = document.getElementById(`tusernamecom${user}`);
  par.innerHTML += `
    <tr>
      <th style="color: rgb(244, 221, 171); text-align: end; ">Status :<button class="btn btn-success" disabled>Completed</button></th>
    </tr>
  `;
};

const swtorderdel = () => {
  // e.preventDefault();
  Swal.fire({
    text: "Completed",
    icon: "success",
    confirmButtonText: "Close",
    onClose: () => {
      // Reload the page after the SweetAlert is closed
      location.reload();
      // window.location.href = "menu.html";
    },
  });
};



const pendingbtn =async (e,userId) => {
  e.preventDefault();
  // console.log("change this ", u);
  fetch("https://restaurant-zz0i.onrender.com/order/")
    .then(response => response.json())
    .then(data => {
        // Filter orders for the specified user and with status 'Pending'
        const userOrders = data.filter(order => order.user === userId && order.status === 'Pending');

        userOrders.forEach(order => {
            fetch(`https://restaurant-zz0i.onrender.com/order/${order.id}/`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    // console.log(`Order ${order.id} for user ${userId} marked as completed.`);
                } else {
                    // console.error(`Failed to update order ${order.id} for user ${userId}.`);
                }
                
            })
            .catch(error => {
                // console.error(`Error updating order ${order.id} for user ${userId}:`, error);
            });
        });
        swtorderdel();
    })
    .catch(error => {
        console.error("Error fetching orders:", error);
    });
};


