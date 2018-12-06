const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// Cors
const configCors = {
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
    maxAge: 3600
}

app.use(cors(configCors));

// Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Conecta ao banco de dados
mongoose.connect('mongodb://site:site123@ds041167.mlab.com:41167/site-backend', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

//Carrega as rotas
const routes = require('./routes');
app.use(routes);

//Normalizar porta
var porta = process.env.PORT || 3000;

//Ouve a porta 
server.listen(porta, () => {
    console.log("Server listening on port " + porta + " (:");
})

module.exports = app;