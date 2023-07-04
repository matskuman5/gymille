import bunyan from 'bunyan';
import prettystream from 'bunyan-prettystream';
import { NextFunction, Request, Response } from 'express';

const prettyStream = new prettystream();
prettyStream.pipe(process.stdout);

export const bunyanLogger = bunyan.createLogger({
  name: 'gymille-backend',
  stream: prettyStream,
});

export const logRequests = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  bunyanLogger.info(req.method, req.url);
  next();
};
