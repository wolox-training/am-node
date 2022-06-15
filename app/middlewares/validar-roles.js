



const tieneRole = ( ...roles ) => {
    return ( req, res,next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if ( !roles.includes ( req.user.role ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles '${ roles }'`
            });
        }


        next();
    }

}


module.exports = {
    tieneRole
}