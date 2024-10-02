//loanController.js

const Loan = require('../models/loanModel');

// Obtener todos los préstamos
const getAllLoans = (req, res) => {
    Loan.findAll((err, loans) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(loans);
    });
};

// Crear un nuevo préstamo
const createLoan = (req, res) => {
    const loanData = {
        device: req.body.deviceId,
        receivingUser: req.body.receivingUserId,
        moderator: req.body.moderatorId,
        loanDate: req.body.loanDate,
        deliveryDate: req.body.deliveryDate,
        approval: req.body.approval,
        state: req.body.state,
    };
       

    Loan.create(loanData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Loan created successfully', loan: result });
    });
};

module.exports = {
    getAllLoans,
    createLoan,
};
