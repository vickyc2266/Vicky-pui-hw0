

// Arrays for glazing and pack size options
let glazingOptions = [
    { option: "Keep Original", addOn: 0.00 },
    { option: "Sugar milk", addOn: 0.00 },
    { option: "Vanilla milk", addOn: 0.50 },
    { option: "Double chocolate", addOn: 1.50 },
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
}

// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get('roll'); 

    // Update page info based on the roll that's selected
    if (rollType && rolls[rollType]) {
        const rollData = rolls[rollType];
        document.querySelector('.product-image').src = `images/products/${rollData.imageFile}`;
        document.getElementById('banner').textContent = `${rollType} cinnamon roll`;
        basePrice = rollData.basePrice; 
    } else {
        console.error('Roll type not found or not specified in the URL');
    }

    // Populate glazing and pack size options
    populateOptions(glazingOptions, document.getElementById('glazingOptions'), 'option');
    populateOptions(packSizeOptions, document.getElementById('packSizeOptions'), 'amount');

    // Initial price update based on the selected roll's base price
    updatePrice();

    // Event listeners for changes in options
    document.getElementById('glazingOptions').addEventListener('change', updatePrice);
    document.getElementById('packSizeOptions').addEventListener('change', updatePrice);

    // Add event listener to the "Add to Cart" button
    const addToCartButton = document.getElementById('add-to-cart');
    console.log('Add to Cart Button:', addToCartButton); 
    if (addToCartButton) {
        console.log('Setting up click event listener');
        addToCartButton.addEventListener('click', function(event) {
            console.log('Add to Cart clicked');
            event.preventDefault(); // Prevent the link from navigating to cart.html immediately

            // Retrieve the current selections for glazing and pack size
            const selectedGlazing = glazingOptions[document.getElementById('glazingOptions').value].option;
            const selectedPackSize = packSizeOptions[document.getElementById('packSizeOptions').value].amount;

            const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, basePrice);

            cart.push(newRoll);

            console.log('Cart:', cart);
        });
    } 
    // else {
    //     console.error('The Add to Cart button was not found.');
    // }
});

// Function to populate select options
function populateOptions(optionsArray, selectElement, optionText) {
    optionsArray.forEach((option, index) => {
        let text = option[optionText];
        if (optionText === 'amount') text += ' pack'; // Add 'pack' text for pack sizes
        let optionElement = new Option(text, index);
        selectElement.add(optionElement);
    });
}

// Function to update the price based on selections
function updatePrice() {
    const glazingIndex = document.getElementById('glazingOptions').value;
    const packIndex = document.getElementById('packSizeOptions').value;
    const glazingAddOn = glazingOptions[glazingIndex].addOn;
    const packMultiplier = packSizeOptions[packIndex].add;

    const totalPrice = (basePrice + glazingAddOn) * packMultiplier;
    document.querySelector("#add-cart span").textContent = `$${totalPrice.toFixed(2)}`;
}

