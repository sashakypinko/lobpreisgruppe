import createBasicRoutes from '#modules/routing/RouteCreator';
import AuthorizationCheck from '#modules/authorization/AuthorizationCheck';

import SystemController from './SystemController';

const SystemRoutes = createBasicRoutes(
  {
    prefix: '/system',
    routeData: [
      {
        method: 'post',
        path: '/getCertExpireDate',
        authentication: true,
        authorization: AuthorizationCheck.isAdmin,
        handler: SystemController.getCertExpireDate,
      },
    ],
  },
);

export default SystemRoutes;
