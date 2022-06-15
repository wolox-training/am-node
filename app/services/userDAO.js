const db = require('../models/index');

const userDAO = {
    getAllUser: () => {
        return db.User.findAll();
    },

    getById: (id) => {
        return db.User.findByPk(id);
    },
    
    getUser: async(param) => {
       return  await db.User.findOne({ where: { email: param } });
    },

    postUser: (user) => {
        return db.User.create(user);
    },
    updateUser:async (user) => {
        return await db.User.update({...user,role:'admin'}, { where: { id: user.id } });
    }
}

module.exports = userDAO;