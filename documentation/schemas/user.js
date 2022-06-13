module.exports = {

  firstName: {
    type: 'string',
    example: 'Andres'
  },
  LastName: {
    type: 'string',
    example: 'Murgo'
  },
  email: {
    type: 'string',
    example: 'tom.engels@wolox.com.ar'
  },
  password: {
    type: 'string',
    example: '12345678'
  },
  User: {
    type: 'object',
    properties: {

      firstName: {
        type: 'string',
        example: 'Andres'
      },
      LastName: {
        type: 'string',
        example: 'Murgo'
      },
      email: {
        type: 'string',
        example: 'andresmurgo@gmail.com'
      },
      password: {
        type: 'string',
        example: '12345678'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
