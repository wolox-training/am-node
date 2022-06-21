const db = require('../models/index');

const weetDAO = {
    getAllWeets: async ({ offset, limit }) => {
        try {
            const weets = await db.Weet.findAll({ offset, limit });
            return weets;

        } catch (error) {
            return error
        }
    },

    getById: (id) => {
        try {
            return db.Weet.findByPk(id);
        } catch (error) {
            return error
        }
    },

    create: (weet) => {
        try {
            return db.Weet.create(weet);
        } catch (error) {
            return error
        }
    },

}

module.exports = weetDAO;