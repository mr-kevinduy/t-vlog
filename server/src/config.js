import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    name: process.env.APP_NAME || 'Server Demo',
    env: process.env.APP_ENV || 'production',
    timezone: process.env.TIMEZONE || 'UTC',
    locale: process.env.I18N_LOCALE || 'vi',
    fallbackLocale: process.env.I18N_FALLBACK_LOCALE || 'en'
  },
  client: {
    host: process.env.CLIENT_HOST || 'http://localhost:3000',
    port: process.env.CLIENT_PORT || 3000,
    server: process.env.CLIENT_PORT || 8080
  },
  services: {
    api: {
      host: process.env.SERVER_URL || 'http://localhost',
      port: process.env.SERVER_PORT || 8000,
      authSecret: process.env.JWT_SECRET || 'secretkeyhere',
      endPoint: '/api'
    },
    firebase: {
      apiKey: 'AIzaSyAkCXP3-sAbRTopcxSMHLrI-DWKclIKYHc',
      authDomain: 'tcoychain.firebaseapp.com',
      databaseURL: 'https://tcoychain.firebaseio.com',
      projectId: 'tcoychain',
      storageBucket: 'tcoychain.appspot.com',
      messagingSenderId: '762746336920'
    },
    s3: {

    },
    socketio: {

    },
    elasticsearch: {
      host: '52.1.253.106',
      port: '9200',
      log: 'trace'
    },
    mailer: {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 465,
      user: process.env.EMAIL_USER || 'mr.kevinduy@gmail.com',
      pass: process.env.EMAIL_PASS || 'dlukasynqivshozd'
    }
  },
  database: {
    driver: 'mongodb',
    url: 'db', // 'db' service in docker, default: 'localhost',
    name: 'demoreact',
    port: 27017
  },
  constants: {
    role: {
      user: 'USER',
      admin: 'ADMIN',
      editor: 'EDITOR',
      shop: 'SHOP'
    }
  }
};

export const appConfig = config.app;
export const clientConfig = config.client;
export const dbConfig = config.database;
export const servicesConfig = config.services;
export default config;
