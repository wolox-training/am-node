

module.exports = (sequelize, DataTypes) => {
    const Qualification = sequelize.define(
        'Qualification',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            ratingUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            weetId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'weets',
                    key: 'id'
                }
            },
            score: {
                type: DataTypes.INTEGER,
                validate: {
                    isIn: [[1, -1]]
                },
                allowNull: false
            }
        },
        {
            tableName: 'qualification',
            timestamps: false,
        }
    );
    return Qualification

}