const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

const signToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email já cadastrado' });
    const user = await User.create({ name, email, password });
    const token = signToken(user);
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no registro', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.scope(null).findOne({ where: { email } }); // access password
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });
    const valid = await require('bcrypt').compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenciais inválidas' });
    const token = signToken(user);
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};