const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Rota para exibir a página de cadastro de players
router.get('/cadastrar', (req, res) => {
    res.render('cadastrar_player');
});

// Rota para salvar um novo player
router.post('/cadastrar', (req, res) => {
    const { nome } = req.body;

    const novoPlayer = new Player({
        nome: nome,
        time: null // O time pode ser vinculado depois
    });

    novoPlayer.save()
        .then(() => {
            res.redirect('/players');
        })
        .catch(err => {
            console.error(err);
            res.send("Erro ao cadastrar player");
        });
});

// Rota para exibir todos os players
router.get('/', async (req, res) => {
    const players = await Player.find();
    res.render('visualizar_players', { players });
});

module.exports = router;
