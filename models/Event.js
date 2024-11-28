const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
  summary: { type: String, required: true },
  source: { type: String, required: true },
  media: { type: String, required: false } // Campo para el enlace de la imagen o video
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

