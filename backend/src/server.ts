import { app } from './app';
import { PORT, NODE_ENV } from './utils/config';
import { connectToPostgres, connectToRedis } from './utils/db';
import { logger } from './utils/logging';
import { migrator, seeder } from './utils/umzug';

app.listen(PORT, async () => {
  logger.info(`Starting server in mode: ${NODE_ENV}`);
  await connectToPostgres();
  await connectToRedis();

  const migrations = await migrator.pending();
  console.log(migrations);

  await migrator.down({ to: 0 });
  await migrator.up();

  await seeder.down({ to: 0 });
  await seeder.up();

  logger.info(`Startup finished, server listening on port ${PORT}`);
});
