
const { controller } = require('./controllers/apiJokeController');
const { healthCheck } = require('./controllers/healthCheck');
const { loginController } = require('./controllers/loginController');
const { userController } = require('./controllers/userController');
const { validarCampos } = require('./middlewares/validar-campos');


const  {validation}  = require('./middlewares/validation');
const  {validationSignIn}  = require('./middlewares/validation');
const { validarJWT } = require('./middlewares/validar-jwt');
const { tieneRole } = require('./middlewares/validar-roles');


exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/api/joke', controller.methodGET);
  app.get('/api/users',validarJWT, userController.allUser);
  app.post('/api/create/user',validation,validarCampos, userController.signUp);
  app.post('/users/sessions',validationSignIn,validarCampos,loginController.signIn);
  app.post('/admin/users',validarJWT,tieneRole('admin'), validationSignIn,validarCampos,loginController.signInAdmin);



  // app.put('/endpoint/put/path', [], controller.methodPUT);
};
