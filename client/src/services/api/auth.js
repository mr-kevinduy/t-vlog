import axios from 'axios';

export const registerAuth = async (username, email, password, fullname = '') => await axios.post('/api/v1/auth/register', {
  user: { username, email, password, fullname }
});

export const loginAuth = async (loginId, password) => await axios.post('/api/v1/auth/login', {
  user: { loginId, password }
});
