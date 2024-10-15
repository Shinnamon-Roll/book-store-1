const express = require('express');
const router = express.Router();
const { Customers } = require('../models');

// API สำหรับการเพิ่มลูกค้า
router.post('/', async (req, res) => {
    const { CustomerName, Sex, Age, Contact, Address } = req.body;

    try {
        const newCustomer = await Customers.create({
            CustomerName,
            Sex,
            Age,
            Contact,
            Address
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านลูกค้าทั้งหมด
router.get('/', async (req, res) => {
    try {
        const customers = await Customers.findAll();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านลูกค้าตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customers.findByPk(id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอัปเดตลูกค้า
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { CustomerName, Sex, Age, Contact, Address } = req.body;

    try {
        const customer = await Customers.findByPk(id);
        if (customer) {
            await customer.update({
                CustomerName,
                Sex,
                Age,
                Contact,
                Address
            });
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการลบลูกค้า
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customers.findByPk(id);
        if (customer) {
            await customer.destroy();
            res.status(204).send(); // ส่งสถานะ 204 No Content
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
