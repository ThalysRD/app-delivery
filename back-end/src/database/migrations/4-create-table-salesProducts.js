module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('salesProducts', {
        sale_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'sales',
            key: 'id',
          },
          primaryKey:true,
        },
        product_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          primaryKey:true,
        },
      })
    },
  
    down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('salesProducts');
  
    }
  };