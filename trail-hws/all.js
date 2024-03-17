// let cart = []; 
// function retrieveLocalStorage(){
//     const CartString = localStorage.getItem('storedCart');
//     const CartArray = JSON.parse(CartString);
//     console.log(CartArray);
//     // console.log(cartArr)
//     cart = CartArray;
//     console.log(cart);
//     // console.log(cart);
//     // for (const i of CartArray){
//     //     // const item = new Roll(i.rollType, i.rollGlazing, i.packSize, i.basePrice);
//     //     // displayCartItems()
//     //     // createElement(item);
//     //     console.log(i);
//     //     // cart.push(i);

//     //     console.log(cart);
        
//     // }
// }

let cart = []; 

function retrieveLocalStorage() {
    const cartString = localStorage.getItem('storedCart');
    try {
        const cartArray = JSON.parse(cartString);
        console.log(cartArray);
        // Ensure cart is an array even if cartArray is null
        cart = Array.isArray(cartArray) ? cartArray : [];
    } catch (error) {
        console.error("Error parsing cart data from local storage:", error);
        cart = []; // Reset cart to empty array in case of error
    }
    console.log(cart);
}

console.log(cart);

let glazingOptions = [
    { option: "Keep Original", addOn: 0.00 },
    { option: "Sugar Milk", addOn: 0.00 },
    { option: "Vanilla Milk", addOn: 0.50 },
    { option: "Double Chocolate", addOn: 1.50 },
];

let packSizeOptions = [
    { amount: 1, add: 1 },
    { amount: 3, add: 3 },
    { amount: 6, add: 5 },
    { amount: 12, add: 10 },
];

const glazings = {
    "Keep Original" : 0.00, 
    "Sugar Milk" : 0.00, 
    "Vanilla Milk" : 0.50, 
    "Double Chocolate" : 1.50}

const pack = {
    1 : 1,
    3 : 3, 
    6 : 5, 
    12 : 10
} 

let basePrice = 2.49; 
// let cart = []; 
// let cart = JSON.parse(localStorage.getItem('cart')) || [];


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatePrice = (this.basePrice + glazings[this.glazing]) * pack[this.size];
        console.log(this.basePrice);
        console.log(glazings[this.glazing]);
        console.log(pack[this.size]);
        console.log(this.calculatePrice);
    }
}





// function displayCartItem(roll, index) {
//     // Create the container for the cart item
//     const itemElement = document.createElement('div');
//     itemElement.classList.add('cart-item');
//     itemElement.dataset.index = index;  // Set a data-index attribute to identify the item

//     // Assuming you want to keep the structure similar to your static HTML
//     itemElement.innerHTML = `
//         <div>
//             <img class="product-image" src="images/products/${roll.type.toLowerCase().replace(/\s+/g, '-')}-cinnamon-roll.jpg">
//             <p class="remove">Remove</p>
//         </div>
//         <div class="item-detail">
//             <p>${roll.type} Cinnamon Roll</p>
//             <p>Glazing: ${roll.glazing}</p>
//             <p>Pack Size: ${roll.size}</p>
//         </div>
//         <div class="item-price">
//             <p>$ ${roll.calculatePrice().toFixed(2)}</p>
//         </div>
//     `;

//     // Append the new item element to the cart container
//     const cartContainer = document.getElementById('cartItemsContainer');
//     cartContainer.appendChild(itemElement);

//     // Find the remove element and add an event listener
//     const removeElement = itemElement.querySelector('.remove');
//     removeElement.addEventListener('click', () => {
//         cart.splice(index, 1);
//         displayCartItems();
//         localStorage.setItem('cart', JSON.stringify(cart));
//     });
// }

// function displayCartItems() {
//     const cartItemsContainer = document.getElementById('cartItemsContainer');
//     cartItemsContainer.innerHTML = ''; // Clear existing items

//     cart.forEach((roll, index) => {
//         displayCartItem(roll, index);
//     });
//     updateTotalPrice();
// }






// function updateRollImage() {
//     const queryString = window.location.search;
//     const params = new URLSearchParams(queryString);
//     const rollType = params.get('roll'); 

//     // Update page info based on the roll that's selected
//     if (rollType && rolls[rollType]) {
//         const rollData = rolls[rollType];
//         document.querySelector('.product-image').src = `images/products/${rollData.imageFile}`;
//         document.getElementById('banner').textContent = `${rollType} cinnamon roll`;
//         basePrice = rollData.basePrice; 
//     }
//     // } else {
//     //     console.error('Roll type not found or not specified in the URL');
//     // }
// }

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    // updateRollImage();
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach((roll, index) => {
        displayCartItem(roll, index);
    });
    updateTotalPrice();
}



// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {

    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart.map(item => new Roll(item.type, item.glazing, item.size, item.basePrice));
        // displayCartItems();
    }

    // retrieveLocalStorage();

    updateCartBadge();

    
});



// localStorage.setItem('cart', JSON.stringify(cart));
console.log(cart);
retrieveLocalStorage();

function updateCartBadge() {
    var count = 0;
    // cart = retrieveLocalStorage();
    // retrieveLocalStorage();
    console.log(cart);
    for (var i = 0; i < cart.length; i++){
        count = count + 1;
    }
    document.querySelector("#cart-badge").innerText = count;
}
console.log(cart);



function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}


