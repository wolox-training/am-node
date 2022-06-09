const { User } = require("../models/user");


const emailExist = async (email='') => {

    console.log(email);
    
    const existEmail = await User.findOne({where:{email}});
    console.loge('----',existEmail);
    
    if ( existEmail ) {
        throw new Error(`el email: ${ email }, ya esta registrado`)
    }
    return existEmail;
   
}

module.exports = {
    emailExist
}