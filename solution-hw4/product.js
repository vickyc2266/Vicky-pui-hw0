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

document.addEventListener('DOMContentLoaded', () => {
    const glazingSelect = document.getElementById('glazingOptions');
    const packSizeSelect = document.getElementById('packSizeOptions');

    // Populate Glazing Options
    glazingOptions.forEach((glaze, index) => {
        let option = new Option(glaze.option, index); // Using index as value for simplicity
        glazingSelect.add(option);
    });

    // Populate Pack Size Options
    packSizeOptions.forEach((pack, index) => {
        let option = new Option(`${pack.amount} pack`, index); // Using index as value
        packSizeSelect.add(option);
    });

    // Event listeners for changes
    glazingSelect.addEventListener('change', updatePrice);
    packSizeSelect.addEventListener('change', updatePrice);

    // Initial price update
    updatePrice();
});

function updatePrice() {
    const glazingIndex = document.getElementById('glazingOptions').value;
    const packIndex = document.getElementById('packSizeOptions').value;
    const basePrice = 2.49;
    const glazingAddOn = glazingOptions[glazingIndex].addOn;
    const packMultiplier = packSizeOptions[packIndex].add;

    const totalPrice = (basePrice + glazingAddOn) * packMultiplier;
    document.querySelector("#add-cart span").textContent = `$${totalPrice.toFixed(2)}`;
}
















