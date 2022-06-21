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
        try {
            return db.User.findByPk(id);

        } catch (error) {
            return error
        }
    },

    getUser: async (param) => {
        try {
            return await db.User.findOne({ where: { email: param } });
        } catch (error) {
            return error
        }
    },
    postUser: (user) => {
        try {
            return db.User.create(user);
        } catch (error) {
            return error
        }
    },
    updateUser: async (user) => {
        try {
            return await db.User.update({ ...user, role: 'admin' }, { where: { id: user.id } });
        } catch (error) {
            return error
        }
    },
    updatePosition: async (id, position) => {
        try {
            return await db.User.update(
                { position: position },
                {
                    where: { id },
                    returning: true,
                    plain: true
                });
        } catch (error) {
            return error
        }
    }
}

module.exports = userDAO;