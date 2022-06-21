const db = require('../models/index');

const userDAO = {
    getAllUser: async ({ offset, limit }) => {
        try {

            const users = await db.User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email'],
                offset,
                limit

            });
            return users;
        } catch (error) {
            return error
        }
    },

    getById: (id) => {
        return db.User.findByPk(id);
    },

    getUser: async (param) => {
        return await db.User.findOne({ where: { email: param } });
    },
    postUser: (user) => {
        return db.User.create(user);
    },
    updateUser: async (user) => {
        return await db.User.update({ ...user, role: 'admin' }, { where: { id: user.id } });
    },
    updatePosition: async (id, position) => {
        return await db.User.update(
            { position: position },
            {
                where: { id },
                returning: true,
                plain: true
            });
    }
}

module.exports = userDAO;