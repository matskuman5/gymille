import bunyan from 'bunyan';
import prettystream from 'bunyan-prettystream';

const prettyStream = new prettystream();
prettyStream.pipe(process.stdout);

const logger = bunyan.createLogger({
  name: 'gymille-backend',
  stream: prettyStream,
});

export default logger;
