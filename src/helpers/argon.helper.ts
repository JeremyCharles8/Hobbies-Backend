import * as argon from 'argon2';

export default {
  async hashFunc(password: string): Promise<string> {
    return argon.hash(password);
  },

  async compareFunc(password: string, pwToValidate: string): Promise<boolean> {
    return argon.verify(password, pwToValidate);
  },
};
