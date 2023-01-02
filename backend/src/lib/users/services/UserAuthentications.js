import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

const UserAuthentications = {
  async isUserAuthenticated(ctx) {
    const { user } = ctx.privateState;
    return !!user;
  },

  async logoutUser(ctx, token) {
    try {
      if (token) {
        await ctx.libS.authentications.deactivateAuthentication(token);
      }
    } catch (realError) {
      return ctx.modS.responses.createErrorResponse(
        ctx,
        ctx.modS.responses.CustomErrors.BAD_REQUEST,
        { realError },
      );
    }
  },

  getRequestToken(request) {
    const { header } = request;
    const headerKey = 'Bearer';
    let token;

    if (header?.authorization) {
      const parts = header.authorization.split(' ');
      if (parts.length === 2 && parts[0] === headerKey) {
        token = parts.pop();
      }
    }

    return token;
  },

  async setupAuthentication(ctx) {
    const token = this.getRequestToken(ctx.request);

    if (token) {
      ctx.modS.validations.validateSchema(ctx, {
        token,
      }, {
        bsonType: 'object',
        required: ['token'],
        additionalProperties: false,
        properties: {
          token: CommonSchemaFields._idString,
        },
      });

      const userPromise = ctx.libS.authentications.getActiveUserByToken(ctx, token);

      const [user = null] = await Promise.all([userPromise]);

      if (user) {
        ctx.privateState.user = user;

        ctx.privateState.logoutUser = () => UserAuthentications.logoutUser(ctx, token);


        const { body = {} } = ctx.request;
        const { userHash = '' } = body;
        const newUserHash = ctx.modS.string.createHash(user.updatedAt);

        if (userHash && userHash !== newUserHash) {
          ctx.state.newUserData = {
            roles: user.roles,
            language: user.settings.language,
            profile: user.profile,
            updatedAt: user.updatedAt,
            userHash: newUserHash,
          };
        }
      } else {
        await UserAuthentications.logoutUser(ctx, token);
      }
    }
  },
};

export default UserAuthentications;
