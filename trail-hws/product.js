
// import './cart.js';
// import './all.js';

function saveToLocalStorage(){
    // const cartArray = Array.from(cart);
    const cartfile = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartfile);
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
}

function setupDropdownListeners() {
    document.getElementById('glazingOptions').addEventListener('change', updatePrice);
    document.getElementById('packSizeOptions').addEventListener('change', updatePrice);
}

function populateOptions(optionsArray, selectElement, optionText) {
    optionsArray.forEach((option, index) => {
        let text = option[optionText];
        if (optionText === 'amount') text += ' pack';
        let optionElement = new Option(text, index);
        console.log(optionElement);
        selectElement.add(optionElement);
    });
}

function updatePrice() {
    const glazingIndex = document.getElementById('glazingOptions').value;
    const packIndex = document.getElementById('packSizeOptions').value;
    const glazingAddOn = glazingOptions[glazingIndex].addOn;
    const packMultiplier = packSizeOptions[packIndex].add;

    const totalPrice = (basePrice + glazingAddOn) * packMultiplier;
    document.querySelector("#add-cart span").textContent = `$${totalPrice.toFixed(2)}`;
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
            const rollType = getQueryParam('roll');
    
            const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, basePrice);
            
            // localStorage.setItem(newRoll)
            cart.push(newRoll);
            updateCartBadge();
            saveToLocalStorage();
        });
    }

}

// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    updateRollImage();

    // const storedCart = JSON.parse(localStorage.getItem('cart'));
    // if (storedCart) {
    //     cart = storedCart.map(item => new Roll(item.type, item.glazing, item.size, item.basePrice));
    //     // displayCartItems();
    // }

    
    // Populate glazing and pack size options
    populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option'); 
    populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');

    setupDropdownListeners();

    updatePrice();
    addtoCart();
    console.log("updated");
    // saveToLocalStorage();
    updateCartBadge();
    

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
    //         displayCartItems();
    //         // populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option');
    //         // populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         updateCartBadge();
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

    // displayCartItems();

    
});





// addtoCart();

// export function Products() {
//     updateRollImage();
//     setupDropdownListeners();
//     populateOptions(optionsArray, selectElement, optionText);
//     updatePrice();
//     addtoCart();
// }