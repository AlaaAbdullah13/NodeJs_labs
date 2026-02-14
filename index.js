const express = require('express');
const path = require('path');
const { readInventory, writeInventory } = require('./helperFun');
const { validator, logger } = require('./middleware');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(logger);
app.use(validator);
app.use(express.static( 'public' ));

app.get('/', (req, res) => {
    const inventory = readInventory();
    res.render('inventory', { products: inventory }); 
});

app.get('/inventory', (req, res) => {
    let inventory = readInventory();
    const { category, status } = req.query;
    if (category) inventory = inventory.filter(i => i.category === category);
    if (status === 'low') inventory = inventory.filter(i => i.quantity < 5);
    res.json(inventory);
});

app.get('/inventory/:id', (req, res) => {
    const inventory = readInventory();
    const item = inventory.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
});

app.post('/inventory', (req, res) => {
    const inventory = readInventory();

    const maxId = inventory.length > 0 
        ? Math.max(...inventory.map(item => item.id)) 
        : 0;

    const newItem = { 
        id: maxId + 1, 
        name: req.body.name, 
        category: req.body.category, 
        quantity: req.body.quantity,
        status: req.body.quantity < 5 ? "low stock" : "in stock"
    };

    inventory.push(newItem);     
    writeInventory(inventory);
    res.status(201).json(newItem);
});

app.patch('/inventory/:id/:action', (req, res) => {
    const { id, action } = req.params;
    const { amount } = req.body;
    let inventory = readInventory();
    const item = inventory.find(i => i.id === parseInt(id));
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (action === 'restock') item.quantity += amount;
    else if (action === 'destock') {
        if (item.quantity < amount) return res.status(400).json({ error: "Not enough stock" });
        item.quantity -= amount;
    }
    writeInventory(inventory);
    res.json(item);
});

app.delete('/inventory/:id', (req, res) => {
    const inventory = readInventory();
    const filtered = inventory.filter(i => i.id !== parseInt(req.params.id));
    writeInventory(filtered);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));