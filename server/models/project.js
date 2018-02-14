'use strict';

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Project.associate = function(models) {
    models.Project.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return Project;
};
