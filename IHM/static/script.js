// DOM Elements
const desiredTempSlider = document.getElementById('desired-temp-slider');
const desiredTempValue = document.getElementById('desired-temp-value');
const kpSlider = document.getElementById('kp-slider');
const kiSlider = document.getElementById('ki-slider');
const kdSlider = document.getElementById('kd-slider');
const startBtn = document.getElementById('start-btn');
const currentTempDisplay = document.getElementById('current-temp-display');

// Update slider values dynamically
desiredTempSlider.addEventListener('input', () => {
    desiredTempValue.textContent = `${desiredTempSlider.value} °C`;
});

kpSlider.addEventListener('input', () => {
    document.getElementById('desired-kp-value').textContent = kpSlider.value;
});

kiSlider.addEventListener('input', () => {
    document.getElementById('desired-ki-value').textContent = kiSlider.value;
});

kdSlider.addEventListener('input', () => {
    document.getElementById('desired-kd-value').textContent = kdSlider.value;
});

// Send data to Flask on "Start" button click
startBtn.addEventListener('click', () => {
    const desiredTemp = desiredTempSlider.value;
    console.log(`Température souhaitée mise à jour : ${desiredTemp} °C`);
    document.getElementById('desired-value-display').textContent = `${desiredTemp} °C`;

    const data = {
        desired_temp: desiredTemp,
        kp: kpSlider.value,
        ki: kiSlider.value,
        kd: kdSlider.value,
    };

    // Send data to start acquisition (route '/start')
    fetch('http://127.0.0.1:5000/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData.message);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});

// Function to send updated values to the Flask backend
function sendUpdatedValues() {
    const data = {
        desired_temp: desiredTempSlider.value,
        kp: kpSlider.value,
        ki: kiSlider.value,
        kd: kdSlider.value,
    };

    // Send updated values to the Flask backend (via '/set_values' endpoint)
    fetch('http://127.0.0.1:5000/set_values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData.message);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

// Call sendUpdatedValues when sliders are adjusted
desiredTempSlider.addEventListener('input', sendUpdatedValues);
kpSlider.addEventListener('input', sendUpdatedValues);
kiSlider.addEventListener('input', sendUpdatedValues);
kdSlider.addEventListener('input', sendUpdatedValues);

// Poll current temperature every second
setInterval(() => {
    fetch('http://127.0.0.1:5000/current_temp')
        .then(response => response.json())
        .then(data => {
            currentTempDisplay.textContent = `${data.current_temp} °C`;
        })
        .catch(error => console.error('Erreur:', error));
}, 1000);
