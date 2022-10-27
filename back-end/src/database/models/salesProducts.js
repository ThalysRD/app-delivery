
const createSalesProducts = (sequelize, DataTypes) => {
    const SalesProduct = sequelize.define('salesProducts', {
        sale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      } ,

      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    }, {
      tableName: 'salesProducts',
      timestamps: false,
    });


        SalesProduct.belongsTo(Sale, { foreignKey: 'sale_id' });

        SalesProduct.belongsTo(Sale, { foreignKey: 'product_id' });
      
      
    


  return PostCategory
  
  }
  
  module.exports = createSalesProducts