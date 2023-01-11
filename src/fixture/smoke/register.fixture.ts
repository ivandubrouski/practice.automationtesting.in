const registerData = {
  firstName: 'test first name',
  lastName: 'test last name',
  email: `ivan${Date.now()}@gmail.com`,
  invalidEmail: 'qwe.com',
  password: '123456789Ivan123123'
};

const inputsID = {
  emailInput: '#reg_email',
  passwordInput: '#reg_password'
};

export default {
  registerData,
  inputsID
};
