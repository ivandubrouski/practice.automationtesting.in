import routes from '../../utils/routes.utils';
import { ENVS } from '../../utils/env.utils';

const registerData = {
  firstName: 'test first name',
  lastName: 'test last name',
  email: `ivan${Date.now()}@gmail.com`,
  invalidEmail: 'qwe.com',
  password: '123456789Ivan123123',
  passwordHard: 'd,i9-2 322cxr-.*&%$!'
};

const register = {
  invalidEmail: 'qwe.com',
  email: `ivan${Date.now()}@gmail.com`,
  password: '123456789Ivan',
  ENVS: ENVS.staging
};

export default {
  registerData,
  register
};
