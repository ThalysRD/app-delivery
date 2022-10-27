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
        categoryId:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Categories',
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