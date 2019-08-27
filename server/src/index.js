import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { appConfig, servicesConfig, dbConfig } from './config';
import routes from './routes';

const isProduction = appConfig.env === 'production';

// Connect db
mongoose.connect(`${dbConfig.driver}://${dbConfig.url}:${dbConfig.port}/${dbConfig.name}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

if (!isProduction) {
  mongoose.set('debug', true);
}


// Start app
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '../public')));
app.use(servicesConfig.api.endPoint, routes);

// Render with all routes.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const server = app.listen(servicesConfig.api.port, () => console.log(`Server is running on port ${server.address().port}`));
