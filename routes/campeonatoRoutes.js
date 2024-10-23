const express = require('express');
const router = express.Router();
const Campeonato = require('../models/Campeonato');
const Time = require('../models/Time');

// Rota para exibir a página de cadastro de campeonatos
router.get('/cadastrar', async (req, res) => {
    const times = await Time.find(); // Busca todos os times cadastrados
    res.render('cadastrar_campeonato', { times });
});

// Rota para salvar um novo campeonato
router.post('/cadastrar', (req, res) => {
    const { nome, tipo, times } = req.body;
    
    const novoCampeonato = new Campeonato({
        nome: nome,
        tipo: tipo,
        times: times,
        confrontos: []
    });

    novoCampeonato.save()
        .then(() => {
            res.redirect('/campeonatos');
        })
        .catch(err => {
            console.error(err);
            res.send("Erro ao cadastrar campeonato");
        });
});

// Rota para exibir todos os campeonatos
router.get('/', async (req, res) => {
    const campeonatos = await Campeonato.find().populate('times');
    res.render('visualizar_campeonatos', { campeonatos });
});

// Rota para exibir página de adicionar confrontos
router.get('/:id/adicionar-confronto', async (req, res) => {
    const campeonato = await Campeonato.findById(req.params.id).populate('times');
    res.render('adicionar_confronto', { campeonato });
});

// Rota para salvar confrontos
router.post('/:id/adicionar-confronto', async (req, res) => {
    const { timeA, timeB, placarA, placarB } = req.body;

    const confronto = {
        timeA: timeA,
        timeB: timeB,
        placarA: parseInt(placarA),
        placarB: parseInt(placarB)
    };

    const campeonato = await Campeonato.findById(req.params.id);
    campeonato.confrontos.push(confronto);
    await campeonato.save();

    res.redirect(`/campeonatos/${req.params.id}`);
});

module.exports = router;
