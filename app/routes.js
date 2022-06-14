
const { controller } = require('./controllers/apiJokeController');
const { healthCheck } = require('./controllers/healthCheck');
const { loginController } = require('./controllers/loginController');
const { userController } = require('./controllers/userController');
const { validarCampos } = require('./middlewares/validar-campos');
const { check } = require('express-validator');

const  validation  = require('./middlewares/validation');
const { validarJWT } = require('./middlewares/validar-jwt');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/api/joke', controller.methodGET);

  app.post('/api/create/user',validation,validarCampos, userController.methodPOST);
  app.post('/users/sessions',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
  ],loginController .methodPOST);

  app.get('/api/users',validarJWT, userController.methodGET);

  // app.put('/endpoint/put/path', [], controller.methodPUT);
};
