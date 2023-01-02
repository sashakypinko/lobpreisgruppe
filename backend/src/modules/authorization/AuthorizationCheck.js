import { UserRoles } from '#lib/users/enums/UserEnums';

const AuthorizationCheck = {
  isAdmin(ctx) {
    const { user } = ctx.privateState;
    return user?.roles.includes(UserRoles.ADMIN);
  },
  isUser(ctx) {
    const { user } = ctx.privateState;
    return user?.roles.includes(UserRoles.USER);
  },
};

export default AuthorizationCheck;
