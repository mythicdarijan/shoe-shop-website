  //Search Bar
  document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("search");
    const searchInput = document.getElementById("searchInput");
    const searchCards = document.getElementById("searchCards");
    const searchImage = document.getElementById("searchImage");

    search.style.transition = "width 0.5s, padding 0.5s";
    searchInput.style.transition = "opacity 0.5s";
    searchInput.style.transitionDelay = "2s";
    searchCards.style.transition = "opacity 0.5s";

    function expandSearch(){
              search.style.width = "120px";
              search.style.padding = "5px";
              searchInput.style.display = "block";
              search.style.border = "solid 1px white";
              search.style.borderRadius = "20px";
              searchInput.style.opacity = "90%";
              searchCards.style.opacity = "100%";
              searchCards.style.display = "flex";
    }
    
    function collapseSearch(){
          search.style.width = "30px";
          search.style.padding = "";
          searchInput.style.display = "none";
          searchInput.style.opacity = "0%";
          search.style.border = "none";
          search.style.borderRadius = "0px";
          searchCards.style.opacity = "0%";
          searchCards.style.display = "none";
    }

    searchImage.addEventListener("mouseenter", () => {
      expandSearch();
    })

    searchInput.addEventListener("keyup", () => {
      if (searchInput.value.length > 0) {
        expandSearch();
      } else {
        collapseSearch();
      }
    });

    searchInput.addEventListener("mouseleave", () =>{
      if (searchInput.value.length > 0) {
        expandSearch();
      } else {
        collapseSearch();
      }
    })

    

    let shoes = [];

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      console.log(value)
      shoes.forEach(shoe => {
        const isVisible = shoe.name.toLowerCase().includes(value) || shoe.brand.includes(value)
        shoe.element.classList.toggle("hide", !isVisible)
      })
    })

    fetch('./shoes.json')
  .then(res => res.json())
  .then(data => {
    shoes = data.shoes.map(shoe => {
      const shoeElement = document.createElement('div');
      shoeElement.classList.add('item-card');
      shoeElement.innerHTML = 
      `<div class="item-card">
      <a href="${shoe.href}?id=${shoe.id}">
      <div class="item-image"><img src="${shoe.imageUrl}" alt=""></div>
      <div class="item-info">
          <div class="item-title">${shoe.name}</div>
          <div class="item-price">$${shoe.price}</div>
          </a>
      </div> `;
      searchCards.appendChild(shoeElement);
      return { ...shoe, element: shoeElement };
    });
  });
    
  })

  // Accordion JavaScript
  document.addEventListener("DOMContentLoaded", () => {
    const accButton = document.getElementById("acc-btn");
    const accContent = document.getElementById("acc-content");
    const arrowButton = document.getElementById("arrow");

    accButton.addEventListener("click", () => {
      if (accContent.style.maxHeight === "0px" || !accContent.style.maxHeight) {
        accContent.style.maxHeight = accContent.scrollHeight + "px"; // Expand
        accButton.style.color = "blue";
        arrowButton.classList.remove("fa-chevron-down");
        arrowButton.classList.add("fa-chevron-up");
      } else {
        accContent.style.maxHeight = "0px"; // Collapse
        accButton.style.color = "black";
        arrowButton.classList.remove("fa-chevron-up");
        arrowButton.classList.add("fa-chevron-down");
      }
    });
    
    accContent.style.maxHeight = "0px";
  });

  //Dropdown navbar
  document.getElementById("hamburger-menu").addEventListener("click", function() {
    const navbarItems = document.querySelector(".navbar-items");
    navbarItems.classList.toggle("active");
});

//Implementing JSON file in Product List
const shoeBox = document.getElementById('products')

fetch('./shoes.json')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.shoes.forEach(shoe => {
      shoeBox.insertAdjacentHTML('beforeend', 
      `<div class="product-box">
      <div class="product-content">
          <img src="${shoe.imageUrl}" alt="">
          <h1>${shoe.name}</h1>
          <h3>$${shoe.price}</h3>
          <a href="${shoe.href}?id=${shoe.id}" class="order-btn">Order Now</a>
      </div>`)
    })
  });
  
// Implementing JSON file data in Product Page
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const productImg = document.getElementById('productImage');
const productColor = document.getElementById('productColor');
const totalPrice = document.getElementById('totalPrice');

fetch('./shoes.json')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    const shoe = data.shoes.find(item => item.id == id);
    document.getElementById("productTitle").innerHTML = shoe.name;
    document.getElementById("totalPrice").innerHTML = '$' + (shoe.price + 20);
    document.getElementById("productImage").src = shoe.imageUrl; 

    const colorContainer = document.getElementById("productColor");
    const productImage = document.getElementById("productImage");
    productPrice.innerHTML = '$' + shoe.price;

    colorContainer.innerHTML = '';
    // Creating radio buttons for color picking
    shoe.colors.forEach(color => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "color";
        radio.id = `color-${color.colorId}`;
        radio.setAttribute("data-img", color.img);

        const label = document.createElement("label");
        label.htmlFor = `color-${color.colorId}`;
        label.innerHTML = `<span class="checkmark ${color.color}"></span>`;

        colorContainer.appendChild(radio);
        colorContainer.appendChild(label);
         // Changing image based on color selected
        radio.addEventListener("change", function() {
            productImage.src = this.getAttribute("data-img");
        });
    });
    const basePrice = shoe.price; // Base price for one item

    // Changing price based on quantity changes

    const quantityInput = document.getElementById("quantity"); // Selects the quantity input
 
    // Event listener for changes in the quantity input
    quantityInput.addEventListener("input", () => {
      const quantity = parseInt(quantityInput.value) || 1; 
      const newPrice = basePrice * quantity; 
      console.log(newPrice)
      document.getElementById("productPrice").innerHTML = '$' + newPrice.toFixed(2);
      document.getElementById("totalPrice").innerHTML = '$' + (newPrice + 20).toFixed(2);
    });

  });

  // Order Validation Card appears when the button is being clicked
  const orderButton = document.getElementById("order-btn");
  const closeButton = document.getElementById("close-btn");
  const orderCard = document.getElementById("order-card");

  orderCard.style.transition = "opacity 0.3s";

  orderButton.addEventListener("click", () => {
    orderCard.style.opacity = "100%";
    orderCard.style.zIndex = "1010";
  });

  closeButton.addEventListener("click", () => {
    orderCard.style.opacity = "0%";
    orderCard.style.zIndex = "0";

  })

