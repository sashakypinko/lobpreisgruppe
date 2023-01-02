const UserController = {
  async checkUserSession(ctx) {
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async signUp(ctx) {
    try {
      await ctx.libS.users.add(ctx.state.user);

      return ctx.modS.responses.createSuccessResponse(ctx);
    } catch (err) {
      console.log(err)
      if (err.code === 11000) {
        return ctx.modS.responses.createErrorResponse(
          ctx,
          ctx.modS.responses.CustomErrors.USER_ALREADY_EXISTS,
        );
      }
      if (err.code === 121) {
        return ctx.modS.responses.createErrorResponse(
          ctx,
          ctx.modS.responses.CustomErrors.USER_NOT_VALID,
        );
      }
      return ctx.modS.responses.createErrorResponse(
        ctx,
        ctx.modS.responses.CustomErrors.BAD_REQUEST,
      );
    }
  },

  async login(ctx) {
    const { user } = ctx.state;

    const preparedAuthSession = ctx.libS.authentications.helpers.prepareAuthenticationSession(
      ctx.libS.users.getIdAsString(user),
      ctx,
    );

    try {
      const token = await ctx.libS.authentications.add(preparedAuthSession);
      const userHash = ctx.modS.string.createHash(user.updatedAt);

      return ctx.modS.responses.createSuccessResponse(ctx, {
        token,
        _id: user._id,
        roles: user.roles,
        profile: user.profile,
        credentials: user.credentials?.default,
        visibleRegions: user.credentials?.visibleRegions,
        isMainDealer: user.credentials?.isMainDealer,
        userHash,
      });
    } catch (err) {
      return ctx.modS.responses.createErrorResponse(
        ctx,
        ctx.modS.responses.CustomErrors.BAD_REQUEST,
      );
    }
  },

  async logout(ctx) {
    if (ctx.privateState.logoutUser) {
      await ctx.privateState.logoutUser();
    }
    return ctx.modS.responses.createSuccessResponse(ctx);
  },
};

export default UserController;
