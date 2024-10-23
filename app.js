const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/efootballDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const campeonatoRoutes = require('./routes/campeonatoRoutes');
const timeRoutes = require('./routes/timeRoutes');
const playerRoutes = require('./routes/playerRoutes');

app.use('/campeonatos', campeonatoRoutes);
app.use('/times', timeRoutes);
app.use('/players', playerRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
