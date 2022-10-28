const Product = (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      } ,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      url_image: DataTypes.STRING,
    }, {
      tableName: 'Products',
      timestamps: false,
    });

  
  return Product
  
  }
  
  module.exports = Product