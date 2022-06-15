const userDAO = require("../services/userDAO");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const logger = require("../logger/index");


exports.loginController = {

    signIn: async (req, res) => {

        try {

            const { email, password } = req.body;

            const user = await userDAO.getUser(email);
            if (!user) {

                logger.info(`GET /api/users Error: User not found`);

                return res.status(400).json({
                    message: 'Usuario / Password no son correctos - correo'
                });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {

                logger.info(`POST /users/sessions Error: User not found`);

                return res.status(400).json({
                    message: 'Usuario / Password no son correctos - password'
                });
            }

            const token = await generarJWT(user.id);

            logger.info(`POST /users/sessions Successfully`);

            res.status(200).json({
                message: 'Login correcto',
                token
            });

        } catch (error) {

            logger.error('POST /users/sessions Error: ', error);
            res.status(500).json({
                message: 'Error del servidor',
                errors:error
            });

        }


    },
    signInAdmin: async (req, res) => {

        try {

            const { email, password } = req.body;

            const user = await userDAO.getUser(email);


            if (!user) {
                logger.info('POST /admin/users Error: User not found');
                return res.status(400).json({
                    message: 'Usuario / Password no son correctos - correo'
                });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                logger.info('POST /admin/users Error: User not found');

                return res.status(400).json({
                    message: 'Usuario / Password no son correctos - password'
                });
            }

            user.role == 'regular' && await userDAO.updateUser(user) 

            const token = await generarJWT(user.id);

            res.status(200).json({
                message: 'Login correcto',
                token
            });

        } catch (error) {

            logger.error('POST /admin/users Error: ', error);
            res.status(500).json({
                message: 'Error del servidor'
            });

        }


    }
}

