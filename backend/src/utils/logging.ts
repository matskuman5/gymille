import bunyan from 'bunyan';
import prettystream from 'bunyan-prettystream';
import { NextFunction, Request, Response } from 'express';

const prettyStream = new prettystream({ mode: 'short' });
prettyStream.pipe(process.stdout);

export const logger = bunyan.createLogger({
  name: 'gymille-backend',
  stream: prettyStream,
});

export const logRequests = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  logger.info(req.method, req.url);
  next();
};
