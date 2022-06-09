

const { check } = require('express-validator');
const db = require('../models/index') 


const validation = [
    check('password', 'El password es obligatorio y debe ser mas de 8 letras').isLength({ min: 8 }),
    check('email', 'El email no es valido').isEmail(),
    check('email',).custom(async (email) => {
        const existEmail = await db.User.findOne({ where: { email } });
        if ( existEmail ) {
            throw new Error(`el correo: ${ email }, ya esta registrado`)
        }
    })
];


module.exports = validation;
