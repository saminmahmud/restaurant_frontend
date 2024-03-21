
const loadfood = (id) => {
  document.getElementById("food_show").innerHTML = "";
  if (id) {
    fetch("https://restaurant-zz0i.onrender.com/food/")
      .then((res) => res.json())
      .then((data) => displayfoodcategory(data, id));
  } else {
    fetch("https://restaurant-zz0i.onrender.com/food/")
      .then((res) => res.json())
      .then((data) => displayfoodcategory(data, 1));
  }
};

// const token = localStorage.getItem("token");
// const user_id = localStorage.getItem("user_id");


const quantityremove = (e,id) => {
  e.preventDefault();
  // navparent = document.getElementById(`cartno`).innerText;
  // let navrem = parseInt(navparent)-1;
  if (user_id && token){
    // console.log(token);
    parent = document.getElementById(`quantityno${id}`).innerText;
    let rem = parseInt(parent)-1;

    if(rem > 0){
      parent = document.getElementById(`quantityno${id}`).innerText=`${rem}`;	
      // navparent = document.getElementById(`cartno`).innerText=`${navrem}`;	
    }
  }else{
    window.location.href = "login.html";
  }
}

const quantityadd = (e,id) => {
  e.preventDefault();
  if (user_id && token){
    // navparent = document.getElementById(`cartno`).innerText;
    // let navrem = parseInt(navparent)+1;

    parent = document.getElementById(`quantityno${id}`).innerText;
    let rem = parseInt(parent)+1;

    parent = document.getElementById(`quantityno${id}`).innerText=`${rem}`;	
    // navparent = document.getElementById(`cartno`).innerText=`${navrem}`;	
  }else{
    window.location.href = "login.html";
  }
}

const cartadd = (e,id) => {
  e.preventDefault();
  if(user_id && token){
    parent = document.getElementById(`quantityno${id}`).innerText;
    // navparent = document.getElementById(`cartno`).innerText;
    // let navrem = parseInt(navparent)+parseInt(parent);
    // navparent = document.getElementById(`cartno`).innerText=`${navrem}`;
    const info = {
      "quantity": parseInt(parent),
      "user": user_id,
      "food": id,
    };
    // console.log(info);
    // cart backend update
    fetch(`https://restaurant-zz0i.onrender.com/cart/`,{
      method:"Post",
      headers: {
          "Content-Type": "application/json" 
      },
      body: JSON.stringify(info),
    })
      .then(res=>res.json())
      .then(json=>{
        // console.log(json)
        swtcartadd();
        // location.reload();
      })
      .catch(error => console.error("Error:", error));
  }else{
    window.location.href = "login.html";
  }

};


const displayfoodcategory = (data, id) => {
  // console.log("data", data);
  const filteredfood = data.filter((data) => data.categories.includes(id));
  const parent = document.getElementById("food_show");
  filteredfood.forEach((item) => {
    const div = document.createElement("div");
    div.className = "col-sm-6 col-lg-4 all pasta";
    div.innerHTML = `
    <div class="box">
      <div>
        <div class="img-box">
          <img src="${item.image}" alt="" />
        </div>
        <div class="detail-box">
        
          <p>
            ${item.name}
          </p>
          <div class="options">
            <h6>Price: ${item.price} $</h6>
 
            <div>
            <span id="quantityremove" onclick="quantityremove(event, ${item.id})" style="cursor:pointer;user-select: none;" class="material-symbols-outlined">remove</span>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100,0,-25" />
                <h6 id="quantityno${item.id}" style="display:inline-block;">1</h6>
            <span id="quantityadd" onclick="quantityadd(event, ${item.id})" style="cursor: pointer;user-select: none;" class="material-symbols-outlined">add</span>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100,0,-25" />
            </div>

            <a href="" onclick="cartadd(event, ${item.id})">
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 456.029 456.029"
                style="enable-background: new 0 0 456.029 456.029"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
               c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
               C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
               c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
               C457.728,97.71,450.56,86.958,439.296,84.91z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
               c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                    />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    `;
    parent.appendChild(div);
  });
};

const loadCategory = () => {
  fetch("https://restaurant-zz0i.onrender.com/category/")
    .then((res) => res.json())
    .then((data) => showCategory(data));
};

const showCategory = (data) => {
  const parent = document.getElementById("categorysection");
  data.forEach((item) => {
    const div = document.createElement("div");
    div.className =
      "custom-control custom-checkbox d-flex align-items-center mb-2";
    div.innerHTML = `
            <strong><li onclick="loadfood(${item.id})" data-filter=".burger">${item.name}</li></strong> 
        `;
    parent.appendChild(div);
  });
};

loadCategory();
loadfood();


const swtcartadd = () => {
  // e.preventDefault();
  Swal.fire({
    text: "Food add to the cart.",
    icon: "success",
    confirmButtonText: "Close",
    onClose: () => {
      // Reload the page after the SweetAlert is closed
      location.reload();
    },
  });
};
