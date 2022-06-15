

const { check } = require('express-validator');
const userDAO = require('../services/userDAO');


exports.validation = [
    check('password', 'El password es obligatorio y debe ser mas de 8 letras').isLength({ min: 8 }),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(async (email) => {
        const existEmail = await userDAO.getUser(email);
        if (existEmail) {
            throw new Error(`el correo: ${email}, ya esta registrado`)
        }
    }),
    check('email').custom((email)=>{
        const withDomain = email.split('@');
        
        if(withDomain[1] != 'wolox.com'){
            throw new Error(`El correo: ${email}, no es de wolox.com`)
        }
        return email

    })
];

exports.validationSignIn = [

    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
]



