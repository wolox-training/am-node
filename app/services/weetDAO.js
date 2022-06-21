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
        return db.Weet.findByPk(id);
    },

    create: (weet) => {
        return db.Weet.create(weet);
    },

}

module.exports = weetDAO;