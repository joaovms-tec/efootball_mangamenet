const mongoose = require('mongoose');

const campeonatoSchema = new mongoose.Schema({
    nome: String,
    tipo: String,
    times: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Time' }],
    confrontos: [{ timeA: String, timeB: String, placarA: Number, placarB: Number }]
});

module.exports = mongoose.model('Campeonato', campeonatoSchema);
