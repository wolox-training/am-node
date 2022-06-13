module.exports = {
  '/api/create/user': {

    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'New user was created'
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                "errors": [
                  {
                      "value": "andres1gmail.com",
                      "msg": "El email no es valido",
                      "param": "email",
                      "location": "body"
                  }
              ]
              }
            }
          }
        }
      }
    }
  }
};
