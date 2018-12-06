const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

// Cors
const configCors = {
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
    maxAge: 3600
}

server.use(cors(configCors));

const io = require('socket.io').listen(server);

// Conecta ao banco de dados
mongoose.connect('mongodb://site:site123@ds041167.mlab.com:41167/site-backend', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

//Carrega as rotas
const routes = require('./routes');
server.use(routes);

//Normalizar porta
var porta = process.env.PORT || 3000;

//Ouve a porta 
server.listen(porta, () => {
    console.log("Server listening on port " + porta + " (:");
})

module.exports = app;
