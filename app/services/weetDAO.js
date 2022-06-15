const db = require('../models/index');

const weetDAO = {
    getAllWeets: () => {
        return db.Weet.findAll();
    },

    getById: (id) => {
        return db.Weet.findByPk(id);
    },

    create: (weet) => {
        return db.Weet.create(weet);
    },
 
}

module.exports = weetDAO;