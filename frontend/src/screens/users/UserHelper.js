import get from 'lodash-es/get';

const UserHelper = {
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
    const firstName = UserHelper.getFirstName(user, fallback);
    const lastName = UserHelper.getLastName(user, fallback);
    if (!firstName && !lastName) return '';
    return `${firstName} ${lastName}`;
  },

  isVerified(user) {
    return user?.email?.verified;
  },
};

export default UserHelper;
