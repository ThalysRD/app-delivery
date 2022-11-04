module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('sales', {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key:'id'
              },
            allowNull: false,
        },
        seller_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key:'id'
              },
            allowNull: false,
        },
        total_price: {
            type: Sequelize.DECIMAL(9,2),
            allowNull: false,
        },
        delivery_address: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },  
         delivery_number: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        sale_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('sales');
    },
  };
  