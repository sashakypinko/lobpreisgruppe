import createBasicRoutes from '#modules/routing/RouteCreator';
import AuthorizationCheck from '#modules/authorization/AuthorizationCheck';

import SongController from './SongController.js';
import SongValidations from '../services/SongValidations.js';

const SongRoutes = createBasicRoutes(
  {
    prefix: '/songs',
    routeData: [
      {
        method: 'post',
        path: '/getByQuery',
        authentication: true,
        validation: SongValidations.validateGetByQuery,
        handler: SongController.getByQuery,
      },
      {
        method: 'post',
        path: '/getById',
        authentication: true,
        validation: SongValidations.validateGetById,
        handler: SongController.getById,
      },
      {
        method: 'post',
        path: '/create',
        authentication: true,
        validation: SongValidations.validateCreate,
        handler: SongController.create,
      },
      {
        method: 'post',
        path: '/update',
        authentication: true,
        validation: SongValidations.validateUpdate,
        handler: SongController.update,
      },
      {
        method: 'post',
        path: '/remove',
        authentication: true,
        validation: SongValidations.validateRemove,
        handler: SongController.remove,
      },
      {
        method: 'post',
        path: '/updateRating',
        authentication: true,
        validation: SongValidations.validateUpdateRating,
        handler: SongController.updateRating,
      },
    ],
  },
);

export default SongRoutes;
