import DateHelper from '#modules/helpers/DateHelper';
import ServicesBase from '#lib/base/services/ServicesBase';
import UserHelpers from '#lib/users/services/UserHelpers';

import OnBoardingServices from './OnBoardingServices';
import { UserStatuses } from '../enums/UserEnums';

class UserServices extends ServicesBase {
  helpers = {
    ...super.getHelpers(),
    ...UserHelpers,
    onBoarding: OnBoardingServices,
  };

  async add(newUser) {
    return this.DB.insertOne(newUser);
  }

  async getActiveById(id, params = this.publicParams) {
    const _id = this.helpers.getObjectId(id);
    if (!_id) return null;
    return this.DB.findOne({ _id, status: UserStatuses.ACTIVE }, params);
  }

  getIdAsString(user) {
    return user._id.toString();
  }

  async getAll(params = this.publicParams) {
    return this.DB.find({}, params).toArray();
  }

  async resetLoginAttempts(user) {
    return this.DB.updateOne({
      _id: user._id,
    }, {
      $set: {
        'services.security.loginAttempts': 0,
      },
    });
  }

  async getByEmail(email, params = this.publicParams) {
    return this.DB.findOne({
      $or: [
        { 'email.address': email },
      ],
    }, params);
  }

  async updateLoginAttempts(user) {
    return this.DB.updateOne({
      _id: user._id,
    }, {
      $set: {
        'services.security.lastLoginAttempt': DateHelper.getNow(),
      },
      $inc: {
        'services.security.loginAttempts': 1,
      },
    });
  }
}

export default UserServices;
