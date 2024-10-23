const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    nome: String,
    dono: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    vitorias: Number,
    derrotas: Number,
    empates: Number,
    golsFeitos: Number,
    golsSofridos: Number
});

module.exports = mongoose.model('Time', timeSchema);
