const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
    sellerId: { type: DataTypes.INTEGER, field: 'seller_id' },
    totalPrice: { type: DataTypes.INTEGER, field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
    saleDate: { type: DataTypes.DATE, field: 'sale_date' },
    status: DataTypes.STRING,
  }, {
    tableName: 'sales',
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId' });
  }

  return Sale;
};

module.exports = Sale