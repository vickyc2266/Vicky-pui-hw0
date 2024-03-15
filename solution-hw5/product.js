

// Arrays for glazing and pack size options
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


let basePrice = 2.49; 

let cart = []; 

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }

    // Method to calculate the price of the roll
    calculatePrice() {
        const glazingAddOn = glazingOptions.find(option => option.option === this.glazing).addOn;
        const packMultiplier = packSizeOptions.find(size => size.amount === this.size).add;
        return (this.basePrice + glazingAddOn) * packMultiplier;
    }
}

function displayCartItem(roll, index) {
    // Create the container for the cart item
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.dataset.index = index;  // Set a data-index attribute to identify the item

    // Assuming you want to keep the structure similar to your static HTML
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
            <p>$ ${roll.calculatePrice().toFixed(2)}</p>
        </div>
    `;

    // Append the new item element to the cart container
    const cartContainer = document.getElementById('cartItemsContainer');
    cartContainer.appendChild(itemElement);

    // Find the remove element and add an event listener
    const removeElement = itemElement.querySelector('.remove');
    removeElement.addEventListener('click', () => {
        cart.splice(index, 1);
        displayCartItems();
        localStorage.setItem('cart', JSON.stringify(cart));
    });
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach((roll, index) => {
        displayCartItem(roll, index);
    });
    updateTotalPrice();
}



// Function to calculate the total price of the cart
function calculateTotal() {
    let totalPrice = 0;
    cart.forEach(roll => {
        totalPrice += roll.calculatePrice();
    });
    return totalPrice;
}

// Function to update the total price display
function updateTotalPriceDisplay() {
    const totalPrice = calculateTotal();
    // Assuming you have a container with the ID 'totalPriceContainer' to display the total price
    const totalPriceContainer = document.getElementById('totalPriceContainer');
    if (totalPriceContainer) {
        totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
}

function updateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(roll => {
        totalPrice += roll.calculatePrice();
    });
    // Display the total price
    const totalPriceContainer = document.getElementById('totalPriceContainer');
    if (totalPriceContainer) {
        // totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
        totalPriceContainer.innerHTML = '<span class = "Total"> Total:</span>' + `$${totalPrice.toFixed(2)}`;
    }
}


// Function to display the checkout button
function displayCheckoutButton() {
    const checkoutButtonContainer = document.getElementById('checkoutButtonContainer');
    if (checkoutButtonContainer) {
        checkoutButtonContainer.innerHTML = '<button id="checkoutButton">Checkout</button>';
        // Add event listener for checkout button if necessary
        // document.getElementById('checkoutButton').addEventListener('click', handleCheckout);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart.map(item => new Roll(item.type, item.glazing, item.size, item.basePrice));
        displayCartItems();
    }
});

let originalRoll = new Roll("Original", "Sugar Milk", 1, 2.49);
let walnutRoll = new Roll("Walnut", "Vanilla Milk", 12, 3.49); 
let raisinRoll = new Roll("Raisin", "Sugar Milk", 3, 2.99);
let appleRoll = new Roll("Apple", "Keep Original", 3, 3.49);

cart.push(originalRoll, walnutRoll, raisinRoll, appleRoll);

localStorage.setItem('cart', JSON.stringify(cart));

displayCartItems();
updateTotalPriceDisplay();
displayCheckoutButton();









