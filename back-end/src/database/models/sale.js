const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
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

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'user_id' });  
    Sale.belongsTo(models.User, { foreignKey: 'seller_id' });
  }

  return Sale;
};

module.exports = Sale