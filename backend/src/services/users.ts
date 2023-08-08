import bcrypt from 'bcrypt';
import models from '../models';
import { isNewUser } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';
import { ErrorWithStatus } from '../utils/error-handler';

export const addUser = async (newUser: object) => {
  if (!isNewUser(newUser)) {
    throw new ErrorWithStatus('User validation failed', 400);
  }

  if (!newUser.username || !newUser.password) {
    throw new ErrorWithStatus('Username or password is null', 400);
  }

  const existingUser = await models.UserModel.findOne({
    where: { username: newUser.username },
  });

  if (existingUser) {
    throw new ErrorWithStatus(
      `Username '${newUser.username}' already used`,
      409
    );
  }

  const passwordHash = await bcrypt.hash(newUser.password, 10);

  await models.UserModel.create({
    id: uuidv4(),
    username: newUser.username,
    passwordHash: passwordHash,
  });
};

export const updatePassword = async (userId: string, newPassword: string) => {
  const user = await models.UserModel.findOne({
    where: { id: userId },
  });

  if (user === null) {
    throw new ErrorWithStatus('User not found', 404);
  }

  if (newPassword === null) {
    throw new ErrorWithStatus('Password is null', 400);
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  user.set({ passwordHash: newHash });
  user.save();
};
