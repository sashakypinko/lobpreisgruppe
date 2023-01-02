import get from 'lodash-es/get';

import StringHelper from '#modules/helpers/StringHelper';

const UserHelpers = {
  getEmail(user) {
    return get(user, 'email.address', '');
  },

  getFirstName(user, fallback = '') {
    return get(user, 'profile.name.first', fallback);
  },

  getLastName(user, fallback = '') {
    return get(user, 'profile.name.last', fallback);
  },

  getFullNames(user, fallback = '') {
    if (!user) {
      return fallback;
    }
    const firstName = UserHelpers.getFirstName(user, fallback);
    const lastName = UserHelpers.getLastName(user, fallback);
    if (!firstName && !lastName) return '';
    return `${firstName} ${lastName}`;
  },

  getVerificationToken(user) {
    return user?.services?.email?.verificationTokens[0]?.token || null;
  },

  getPasswordBcrypt(user) {
    return user?.services?.password?.bcrypt || null;
  },

  async checkPassword(user, password) {
    const bcryptHash = UserHelpers.getPasswordBcrypt(user);
    if (bcryptHash) return StringHelper.compareBcrypt(password, bcryptHash);
    return false;
  },
};

export default UserHelpers;
