const createUser = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      } ,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    }, {
      tableName: 'users',
      timestamps: false,
    });
  
  
  return User
  
  }
  
  module.exports = createUser