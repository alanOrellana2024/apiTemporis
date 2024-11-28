const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Obtener eventos por año
router.get('/:year', async (req, res) => {
    try {
        const events = await Event.find({ year: req.params.year });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Agregar un nuevo evento
router.post('/', async (req, res) => {
    const event = new Event({
        year: req.body.year,
        title: req.body.title,
        category: req.body.category,
        summary: req.body.summary,
        image: req.body.image,
        video: req.body.video,
        source: req.body.source,
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
