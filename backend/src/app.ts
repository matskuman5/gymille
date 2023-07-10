import express from 'express';
import cors from 'cors';
import { logRequests } from './utils/logging';
import pingRouter from './routers/ping';
import sessionRouter from './routers/session';
import { NODE_ENV } from './utils/config';
import sessionTemplateRouter from './routers/session-templates';
import { sessionMiddleware } from './utils/db';
import userRouter from './routers/users';
import loginRouter from './routers/login';
import logoutRouter from './routers/logout';
import { errorHandler } from './utils/error-handler';
import userSessionsRouter from './routers/user-sessions';

export const app = express();
app.use(express.json());

let corsUrl;

switch (NODE_ENV) {
  case 'development':
    corsUrl = 'http://localhost:5173';
    break;
  case 'production':
    corsUrl = 'https://gymille-frontend.fly.dev';
    app.set('trust proxy', 1);
    break;
  case 'test':
    corsUrl = 'http://localhost:5173';
    break;
  default:
    throw new Error(`NODE_ENV '${NODE_ENV}' not supported`);
}

app.use(
  cors({
    origin: corsUrl,
    credentials: true,
  })
);

app.use(logRequests);
app.use(sessionMiddleware);

app.use('/ping', pingRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/session-templates', sessionTemplateRouter);
app.use('/api/users', userRouter);
app.use('/api/users', userSessionsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

app.use(errorHandler);
