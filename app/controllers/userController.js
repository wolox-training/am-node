const bcryptjs = require("bcryptjs");
const logger = require("../logger/index");
const { paginateResults } = require("../helpers/paginateResults");
const userDAO = require("../services/userDAO");

exports.userController = {

    allUser: async (req, res, next) => {

        try {

            const users = await userDAO.getAllUser();

            const results = paginateResults(req, users);

            logger.info(`GET /api/users Successfully `);

            res.status(200).json(results);

        } catch (error) {
            logger.error('GET /api/users Error: ', error);
            return res.status(500).json({errors: error });

        }
    },

    signUp: async (req, res, next) => {

        try {

            let newUser = { ...req.body };

            newUser.password = bcryptjs.hashSync(req.body.password, 10);

            await userDAO.postUser(newUser);
            logger.info('POST /api/create/user Successfully');

            res.status(201).json({ newUser })

        } catch (error) {
            logger.error('POST /api/create/user Error: ', error);
            return res.status(500).json({errors: error });
        }
    }
}
