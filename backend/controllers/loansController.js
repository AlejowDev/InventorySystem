const Loan = require('../models/loanModel');

// Obtener todos los préstamos
const getAllLoans = (req, res) => {
    Loan.findAll((err, loans) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Opcionalmente, puedes formatear los dispositivos como array si lo prefieres
        const formattedLoans = loans.map(loan => ({
            ...loan,
            devices: loan.devices ? loan.devices.split(',') : [] // Convertir la lista de dispositivos en array
        }));
        res.json(formattedLoans);
    });
};


// Crear un nuevo préstamo
const createLoan = (req, res) => {
    const loanData = {
        devices: req.body.devices, // Array de dispositivos
        receivingUser: req.body.receivingUser,
        moderator: req.body.moderator,
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

// Eliminar un préstamo
const deleteLoan = (req, res) => {
    const loanId = req.params.id; // Obtener el ID del préstamo de los parámetros

    Loan.delete(loanId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan deleted successfully' });
    });
};


// Actualizar un préstamo
const updateLoan = (req, res) => {
    const loanId = req.params.id; // Obtener el ID del préstamo de los parámetros
    const loanData = {
        approval: req.body.approval,
        state: req.body.state,
    };

    Loan.update(loanId, loanData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan updated successfully' });
    });
};


module.exports = {
    getAllLoans,
    createLoan,
    deleteLoan,
    updateLoan, // Exportar la función de actualización
};
