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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'salesProducts',
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'saleId' });
    SaleProduct.belongsTo(models.Product, { foreignKey: 'productId' });  
  }
  return SaleProduct;  
}
  
  module.exports = SaleProduct