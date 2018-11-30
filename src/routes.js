const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');

const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: false }));

route.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

route.get('/', (req, res) => {
    res.status(200).send({
        "API-name": "Site-API",
        "version": "v1"
    });
});

route.post('/products', productController.post);
route.get('/products', productController.get);
route.delete('/products', productController.delete);

route.post('/users', userController.post);
route.get('/users', userController.get);
route.delete('/users', userController.delete);

route.post('/orders', orderController.post);
route.get('/orders', orderController.get);

module.exports = route;