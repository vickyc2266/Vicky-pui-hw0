
function saveToLocalStorage(){
    // const cartArray = Array.from(cart);
    const cartfile = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartfile);
}

function retrieveLocalStorage(){
    const CartString = localStorage.getItem('storedCart');
    
    const CartArray = JSON.parse(CartString);
    console.log(CartArray);
    cart = CartArray;
    // for (const i of CartArray){
    //     // const item = new Roll(i.rollType, i.rollGlazing, i.packSize, i.basePrice);
    //     // displayCartItems()
    //     // createElement(item);
    //     console.log(i);
    //     // cart.push(i);

    //     console.log(cart);
        
    // }
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

function calculateTotal() {
    let totalPrice = 0;
    let cart1 = retrieveLocalStorage();
    cart1.forEach(roll => {
        totalPrice += roll.calculatePrice;
    });
    return totalPrice;
}

// function updateTotalPriceDisplay() {
//     const totalPrice = calculateTotal();
//     // Assuming you have a container with the ID 'totalPriceContainer' to display the total price
//     const totalPriceContainer = document.getElementById('totalPriceContainer');
//     if (totalPriceContainer) {
//         totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
//     }
// }

function updateTotalPrice() {
    let totalPrice = 0;
    // let cart1 = retrieveLocalStorage();
    retrieveLocalStorage();
    console.log(cart);
    // console.log(cart1);
    cart.forEach(roll => {
        totalPrice += roll.calculatePrice;
    });
    // Display the total price
    const totalPriceContainer = document.getElementById('totalPriceContainer');
    if (totalPriceContainer) {
        // totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
        totalPriceContainer.innerHTML = '<span class = "Total"> Total:</span>' + `$${totalPrice.toFixed(2)}`;
    }
}

function displayCheckoutButton() {
    const checkoutButtonContainer = document.getElementById('checkoutButtonContainer');
    if (checkoutButtonContainer) {
        checkoutButtonContainer.innerHTML = '<button id="checkoutButton">Checkout</button>';
    }
}

// function updateCartDisplay() {
//     // clearCartItems();
//     populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option');
//     populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');
//     setupDropdownListeners(); // Re-setup listeners after the cart and options are updated

// }


// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // saveToLocalStorage();

    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart.map(item => new Roll(item.type, item.glazing, item.size, item.basePrice));
        displayCartItems();
    }


    // Event listeners for changes in options
    // document.getElementById('glazingOptions').addEventListener('change', updatePrice);
    // document.getElementById('packSizeOptions').addEventListener('change', updatePrice);

    // function displayCartItem(roll, index) {
    //     // Create the container for the cart item
    //     const itemElement = document.createElement('div');
    //     itemElement.classList.add('cart-item');
    //     itemElement.dataset.index = index;  // Set a data-index attribute to identify the item
    
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
    //     if (cartContainer !== null) {
    //         cartContainer.appendChild(itemElement);
    //     } else {
    //         console.error('cartItemsContainer not found');
    //     }
    
    //     // Find the remove element and add an event listener
    //     const removeElement = itemElement.querySelector('.remove');
    //     removeElement.addEventListener('click', () => {
    //         cart.splice(index, 1);
    //         console.log("removing2");
    //         displayCartItems();
    //         console.log("removing1");
    //         // populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option');
    //         // populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         console.log("removing3");
    //         updateCartBadge();
    //         console.log("removing4");
    //     });
    // }
    
    // function displayCartItems() {
    //     const cartItemsContainer = document.getElementById('cartItemsContainer');
    //     updateRollImage();
    //     // cartItemsContainer.innerHTML = ''; // Clear existing items

    //     cart.forEach((roll, index) => {
    //         displayCartItem(roll, index);
    //     });
    //     updateTotalPrice();
    // }

    displayCartItems();
    updateCartBadge();


    
});

function displayCartItem(roll, index) {
    // Create the container for the cart item
    retrieveLocalStorage();
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.dataset.index = index;  // Set a data-index attribute to identify the item

    console.log(roll);
    console.log(roll.calculatePrice);
    itemElement.innerHTML = `
        <div>
            <img class="product-image" src="images/products/${roll.type.toLowerCase().replace(/\s+/g, '-')}-cinnamon-roll.jpg">
            <p class="remove">Remove</p>
        </div>
        <div class="item-detail">
            <p>${roll.type} Cinnamon Roll</p>
            <p>Glazing: ${roll.glazing}</p>
            <p>Pack Size: ${roll.size}</p>
        </div>
        <div class="item-price">
            <p>$ ${roll.calculatePrice.toFixed(2)}</p>
        </div>
    `;
    

    // Append the new item element to the cart container
    const cartContainer = document.getElementById('cartItemsContainer');
    if (cartContainer !== null) {
        cartContainer.appendChild(itemElement);
    } else {
        console.error('cartItemsContainer not found');
    }

    // Find the remove element and add an event listener
    const removeElement = itemElement.querySelector('.remove');
    removeElement.addEventListener('click', () => {
        cart.splice(index, 1);
        saveToLocalStorage();
        console.log("happened");
        displayCartItems();
        // updateCartDisplay();
        console.log("happened1");
        updateCartBadge();
    });
}

function displayCartItems() {

    const cartItemsContainer = document.getElementById('cartItemsContainer');
    // updateRollImage();
    cartItemsContainer.innerHTML = ''; // Clear existing items
    // saveToLocalStorage();
    console.log(cart);
    // for (i = 0; i < cart.length; i++){
    //     displayCartItem(cart[i]);
    // }
    cart.forEach((roll, index) => {
        displayCartItem(roll, index);
    });
    updateTotalPrice();
}




// updateTotalPriceDisplay();
displayCheckoutButton();

// export function Carts() {
//     displayCartItem(roll, index);
//     displayCartItems();
//     calculateTotal();
//     updateTotalPriceDisplay();
//     updateTotalPrice();
//     displayCheckoutButton();
//     updateCartDisplay();
// }
