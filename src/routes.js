const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');

const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: false }));

route.get('/', (req, res) => {
    res.status(200).send({
        "API-name": "Site-API",
        "version": "v1"
    });
});

route.post('/products', productController.post);
route.get('/products', productController.get);
route.delete('/products/:id', productController.delete);

route.post('/users', userController.post);
route.get('/users', userController.get);
route.delete('/users/:id', userController.delete);

route.post('/orders', orderController.post);
route.get('/orders', orderController.get);

module.exports = route;