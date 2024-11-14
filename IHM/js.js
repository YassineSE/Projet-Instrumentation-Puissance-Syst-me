// Initial temperature
let currentTemp = 28;

// Select display elements for two digits
const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');

// Select input and buttons
const tempInput = document.getElementById("set-temp");
const increaseButton = document.querySelector(".increase");
const decreaseButton = document.querySelector(".decrease");

// Function to zero-fill numbers
function zeroFill(string, length) {
    while (string.length < length) {
        string = '0' + string;
    }
    return string;
}

// Function to set the displays based on the temperature
function setDisplays() {
    const tempString = zeroFill(currentTemp.toString(), 2);
    const baseClass = 'display-container display-size-12 display-no-';

    // Set the classes for each digit in the temperature
    
    display1.className = baseClass + 2;
    display2.className = baseClass + 8;
    
}

// Event listeners for the increase and decrease buttons
increaseButton.addEventListener("click", () => {
    if (currentTemp < 99) {
        currentTemp++;
        tempInput.value = currentTemp;
        setDisplays();
    }
});

decreaseButton.addEventListener("click", () => {
    if (currentTemp > 0) {
        currentTemp--;
        tempInput.value = currentTemp;
        setDisplays();
    }
});

// Initial setup
tempInput.value = currentTemp;
setDisplays();