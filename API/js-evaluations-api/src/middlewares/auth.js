const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Token ausente' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Usuário inválido' });
    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido', error: err.message });
  }
};