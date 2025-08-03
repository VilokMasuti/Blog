import api from './api';

const userService = {
  getProfile: () => api.get('/users/me'),
};

export default userService;
