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

export const app = express();
app.use(express.json());

let corsUrl;

switch (NODE_ENV) {
  case 'development':
    corsUrl = 'http://localhost:5173';
    break;
  case 'production':
    corsUrl = 'https://gymille-frontend.fly.dev';
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
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
