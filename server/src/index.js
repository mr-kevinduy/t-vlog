import express from 'express';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import Logger from './middlewares/logger';

import { appConfig, servicesConfig, dbConfig } from './config';
import routes from './routes';

const isProduction = appConfig.env === 'production';

// Connect db
mongoose.connect(`${dbConfig.driver}://${dbConfig.url}:${dbConfig.port}/${dbConfig.name}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

if (!isProduction) {
  mongoose.set('debug', true);
}

// Passport configs
passport.use(passportMiddleware);

// Start app
const app = express();

// setup the logger
const httpLogger = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream: {
      write: message => Logger.info(message.substring(0, message.lastIndexOf('\n')))
    }
  }
);

app.use(httpLogger);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '../public')));
app.use(servicesConfig.api.endPoint, routes);

// Render with all routes.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const server = app.listen(servicesConfig.api.port, () => {
  Logger.info(`Server listening on port ${server.address().port}`);
  console.log(`Server is running on port ${server.address().port}`);
});
