const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.hook('beforeCreate', user => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => (user.password = hash))
      .catch(e => console.error(e));
  });
  // Instance Method
  User.prototype.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
