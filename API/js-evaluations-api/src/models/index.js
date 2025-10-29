const { sequelize } = require('../db/client');
const User = require('./user');
const Evaluation = require('./evaluation');

const models = {
  User: User(sequelize),
  Evaluation: Evaluation(sequelize),
};

// Associations
models.User.hasMany(models.Evaluation, { foreignKey: 'createdBy', as: 'evaluations' });
models.Evaluation.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = {
  ...models,
  sequelize,
  sync: async (opts = { alter: true }) => {
    await sequelize.sync(opts);
  },
};