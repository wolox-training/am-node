const userDAO = require("../services/userDAO");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const logger = require("../logger/index");
const sessionDAO = require("../services/sessionDAO");


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

            const session = {
                token,
                id: user.id,
            }

            await sessionDAO.create(session);
           
            
            logger.info(`POST /users/sessions Successfully`);

            res.status(200).json({
                message: 'Login correcto',
                token
            });

        } catch (error) {

            logger.error('POST /users/sessions Error: ', error);
            res.status(500).json({
                message: 'Error del servidor',
                errors: error
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


    },

    destroySession: async (req, res) => { 
        try {
           
            
            const { id } = req.user;
            const session = await sessionDAO.getSession(id);
            
            
            if (!session) {
                logger.info('POST /users/sessions/invalidate_all Error: Session not found');
                return res.status(400).json({
                    message: 'Session no encontrada'
                });
            }
   
            
            await sessionDAO.destroy(session.token);
            
            logger.info('POST /users/sessions/invalidate_all Successfully');
            res.status(200).json({
                message: 'Session invalidada'
            });
        } catch (error) {
            logger.error('POST /users/sessions/invalidate_all Error: ', error);
            res.status(500).json({
                message: 'Error del servidor'
            });
        }
    }

}

