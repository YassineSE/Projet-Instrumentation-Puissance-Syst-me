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

// Tableau pour enregistrer les valeurs de température
let currentTemps = [];
let desiredTemps = [];
let timeLabels = [];

// Ajouter un bouton pour afficher la pop-up
const openGraphBtn = document.getElementById('open-graph-btn');
const graphModal = document.getElementById('graph-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const tempChartCanvas = document.getElementById('tempChart');

// Créer le graphique avec Chart.js
const ctx = tempChartCanvas.getContext('2d');


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

///////:

let tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [
            {
                label: 'Température actuelle',
                borderColor: 'blue',
                data: currentTemps,
                fill: false
            },
            {
                label: 'Température désirée',
                borderColor: 'red',
                data: desiredTemps,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Temps'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Température (°C)'
                }
            }
        }
    }
});

// Fonction pour ouvrir la pop-up
openGraphBtn.addEventListener('click', () => { graphModal.style.display = 'flex'; });

// Fonction pour fermer la pop-up
closeModalBtn.addEventListener('click', () => {graphModal.style.display = 'none'; });

// Mettre à jour les tableaux avec les valeurs au fil du temps
function updateGraph() {
    // Récupérer les valeurs actuelles de température et de température désirée
    const currentTemp = parseFloat(currentTempDisplay.textContent);
    const desiredTemp = parseFloat(desiredValueDisplay.textContent);

    // Ajouter les nouvelles valeurs aux tableaux
    currentTemps.push(currentTemp);
    desiredTemps.push(desiredTemp);
    timeLabels.push(new Date().toLocaleTimeString());

    // // Limiter le nombre de points sur le graphique
    // if (currentTemps.length > 20) {
    //     currentTemps.shift();
    //     desiredTemps.shift();
    //     timeLabels.shift();
    // }

    // Mettre à jour le graphique
    tempChart.update();
}

// Simuler la mise à jour des données toutes les secondes
setInterval(updateGraph, 1000);


///
