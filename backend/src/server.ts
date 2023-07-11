import { app } from './app';
import { PORT, NODE_ENV } from './utils/config';
import { connectToPostgres, connectToRedis } from './utils/db';
import { logger } from './utils/logging';
import { resetMigrations, seedData } from './utils/umzug';

app.listen(PORT, async () => {
  logger.info(
    `Starting server in ${NODE_ENV} mode in working directory ${process.cwd()}`
  );
  await connectToPostgres();
  await connectToRedis();

  await resetMigrations();
  await seedData();

  logger.info(`Startup finished, server listening on port ${PORT}`);
});
