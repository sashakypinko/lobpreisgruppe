import createBasicRoutes from '#modules/routing/RouteCreator';

import TagController from './TagController.js';
import TagValidations from '../services/TagValidations.js';

const TagRoutes = createBasicRoutes(
  {
    prefix: '/tags',
    routeData: [
      {
        method: 'post',
        path: '/all',
        authentication: true,
        handler: TagController.getAll,
      },
      {
        method: 'post',
        path: '/getById',
        authentication: true,
        validation: TagValidations.validateGetById,
        handler: TagController.getById,
      },
      {
        method: 'post',
        path: '/create',
        authentication: true,
        validation: TagValidations.validateCreate,
        handler: TagController.create,
      },
      {
        method: 'post',
        path: '/update',
        authentication: true,
        validation: TagValidations.validateUpdate,
        handler: TagController.update,
      },
      {
        method: 'post',
        path: '/remove',
        authentication: true,
        validation: TagValidations.validateRemove,
        handler: TagController.remove,
      },
    ],
  },
);

export default TagRoutes;
