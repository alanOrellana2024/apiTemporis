const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Event = require('./models/Event');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8027; // Usar el puerto 8027 o el que esté configurado en .env

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});



// Ruta para obtener todos los eventos
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
});

// Ruta para agregar un nuevo evento
app.post('/events', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: 'Error al agregar el evento' });
    }
});

const server = app.listen(PORT, () => {
    const assignedPort = server.address().port;
    console.log(`Servidor corriendo en http://localhost:${assignedPort}`);
});


