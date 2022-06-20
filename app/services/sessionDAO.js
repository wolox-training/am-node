const db = require('../models/index');

const sessionDAO = {

    getSession: async (id) => {
        try {

            return await db.Session.findOne({
                where: {
                    tokenUserId: id
                }
            });

        } catch (error) {
            return error;
        }

    },
    create: async (session) => {
        try {
            const newSession = await db.Session.create({
                token: session.token,
                tokenUserId: session.id,
                createAt: Date.now()
            })

            return newSession;


        } catch (error) {
            return error;
        }

    },

    destroy: async (token) => {
        try {
            const result = await db.Session.destroy({
                where: {
                    token: token
                }
            })
            return result;
        } catch (error) {
            return error;
        }
    }


}

module.exports = sessionDAO;