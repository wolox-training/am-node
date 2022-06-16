'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'position', {
      type: Sequelize.ENUM,
      values: ['developer', 'lead', 'tl', 'em', 'head', 'ceo'],
      defaultValue: 'developer'


    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(() =>
      Promise.all([
        queryInterface.removeColumn('Users', 'position'),
        queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_position_values"')
      ])
    );
  }
};
