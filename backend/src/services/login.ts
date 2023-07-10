import bcrypt from 'bcrypt';
import { isNewUser } from '../utils/types';
import models from '../models';
import { ErrorWithStatus } from '../utils/error-handler';

export const validateLoginAndReturnId = async (user: object) => {
  if (!isNewUser(user)) {
    throw new ErrorWithStatus('User validation failed', 400);
  }

  if (!user.username || !user.password) {
    throw new ErrorWithStatus('Username or password is null', 400);
  }

  const existingUser = await models.UserModel.findOne({
    where: { username: user.username },
  });

  if (!existingUser) {
    throw new ErrorWithStatus(`User '${user.username}' not found`, 404);
  }

  const correctPassword = await bcrypt.compare(
    user.password,
    existingUser.passwordHash
  );

  if (!correctPassword) {
    throw new ErrorWithStatus('Incorrect password', 401);
  }

  return existingUser.id;
};
