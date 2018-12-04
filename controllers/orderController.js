const Order = require('../models/order');
const guid = require('guid');

exports.post = async (req, res, next) => {
    const order = new Order({
        user: req.body.user,
        number: guid.raw().substring(0, 6),
        items: req.body.items
    });
    try {
        const response = await order.save();

        if (!response) throw new Error('Erro ao cadastrar pedido.');

        req.io.emit('order', response);

        return res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar pedido => ' + e })
    }
}

exports.get = async (req, res, next) => {
    try {
        const response = await Order.find({})
        .populate('user', 'name')
        .populate('items.product', 'name');

        if (!response) throw new Error('Erro na requisição de pedidos.');

        res.status(200).send(response);

    } catch (e) {
        res.status(500).send({ message: 'Falha na requisição => ' + e })
    }
}