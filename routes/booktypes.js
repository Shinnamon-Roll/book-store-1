const express = require('express');
const router = express.Router();
const { BookTypes } = require('../models');

// API สำหรับการเพิ่มประเภทหนังสือ
router.post('/', async (req, res) => {
    const { BookTypeName } = req.body;

    try {
        const newBookType = await BookTypes.create({
            BookTypeName
        });
        res.status(201).json(newBookType);
    } catch (error) {
        console.error('Error adding book type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านประเภทหนังสือทั้งหมด
router.get('/', async (req, res) => {
    try {
        const bookTypes = await BookTypes.findAll();
        res.status(200).json(bookTypes);
    } catch (error) {
        console.error('Error fetching book types:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านประเภทหนังสือตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const bookType = await BookTypes.findByPk(id);
        if (bookType) {
            res.status(200).json(bookType);
        } else {
            res.status(404).json({ message: 'Book type not found' });
        }
    } catch (error) {
        console.error('Error fetching book type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอัปเดตประเภทหนังสือ
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { BookTypeName } = req.body;

    try {
        const bookType = await BookTypes.findByPk(id);
        if (bookType) {
            await bookType.update({
                BookTypeName
            });
            res.status(200).json(bookType);
        } else {
            res.status(404).json({ message: 'Book type not found' });
        }
    } catch (error) {
        console.error('Error updating book type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการลบประเภทหนังสือ
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const bookType = await BookTypes.findByPk(id);
        if (bookType) {
            await bookType.destroy();
            res.status(204).send(); // ส่งสถานะ 204 No Content
        } else {
            res.status(404).json({ message: 'Book type not found' });
        }
    } catch (error) {
        console.error('Error deleting book type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
