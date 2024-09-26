let infinity = 100; // Start the game with 100 Infinity Dollars

// Buildings data
let buildings = [
    { id: 1, name: 'Infinity Mine', rate: 1, level: 0, baseCost: 100, cost: 100, purchased: false },
    { id: 2, name: 'Infinity Factory', rate: 5, level: 0, baseCost: 500, cost: 500, purchased: false },
    { id: 3, name: 'Infinity Bank', rate: 25, level: 0, baseCost: 2500, cost: 2500, purchased: false },
    { id: 4, name: 'Infinity Vault', rate: 75, level: 0, baseCost: 7500, cost: 7500, purchased: false },
    { id: 5, name: 'Infinity Tower', rate: 200, level: 0, baseCost: 20000, cost: 20000, purchased: false },
    { id: 6, name: 'Infinity Portal', rate: 500, level: 0, baseCost: 50000, cost: 50000, purchased: false },
    { id: 7, name: 'Infinity Reactor', rate: 1200, level: 0, baseCost: 120000, cost: 120000, purchased: false },
    { id: 8, name: 'Infinity Laboratory', rate: 5000, level: 0, baseCost: 500000, cost: 500000, purchased: false },
    { id: 9, name: 'Infinity Stargate', rate: 15000, level: 0, baseCost: 1500000, cost: 1500000, purchased: false },
    { id: 10, name: 'Infinity Dimension', rate: 40000, level: 0, baseCost: 4000000, cost: 4000000, purchased: false },
    { id: 11, name: 'Infinity Universe', rate: 100000, level: 0, baseCost: 10000000, cost: 10000000, purchased: false },
    { id: 12, name: 'Infinity Multiverse', rate: 500000, level: 0, baseCost: 50000000, cost: 50000000, purchased: false }
];

// Load game progress from local storage
function loadProgress() {
    const savedData = localStorage.getItem('infinityTycoon');
    if (savedData) {
        const data = JSON.parse(savedData);
        infinity = data.infinity;
        buildings = data.buildings;
    }
}

// Save game progress to local storage
function saveProgress() {
    const data = {
        infinity: infinity,
        buildings: buildings
    };
    localStorage.setItem('infinityTycoon', JSON.stringify(data));
}

// Update the Infinity count and IPS every second
function updateInfinity() {
    let totalInfinity = 0;
    let totalIPS = 0; // Initialize total IPS

    buildings.forEach(building => {
        if (building.purchased) {
            totalInfinity += building.rate * building.level;
            totalIPS += building.rate; // Sum the rates for total IPS
        }
    });

    infinity += totalInfinity;
    document.getElementById('infinity').innerText = infinity.toFixed(0);
    document.getElementById('ips').innerText = totalIPS.toFixed(0); // Update IPS counter
    saveProgress(); // Save progress whenever Infinity is updated
}

// Purchase a building
function purchaseBuilding(id) {
    let building = buildings.find(b => b.id === id);
    if (infinity >= building.cost && !building.purchased) {
        infinity -= building.cost;
        building.purchased = true;
        building.level = 1;

        // Enable the upgrade button
        document.querySelector(`#building-${id} button:nth-child(4)`).disabled = false;
        document.querySelector(`#building-${id} button:nth-child(3)`).disabled = true; // Disable purchase button

        updateUI();
        saveProgress(); // Save progress after purchasing
    }
}

// Upgrade a building
function upgradeBuilding(id) {
    let building = buildings.find(b => b.id === id);
    if (infinity >= building.cost) {
        infinity -= building.cost;
        building.level++;
        
        // Dynamic rate increase
        building.rate += building.baseCost * 0.1 * building.level;
        
        // Cost increases by 1.15x after each upgrade
        building.cost = Math.round(building.cost * 1.15);

        updateUI();
        saveProgress(); // Save progress after upgrading
    }
}

// Update the UI to reflect current rates and costs
function updateUI() {
    buildings.forEach(building => {
        const buildingElement = document.getElementById(`building-${building.id}`);

        if (building.purchased) {
            buildingElement.querySelector('.rate').innerText = building.rate.toFixed(0);
            buildingElement.querySelector('.cost').innerText = building.cost;
        } else {
            buildingElement.querySelector('.cost').innerText = building.cost;
        }
    });

    document.getElementById('infinity').innerText = infinity.toFixed(0);
}

// Run the game loop to update the infinity count every second
setInterval(updateInfinity, 1000);

// Load progress on startup
loadProgress();
updateUI();
