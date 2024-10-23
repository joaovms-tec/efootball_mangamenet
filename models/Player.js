const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    nome: String,
    time: { type: mongoose.Schema.Types.ObjectId, ref: 'Time' }
});

module.exports = mongoose.model('Player', playerSchema);
