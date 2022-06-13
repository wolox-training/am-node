const db = require('../models/index');

const userDAO = {
    getAllUser: () => {
        return db.User.findAll();
    },
    
    getUser: (param) => {
        return db.User.findOne({ where: { email: param } });
    },

    postUser: (user) => {
        return db.User.create(user);
    }
}

module.exports = userDAO;