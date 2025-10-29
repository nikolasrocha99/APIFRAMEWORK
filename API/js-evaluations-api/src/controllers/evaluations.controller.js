const { Evaluation, User } = require('../models');

exports.create = async (req, res) => {
  try {
    const payload = { ...req.body, createdBy: req.user.id };
    const ev = await Evaluation.create(payload);
    res.status(201).json(ev);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar avaliação', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const items = await Evaluation.findAll({ include: [{ model: User, as: 'creator', attributes: ['id','name','email'] }] });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const ev = await Evaluation.findByPk(req.params.id, { include: [{ model: User, as: 'creator', attributes: ['id','name'] }] });
    if (!ev) return res.status(404).json({ message: 'Não encontrado' });
    res.json(ev);
  } catch (err) {
    res.status(500).json({ message: 'Erro', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const ev = await Evaluation.findByPk(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Não encontrado' });
    // opcional: somente criador pode editar
    if (ev.createdBy !== req.user.id) return res.status(403).json({ message: 'Sem permissão' });
    await ev.update(req.body);
    res.json(ev);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const ev = await Evaluation.findByPk(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Não encontrado' });
    if (ev.createdBy !== req.user.id) return res.status(403).json({ message: 'Sem permissão' });
    await ev.destroy();
    res.json({ message: 'Removido' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover', error: err.message });
  }
};