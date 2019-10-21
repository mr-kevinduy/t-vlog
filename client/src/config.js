import dotenv from 'dotenv';

dotenv.config();

export default {
  api: process.env.API || 'http://localhost'
};
