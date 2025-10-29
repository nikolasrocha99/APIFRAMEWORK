module.exports = (sequelize, DataTypes) => {
    const Evaluation = sequelize.define('Evaluation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        grade: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Students', // Assuming there is a Students model
                key: 'id',
            },
        },
    }, {
        tableName: 'evaluations',
        timestamps: true,
    });

    Evaluation.associate = (models) => {
        Evaluation.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'student',
        });
    };

    return Evaluation;
};