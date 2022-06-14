

const jwt = require('jsonwebtoken');
const userDAO = require('../services/userDAO');


const validarJWT = async ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

 
        const user = await userDAO.getById( id );

        if ( !user ) {
            return res.status(401) ({
                msg: 'Token no valido -user no existe DB'

            })
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}
 