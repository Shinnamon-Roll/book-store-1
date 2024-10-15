const express = require('express');
const router = express.Router();
const { Books } = require('../models');

// API สำหรับการเพิ่มหนังสือ
router.post('/', async (req, res) => {
    const { bookName, bookTypeID, bookPrice, description } = req.body;

    try {
        const newBook = await Books.create({
            BookName: bookName,
            BookTypeID: bookTypeID,
            BookPrice: bookPrice,
            Description: description
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านหนังสือทั้งหมด
router.get('/', async (req, res) => {
    try {
        const books = await Books.findAll();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านหนังสือตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Books.findByPk(id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอัปเดตหนังสือ
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { bookName, bookTypeID, bookPrice, description } = req.body;

    try {
        const book = await Books.findByPk(id);
        if (book) {
            await book.update({
                BookName: bookName,
                BookTypeID: bookTypeID,
                BookPrice: bookPrice,
                Description: description
            });
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการลบหนังสือ
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Books.findByPk(id);
        if (book) {
            await book.destroy();
            res.status(204).send(); // ส่งสถานะ 204 No Content
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
