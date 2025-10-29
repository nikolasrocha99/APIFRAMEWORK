const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Evaluation = sequelize.define('Evaluation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    studentName: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    score: { type: DataTypes.FLOAT, allowNull: false },
    maxScore: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 100 },
    date: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    createdBy: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'evaluations',
  });

  return Evaluation;
};