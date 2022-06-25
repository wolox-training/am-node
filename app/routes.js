
const { healthCheck } = require('./controllers/healthCheck');
const { loginController } = require('./controllers/loginController');
const { userController } = require('./controllers/userController');
const { validarCampos } = require('./middlewares/validar-campos');
const { validation, validationQuality } = require('./middlewares/validation');
const { validationSignIn } = require('./middlewares/validation');
const { validarJWT } = require('./middlewares/validar-jwt');
const { tieneRole } = require('./middlewares/validar-roles');
const { weetController } = require('./controllers/weetController');
const { qualityController } = require('./controllers/qualityController');
const { requiresAuth } = require('express-openid-connect');



exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/api/users', validarJWT, userController.allUser);
  app.post('/api/create/user', validation, validarCampos, userController.signUp);
  app.get('/users/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

  app.post('/users/sessions', validationSignIn, validarCampos, loginController.signIn);
  app.post('/users/sessions/invalidate_all', validarJWT, loginController.destroySession);
  app.post('/admin/users', validationSignIn, validarCampos, loginController.signInAdmin);
  app.post('/weets', validarJWT, tieneRole('admin'), validarCampos, weetController.createWeet);
  app.get('/weets', validarJWT, weetController.allWeets);
  app.post('/weets/:id/ratings',validarJWT,validationQuality,validarCampos, qualityController.create)

};
