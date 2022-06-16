'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('qualification', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ratingUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      weetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'weets',
          key: 'id'
        }
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(() =>

      Promise.all([
        queryInterface.dropTable('qualification'),
        queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_qualification_score_values"')
      ])
    );
  }
};
