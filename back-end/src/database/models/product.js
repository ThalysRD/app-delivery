const createProducts = (sequelize, DataTypes) => {
    const Product = sequelize.define('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      } ,
      name:: DataTypes.STRING,
      price: DataTypes.FLOAT,
      url_image: DataTypes.STRING,
    }, {
      tableName: 'products',
      timestamps: false,
    });

  
  return Product
  
  }
  
  module.exports = createProducts