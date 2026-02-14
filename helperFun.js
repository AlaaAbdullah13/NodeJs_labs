const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'inventory.json');

function readInventory() {
    try {
        if (!fs.existsSync(dbPath)) {
            return [];
        }
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading inventory:", err);
        return [];
    }
}



function writeInventory(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing to file:", err);
    }
}
module.exports = { readInventory , writeInventory};