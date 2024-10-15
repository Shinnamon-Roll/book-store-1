const express = require('express');
const router = express.Router();
const { BookStore } = require('../models');

// API สำหรับการเพิ่มการขาย
router.post('/', async (req, res) => {
    const { CustomerID, BookID, PurchaseDate, Quantity } = req.body;

    try {
        const newSale = await BookStore.create({
            CustomerID,
            BookID,
            PurchaseDate,
            Quantity
        });
        res.status(201).json(newSale);
    } catch (error) {
        console.error('Error adding sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านการขายทั้งหมด
router.get('/', async (req, res) => {
    try {
        const sales = await BookStore.findAll();
        res.status(200).json(sales);
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านการขายตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await BookStore.findByPk(id);
        if (sale) {
            res.status(200).json(sale);
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        console.error('Error fetching sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอัปเดตการขาย
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { CustomerID, BookID, PurchaseDate, Quantity } = req.body;

    try {
        const sale = await BookStore.findByPk(id);
        if (sale) {
            await sale.update({
                CustomerID,
                BookID,
                PurchaseDate,
                Quantity
            });
            res.status(200).json(sale);
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        console.error('Error updating sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการลบการขาย
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await BookStore.findByPk(id);
        if (sale) {
            await sale.destroy();
            res.status(204).send(); // ส่งสถานะ 204 No Content
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        console.error('Error deleting sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
