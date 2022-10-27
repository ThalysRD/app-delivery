const createSale = (sequelize, DataTypes) => {
    const Sale = sequelize.define('sales', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      } ,
      user_id:: DataTypes.INTEGER,
      seller_id: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING
    }, {
      tableName: 'sales',
      timestamps: false,
    });

    Sale.belongsTo(User, { foreignKey: 'user_id' });

    Sale.belongsTo(User, { foreignKey: 'seller_id' });
  
  
  return Sale
  
  }
  
  module.exports = createSale