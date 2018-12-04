const User = require('../models/user');

exports.post = async (req, res, next) => {
    const user = new User(req.body);
    try {
        const response = await user.save();

        if (!response) throw new Error('Erro ao cadastrar cliente');

        req.io.emit('user', response);

        return res.status(201).send({ message: 'Usuário criado com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar cliente => ' + e });
    }
};

exports.get = async (req, res, next) => {
    try {
        const response = await User.find({}).sort('-createdAt');

        res.status(200).send(response);

    } catch (e) {
        res.status(500).send({ message: 'Falha na requisição => ' + e });
    }
};

exports.delete = async (req, res, next) => {
    const target = req.params.id;
    try {
        const response = await User.findOneAndDelete({ _id: target })

        if (!response) throw new Error('Usuário não encontrado.');

        res.status(200).send({ message: "Usuário excluido com sucesso!" });
    } catch (e) {
        res.status(500).send({ message: "Falha ao excluir cliente => " + e })
    }

};