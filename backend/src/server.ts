import { app } from './app';
import models from './models';
import { addDummySessions } from './tests/dummy';
import { PORT, NODE_ENV } from './utils/config';
import { connectToPostgres, connectToRedis } from './utils/db';
import { logger } from './utils/logging';

app.listen(PORT, async () => {
  logger.info(`Starting server in mode: ${NODE_ENV}`);
  await connectToPostgres();
  await models.setupModels();
  await addDummySessions();
  await connectToRedis();
  logger.info(`Startup finished, server listening on port ${PORT}`);
});
