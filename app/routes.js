
const { controller } = require('./controllers/apiJokeController');
const { healthCheck } = require('./controllers/healthCheck');
const { validarCampos } = require('./middlewares/validar-campos');
const  validation  = require('./middlewares/validation');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/api/joke', controller.methodGET);
  app.post('/api/create/user',validation,validarCampos, controller.methodPOST);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
};
