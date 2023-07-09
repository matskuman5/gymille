import { NextFunction, Request, Response } from 'express';

export class ErrorWithStatus extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error | ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};
