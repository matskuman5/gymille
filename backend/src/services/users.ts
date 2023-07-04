import bcrypt from 'bcrypt';
import models from '../models';
import { isNewUser } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const addUser = async (newUser: object) => {
  if (!isNewUser(newUser)) {
    console.log(newUser);
    throw new Error('User validation failed');
  }

  const passwordHash = await bcrypt.hash(newUser.password, 10);

  await models.UserModel.create({
    id: uuidv4(),
    username: newUser.username,
    passwordHash: passwordHash,
  });
};
