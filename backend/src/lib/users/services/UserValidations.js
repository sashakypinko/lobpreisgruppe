import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

import UserSchemaFields from '../schema/UserSchemaFields';
import { UserStatuses } from '../enums/UserEnums';
import UserSchema from '../schema/UserSchema';

const canUserLogin = (ctx, user) => {
  const { services } = user;
  const { security } = services || {};
  const { loginAttempts = 0, lastLoginAttempt } = security || {};
  const {
    CustomErrors,
    createErrorResponse,
  } = ctx.modS.responses;
  if (loginAttempts > 4 && ctx.modS.date.getBefore({ minutes: 15 }) < lastLoginAttempt) {
    return createErrorResponse(ctx, CustomErrors.USER_LOGIN_ATTEMPT_EXCEEDED);
  }
  return true;
};

const UserValidations = {
  async validateSignUp(ctx) {
    const { email, password } = ctx.request.body;
    const { validateSchema } = ctx.modS.validations;

    validateSchema(ctx, { email, password }, {
      bsonType: 'object',
      required: ['email', 'password'],
      properties: {
        email: UserSchemaFields.email,
        password: UserSchemaFields.password,
      },
    });

    const existingUserPromise = ctx.libS.users.findOne({
        'email.address': email,
    });

    const { createValidateError, CustomErrors } = ctx.modS.responses;

    const [user] = await Promise.all([existingUserPromise]);

    createValidateError(
      !user,
      ctx,
      CustomErrors.USER_ALREADY_EXISTS,
    );

    createValidateError(
      ctx,
      CustomErrors.WRONG_DEALER_DETAILS,
    );

    ctx.state.user = await ctx.libS.users.helpers.onBoarding.prepareUser({
      ctx,
      email,
      password,
    });

    ctx.modS.validations.validateSchema(ctx, ctx.state.user, UserSchema);

    return true;
  },

  async validateLogin(ctx) {
    const { email, password } = ctx.request.body;

    ctx.modS.validations.validateSchema(ctx, { email, password }, {
      bsonType: 'object',
      required: ['email', 'password'],
      properties: {
        email: CommonSchemaFields.basicString,
        password: CommonSchemaFields.basicString,
      },
    });

    const user = await ctx.libS.users.getByEmail(email, {});

    ctx.modS.responses.createValidateError(
      user,
      ctx,
      ctx.modS.responses.CustomErrors.USER_WRONG_LOGIN_CREDENTIALS,
    );

    ctx.modS.responses.createValidateError(
      user.email.verified,
      ctx,
      ctx.modS.responses.CustomErrors.USER_NOT_VERIFIED,
    );

    ctx.modS.responses.createValidateError(
      user.status === UserStatuses.ACTIVE,
      ctx,
      ctx.modS.responses.CustomErrors.USER_NOT_ALLOWED,
    );

    canUserLogin(ctx, user);

    const checkPassword = await ctx.libS.users.helpers.checkPassword(user, password);
    if (!checkPassword) {
      await ctx.libS.users.updateLoginAttempts(user);
      ctx.modS.responses.createErrorResponse(
        ctx,
        ctx.modS.responses.CustomErrors.USER_WRONG_LOGIN_CREDENTIALS,
      );
    }
    await ctx.libS.users.resetLoginAttempts(user);
    ctx.state.user = user;
    return true;
  },
};

export default UserValidations;
