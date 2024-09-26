let infinityDollars = 100; // Starting amount of Infinity Dollars for new players
let ips = 0; // Infinity per Second
let buildings = [];

// Building data structure
const buildingData = [
    { id: 1, name: "Infinity Mine", rate: 1.0, cost: 100, count: 0 },
    { id: 2, name: "Infinity Factory", rate: 1.5, cost: 500, count: 0 },
    { id: 3, name: "Infinity Bank", rate: 2.5, cost: 2000, count: 0 },
    { id: 4, name: "Infinity Vault", rate: 4.0, cost: 8000, count: 0 },
    { id: 5, name: "Infinity Tower", rate: 6.0, cost: 32000, count: 0 },
    { id: 6, name: "Infinity Portal", rate: 10.0, cost: 128000, count: 0 },
    { id: 7, name: "Infinity Reactor", rate: 15.0, cost: 512000, count: 0 },
    { id: 8, name: "Infinity Laboratory", rate: 20.0, cost: 2048000, count: 0 },
    { id: 9, name: "Infinity Stargate", rate: 30.0, cost: 8192000, count: 0 },
    { id: 10, name: "Infinity Dimension", rate: 50.0, cost: 32768000, count: 0 },
    { id: 11, name: "Infinity Universe", rate: 75.0, cost: 131072000, count: 0 },
    { id: 12, name: "Infinity Multiverse", rate: 100.0, cost: 524288000, count: 0 }
];

// Load progress from local storage
function loadProgress() {
    const savedData = JSON.parse(localStorage.getItem('infinityTycoon'));
    if (savedData) {
        infinityDollars = savedData.infinityDollars;
        ips = savedData.ips;
        buildings = savedData.buildings;
    } else {
        buildings = buildingData.map(building => ({ ...building, count: 0 }));
    }
    updateUI();
}

// Save progress to local storage
function saveProgress() {
    const saveData = {
        infinityDollars,
        ips,
        buildings
    };
    localStorage.setItem('infinityTycoon', JSON.stringify(saveData));
}

// Update the UI to reflect current rates and costs
function updateUI() {
    buildings.forEach(building => {
        const buildingElement = document.getElementById(`building-${building.id}`);

        if (building.purchased) {
            buildingElement.querySelector('.rate').innerText = building.rate.toFixed(1);
        }
        buildingElement.querySelector('.cost').innerText = building.cost.toFixed(1);
    });

    document.getElementById('infinity').innerText = infinityDollars.toFixed(1);
    document.getElementById('ips').innerText = ips.toFixed(1);
}

// Purchase building
function purchaseBuilding(index) {
    const building = buildings[index - 1];
    if (infinityDollars >= building.cost) {
        infinityDollars -= building.cost;
        building.count += 1;
        ips += building.rate; // Increase IPS based on the building rate
        building.cost = Math.ceil(building.cost * 1.15); // Increase cost by 15%
        saveProgress();
        updateUI();
    }
}

// Upgrade building
function upgradeBuilding(index) {
    const building = buildings[index - 1];
    if (infinityDollars >= building.cost) {
        infinityDollars -= building.cost;
        building.rate += 0.1; // Increase the building's rate by 0.1
        ips += building.rate; // Update IPS
        building.cost = Math.ceil(building.cost * 1.15); // Increase cost by 15%
        saveProgress();
        updateUI();
    }
}

// Income generation every second
function updateInfinity() {
    infinityDollars += ips; // Add IPS to Infinity Dollars
    saveProgress();
    updateUI();
}

// Run the game loop to update the infinity count every second
setInterval(updateInfinity, 1000);

// Load progress on startup
loadProgress();
updateUI();
