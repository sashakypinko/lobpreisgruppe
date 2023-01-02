import createBasicRoutes from '#modules/routing/RouteCreator';
import AuthorizationCheck from '#modules/authorization/AuthorizationCheck';

import UserController from './UserController';
import UserValidations from '../services/UserValidations';

const UserRoutes = createBasicRoutes(
  {
    prefix: '/users',
    routeData: [
      {
        method: 'post',
        path: '/checkSession',
        authentication: true,
        handler: UserController.checkUserSession,
      },
      {
        method: 'post',
        path: '/signUp',
        validation: UserValidations.validateSignUp,
        handler: UserController.signUp,
      },
      {
        method: 'post',
        path: '/login',
        validation: UserValidations.validateLogin,
        handler: UserController.login,
      },
      {
        method: 'post',
        path: '/logout',
        authentication: true,
        handler: UserController.logout,
      },
    ],
  },
);

export default UserRoutes;
