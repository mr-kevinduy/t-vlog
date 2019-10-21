import { createLogger, transports, format } from 'winston';
import { appConfig } from '../config';

let nowDate = (new Date()).toISOString().slice(0,10);

var options = {
  file: {
    level: 'info',
    filename: `${appConfig.path.logs}/app-${nowDate}.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default Logger;
