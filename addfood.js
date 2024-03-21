// alert();
const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");

window.addEventListener("DOMContentLoaded", () => {
    loadCategories();
});

const handleFoodAdd =async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const imageInput = document.getElementById("image");
    formData.append("image", imageInput.files[0]);
    formData.append("name", getformValue("name"));
    formData.append("price", parseInt(getformValue("price")));
    formData.append("categories", [parseInt(getformValue("category"))]); 
    
    // console.log(formData);
    try {
        const response = await fetch("https://restaurant-zz0i.onrender.com/food/", {
            method: "POST",
            body: formData, 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        document.getElementById("image").value = "";
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        // document.getElementById("category").value = "";
        // document.getElementById("error").innerText =
        // "submitted successfully add another food.";
        swtadfod();
        // console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }

};


const getformValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};
// console.log("hiii");



const loadCat = () => {
    const parent = document.getElementById("category");
    fetch("https://restaurant-zz0i.onrender.com/category/")
        .then((res) => res.json())
        .then((data) => {
            parent.innerHTML = "<option selected disabled>Select Category</option>";
            data.forEach((item) => {
                parent.innerHTML += `<option value="${item.id}">${item.name}</option>`;
            });
            parent.style.display = ""; 
        });
};

loadCat();




const swtadfod = () => {
    // e.preventDefault();
    Swal.fire({
    //   title: "Thank You!",
      text: "Food added successfully.",
      icon: "success",
      confirmButtonText: "Close",
      onClose: () => {
        // Reload the page after the SweetAlert is closed
        location.reload();
      },
    });
  };