const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onPost('/signup').reply((config) => {
  return [200, {
    success: true,
    text: 'Введенный email уже зарегистрирован.',
    validate: {
      group: '',
      name: '',
      phone: '',
      email: '',
    }
  }];
});
