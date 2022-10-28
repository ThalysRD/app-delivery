const SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProducts', {
    sale_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    },

    product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    },
  }, {
    tableName: 'salesProducts',
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'sale_id' });
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'product_id' });  
  }
  return SaleProduct;  
}
  
  module.exports = SaleProduct