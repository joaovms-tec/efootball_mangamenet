const express = require('express');
const router = express.Router();
const Time = require('../models/Time');
const Player = require('../models/Player');

// Rota para exibir a página de cadastro de times
router.get('/cadastrar', async (req, res) => {
    const players = await Player.find(); // Busca todos os players cadastrados
    res.render('cadastrar_time', { players });
});

// Rota para salvar um novo time
router.post('/cadastrar', (req, res) => {
    const { nome, dono } = req.body;

    const novoTime = new Time({
        nome: nome,
        dono: dono,
        vitorias: 0,
        derrotas: 0,
        empates: 0,
        golsFeitos: 0,
        golsSofridos: 0
    });

    novoTime.save()
        .then(() => {
            res.redirect('/times');
        })
        .catch(err => {
            console.error(err);
            res.send("Erro ao cadastrar time");
        });
});

// Rota para exibir todos os times
router.get('/', async (req, res) => {
    const times = await Time.find().populate('dono');
    res.render('visualizar_times', { times });
});

module.exports = router;
