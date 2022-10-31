const SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'sale_id',
    },

    productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'product_id',
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