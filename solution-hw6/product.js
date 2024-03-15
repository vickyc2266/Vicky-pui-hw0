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

function calculateTotal() {
    let totalPrice = 0;
    cart.forEach(roll => {
        totalPrice += roll.calculatePrice();
    });
    return totalPrice;
}

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

function displayCheckoutButton() {
    const checkoutButtonContainer = document.getElementById('checkoutButtonContainer');
    if (checkoutButtonContainer) {
        checkoutButtonContainer.innerHTML = '<button id="checkoutButton">Checkout</button>';
    }
}

function updateRollImage() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get('roll'); 

    // Update page info based on the roll that's selected
    if (rollType && rolls[rollType]) {
        const rollData = rolls[rollType];
        document.querySelector('.product-image').src = `images/products/${rollData.imageFile}`;
        document.getElementById('banner').textContent = `${rollType} cinnamon roll`;
        basePrice = rollData.basePrice; 
    }
    // } else {
    //     console.error('Roll type not found or not specified in the URL');
    // }
}

// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {

    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart.map(item => new Roll(item.type, item.glazing, item.size, item.basePrice));
        displayCartItems();
    }

    // Event listeners for changes in options
    // document.getElementById('glazingOptions').addEventListener('change', updatePrice);
    // document.getElementById('packSizeOptions').addEventListener('change', updatePrice);
    

    // Populate glazing and pack size options
    populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option'); 
    populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');

    setupDropdownListeners();
    // Initial price update based on the selected roll's base price
    updatePrice();

    // Event listeners for changes in options
    // document.getElementById('glazingOptions').addEventListener('change', updatePrice);
    // document.getElementById('packSizeOptions').addEventListener('change', updatePrice);

    function displayCartItem(roll, index) {
        // Create the container for the cart item
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.dataset.index = index;  // Set a data-index attribute to identify the item
    
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
        if (cartContainer !== null) {
            cartContainer.appendChild(itemElement);
        } else {
            console.error('cartItemsContainer not found');
        }
    
        // Find the remove element and add an event listener
        const removeElement = itemElement.querySelector('.remove');
        removeElement.addEventListener('click', () => {
            cart.splice(index, 1);
            displayCartItems();
            // populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option');
            // populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge();
        });
    }
    
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        updateRollImage();
        // cartItemsContainer.innerHTML = ''; // Clear existing items

        cart.forEach((roll, index) => {
            displayCartItem(roll, index);
        });
        updateTotalPrice();
    }

    displayCartItems();

    
});


function setupDropdownListeners() {
    document.getElementById('glazingOptions').addEventListener('change', updatePrice);
    document.getElementById('packSizeOptions').addEventListener('change', updatePrice);
}

function updateCartDisplay() {
    // clearCartItems();
    populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option');
    populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');
    setupDropdownListeners(); // Re-setup listeners after the cart and options are updated
}

// Function to populate select options
function populateOptions(optionsArray, selectElement, optionText) {
    optionsArray.forEach((option, index) => {
        let text = option[optionText];
        if (optionText === 'amount') text += ' pack';
        let optionElement = new Option(text, index);
        console.log(optionElement);
        selectElement.add(optionElement);
    });
}

// populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option'); 
// populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');

// Function to update the price based on selections
function updatePrice() {
    const glazingIndex = document.getElementById('glazingOptions').value;
    const packIndex = document.getElementById('packSizeOptions').value;
    const glazingAddOn = glazingOptions[glazingIndex].addOn;
    const packMultiplier = packSizeOptions[packIndex].add;

    const totalPrice = (basePrice + glazingAddOn) * packMultiplier;
    document.querySelector("#add-cart span").textContent = `$${totalPrice.toFixed(2)}`;
}


let originalRoll = new Roll("Original", "Sugar Milk", 1, 2.49);
let walnutRoll = new Roll("Walnut", "Vanilla Milk", 12, 3.49); 
let raisinRoll = new Roll("Raisin", "Sugar Milk", 3, 2.99);
let appleRoll = new Roll("Apple", "Keep Original", 3, 3.49);

cart.push(originalRoll, walnutRoll, raisinRoll, appleRoll);

localStorage.setItem('cart', JSON.stringify(cart));

function updateCartBadge() {
    var count = 0;
    for (var i = 0; i < cart.length; i++){
        count = count + 1;
    }
    document.getElementById("cart-badge").innerText = count;
}


// // Add event listener to the "Add to Cart" button
// const addToCartButton = document.getElementById('add-to-cart');
// console.log('Add to Cart Button:', addToCartButton); 

// if (addToCartButton) {
//     console.log('Setting up click event listener');
//     addToCartButton.addEventListener('click', function(event) {
//         console.log('Add to Cart clicked');
//         event.preventDefault(); // Prevent the link from navigating to cart.html immediately

//         // Retrieve the current selections for glazing and pack size
//         const selectedGlazing = glazingOptions[document.getElementById('glazingOptions').value].option;
//         const selectedPackSize = packSizeOptions[document.getElementById('packSizeOptions').value].amount;


//         const rollType = getQueryParam('roll');
//         const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, basePrice);

//         cart.push(newRoll);

//         console.log('Cart:', cart);
//     });
// } 

function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function addtoCart(){
    const addToCartButton = document.getElementById('add-to-cart');
    console.log('Add to Cart Button:', addToCartButton); 
    
    if (addToCartButton) {
        console.log('Setting up click event listener');

        addToCartButton.addEventListener('click', function(event) {
            console.log('Add to Cart clicked');
    
            // Retrieve the current selections for glazing and pack size
            const selectedGlazing = glazingOptions[document.getElementById('glazingOptions').value].option;
            const selectedPackSize = packSizeOptions[document.getElementById('packSizeOptions').value].amount;
            const rollType = getQueryParam('rollType');
    
            const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, basePrice);
    
            cart.push(newRoll);
    
            console.log('Cart:', cart);
            updateCartBadge();
        });
    }

}




// displayCartItems();
addtoCart();
updateCartBadge();
updateTotalPriceDisplay();
displayCheckoutButton();

