module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'regular'
      },
      position: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['developer', 'lead', 'tl', 'em', 'head', 'ceo'],
        defaultValue: 'developer'
      }
    },
  );
  return User;
};
