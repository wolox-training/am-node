

module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define(
        'Session',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            token: {
                type: DataTypes.TEXT
            },
            tokenUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE

            }
        },
        {
            paranoid: true,
            timestamps: true,
            tableName: 'sessions'
        }
    )

    return Session
}