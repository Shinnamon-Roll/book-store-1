const express = require('express');
const router = express.Router();
const { Members } = require('../models');

// API สำหรับการเพิ่มสมาชิก
router.post('/', async (req, res) => {
    const { Point, JoinDate, MembershipLevel } = req.body;

    try {
        const newMember = await Members.create({
            Point,
            JoinDate,
            MembershipLevel
        });
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านสมาชิกทั้งหมด
router.get('/', async (req, res) => {
    try {
        const members = await Members.findAll();
        res.status(200).json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอ่านสมาชิกตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const member = await Members.findByPk(id);
        if (member) {
            res.status(200).json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        console.error('Error fetching member:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการอัปเดตสมาชิก
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Point, JoinDate, MembershipLevel } = req.body;

    try {
        const member = await Members.findByPk(id);
        if (member) {
            await member.update({
                Point,
                JoinDate,
                MembershipLevel
            });
            res.status(200).json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API สำหรับการลบสมาชิก
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const member = await Members.findByPk(id);
        if (member) {
            await member.destroy();
            res.status(204).send(); // ส่งสถานะ 204 No Content
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
