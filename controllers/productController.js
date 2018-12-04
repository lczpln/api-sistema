const Product = require('../models/product');

exports.post = async (req, res, next) => {
    const product = new Product(req.body);
    try {
        const response = await product.save();

        req.io.emit('product', response);

        return res.status(200).send({ message: 'Produto cadastrado com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar produto => ' + e });
    }
}

exports.get = async (req, res, next) => {
    try {
        const response = await Product.find({});

        res.status(200).send(response);

    } catch (e) {

        res.status(500).send({ message: 'Falha na requisição => ' + e });
    }
}

exports.delete = async (req, res, next) => {
    const target = req.params.id
    try {
        const response = await Product.findOneAndDelete({ _id: target })

        if (!response) throw new Error('Produto não encontrado.');

        res.status(200).send({ message: 'Produto excluido com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Falha ao excluir produto => ' + e });
    }
}


