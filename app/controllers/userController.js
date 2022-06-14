const bcryptjs = require("bcryptjs");
const { paginateResults } = require("../helpers/paginateResults");
const userDAO = require("../services/userDAO");

exports.userController = {

    methodGET: async (req, res, next) => {

        try {

            const users = await userDAO.getAllUser();

            const results = paginateResults(req, users);

            res.status(200).json(results);

        } catch (error) {
            next()
        }
    },

    methodPOST: async (req, res, next) => {

        try {

            let newUser = { ...req.body };

            newUser.password = bcryptjs.hashSync(req.body.password, 10);

            await userDAO.postUser(newUser);
            
            res.status(201).json({newUser})

        } catch (error) {
            next()
        }
    }
}
