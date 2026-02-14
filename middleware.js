
const validator = (req, res, next) => {
    if (['POST', 'PATCH', 'PUT'].includes(req.method)) {
        const { name, quantity, amount } = req.body;

        if (req.method === 'POST' && (!name || quantity === undefined)) {
            return res.status(400).json({ error: "Validation: Name and Quantity are required." });
        }

        const valToCheck = quantity !== undefined ? quantity : amount;
        if (valToCheck !== undefined && (typeof valToCheck !== 'number' || valToCheck < 0)) {
            return res.status(400).json({ error: "Validation: Values must be positive numbers." });
        }
    }
    next();
};

const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
};

module.exports = { validator, logger };