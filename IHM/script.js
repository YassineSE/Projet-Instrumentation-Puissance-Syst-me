// DOM Elements
const desiredTempSlider = document.getElementById('desired-temp-slider');
const desiredValueDisplay = document.getElementById('desired-value-display');
const desiredTempValue = document.getElementById('desired-temp-value');
const currentTempDisplay = document.getElementById('current-temp-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

// Sliders for Kp, Ki, and Kd
const desiredKpSlider = document.getElementById('kp-slider');
const desiredKpValue = document.getElementById('desired-kp-value');
const desiredKiSlider = document.getElementById('ki-slider');
const desiredKiValue = document.getElementById('desired-ki-value');
const desiredKdSlider = document.getElementById('kd-slider');
const desiredKdValue = document.getElementById('desired-kd-value');

let interval = null;

// Update value for the temperature slider
desiredTempSlider.addEventListener('input', () => {
    desiredTempValue.textContent = `${desiredTempSlider.value} °C`;
});

// Update values for Kp, Ki, and Kd sliders
desiredKpSlider.addEventListener('input', () => {
    desiredKpValue.textContent = desiredKpSlider.value;
});

desiredKiSlider.addEventListener('input', () => {
    desiredKiValue.textContent = desiredKiSlider.value;
});

desiredKdSlider.addEventListener('input', () => {
    desiredKdValue.textContent = desiredKdSlider.value;
});

// Start button logic
startBtn.addEventListener('click', () => {
    desiredValueDisplay.textContent = `${desiredTempSlider.value} °C`;
});

