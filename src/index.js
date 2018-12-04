const express = require('express');
const mongoose = require('mongoose');

// Importa as rotas
const routes = require('./routes');

// Express
const app = express();

// Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

// Conecta ao banco de dados
mongoose.connect('mongodb://site:site123@ds041167.mlab.com:41167/site-backend', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

//Carrega as rotas
app.use(routes);

//Porta randomica
var porta = process.env.PORT || 3000;

//Ouve a porta 
app.listen(porta, () => {
    console.log("Server listening on port " + porta + " (:");
})

module.exports = app;