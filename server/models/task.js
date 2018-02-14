'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    text: DataTypes.STRING,
  });

  Task.associate = function(models) {
    models.Task.belongsTo(models.Project, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return Task;
};
