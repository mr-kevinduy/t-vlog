// yarn add express body-parser cookie-parser compression
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import * as serverConfig from './config';
import loader from './loader';

const app = express();

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
// app.use(cookieParser);

// Set up homepage, static assets, and capture everything else
app.use(express.Router().get('/', loader));
app.use(express.static(serverConfig.STATIC_DIR));
app.use(loader);

app.listen(serverConfig.PORT, () => console.log(`Server is running on localhost:${serverConfig.PORT}`));

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof serverConfig.PORT === 'string' ? 'Pipe ' + serverConfig.PORT : 'Port ' + serverConfig.PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
