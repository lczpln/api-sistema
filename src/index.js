const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Express
const app = express();

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

//Porta randomica
var porta = process.env.PORT || 3000;

//Ouve a porta 
app.listen(porta, () => {
    console.log("Server listening on port " + porta + " (:");
})

module.exports = app;