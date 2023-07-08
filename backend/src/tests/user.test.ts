import { addUser } from '../services/users';

describe('user validation', () => {
  test('throws correct error if user object malformed', async () => {
    await expect(addUser({ malformed1: false, malformed2: 5 })).rejects.toThrow(
      'User validation failed'
    );
  });

  test('throws correct error if username null', async () => {
    await expect(addUser({ username: '', password: 'secret' })).rejects.toThrow(
      'Username or password is null'
    );
  });
});
