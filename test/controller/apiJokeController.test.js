const apiJokeController = require('../controllers/apiJokeController');


describe('methodGet', () => {
    test('should return a json with a joke', async () => {
        const response = await apiJokeController.methodGET();
        expect(response.status).toBe(200);
        expect(response.body.joke).toBeDefined();
    })

})
describe('methodPOST', () => {
    test('should return a json with a user', async () => {
        const response = await apiJokeController.methodPOST({
            name: 'test',
            email: 'test@test.com',
            password: '12345678'
        });
        expect(response.status).toBe(201);
        expect(response.body.user).toBeDefined();
    })
})

describe('methodPOST'), () => {
    test('debe retornar el error al mandar mal un password',async() => {
        const response = await apiJokeController.methodPOST({
            name: 'test',
            email: 'test@test.com',
            password: '1234567'
        });
        expect (response.status).toBe(400);
        expect (response.errors[0].msg).toBe('El password es obligatorio y debe ser mas de 8 letras');
    })

}
