import { UserRoles, UserStatuses } from '../enums/UserEnums';

const OnBoardingServices = {
  async prepareUser({
    email,
    password,
    language,
    verified = false,
    verificationTokens,
    ctx,
  }) {
    return {
      email: {
        address: email,
        verified,
      },
      services: {
        password: {
          bcrypt: await ctx.modS.string.generateBcrypt(password),
        },
        email: {
          verificationTokens: verificationTokens || [
            {
              createdAt: ctx.modS.date.getNow(),
              token: ctx.modS.string.generateToken(32),
            },
          ],
        },
      },
      status: UserStatuses.ACTIVE,
      roles: [UserRoles.USER],
      settings: {
        language: language || 'de',
      },
      updatedAt: ctx.modS.date.getNow(),
      createdAt: ctx.modS.date.getNow(),
    };
  },
};

export default OnBoardingServices;
