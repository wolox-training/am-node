const userDAO = require("../services/userDAO");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");



exports.loginController = {

    methodPOST: async (req, res) => {

        try {

            const { email, password } = req.body;

            const user = await userDAO.getUser(email);
            if (!user) {
                return res.status(400).json({
                    message: 'Usuario / Password no son correctos - correo'
                });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    message: 'Usuario / Password no son correctos - password'
                });
            }

            const token = await generarJWT(user.id);

            res.status(200).json({
                message: 'Login correcto',
                token
            });

        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: 'Error del servidor'
            });

        }


    },
    methodAdminPOST: async (req, res) => {

        try {

            const { email, password } = req.body;

            const user = await userDAO.getUser(email);


            if (!user) {
                return res.status(400).json({
                    message: 'Usuario / Password no son correctos - correo'
                });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
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

            console.log(error);
            res.status(500).json({
                message: 'Error del servidor'
            });

        }


    }
}

