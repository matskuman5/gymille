import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isNewUser } from '../utils/types';
import models from '../models';
import { JWT_SECRET } from '../utils/config';

export const login = async (user: object) => {
  if (!isNewUser(user)) {
    throw new Error('User validation failed');
  }

  const existingUser = await models.UserModel.findOne({
    where: { username: user.username },
  });

  if (!existingUser) {
    throw new Error(`User ${user.username} not found`);
  }

  const correctPassword = await bcrypt.compare(
    user.password,
    existingUser.passwordHash
  );

  if (!correctPassword) {
    throw new Error('Incorrect password');
  }

  return jwt.sign(user, JWT_SECRET);
};
