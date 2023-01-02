import createBasicRoutes from '#modules/routing/RouteCreator';

import PraiseController from './PraiseController.js';
import PraiseValidations from '../services/PraiseValidations.js';

const PraiseRoutes = createBasicRoutes(
  {
    prefix: '/praises',
    routeData: [
      {
        method: 'post',
        path: '/getByQuery',
        authentication: true,
        handler: PraiseController.getByQuery,
      },
      {
        method: 'post',
        path: '/getByDate',
        authentication: true,
        validation: PraiseValidations.validateGetByDate,
        handler: PraiseController.getByDate,
      },
      {
        method: 'post',
        path: '/update',
        authentication: true,
        validation: PraiseValidations.validateUpdate,
        handler: PraiseController.update,
      },
      {
        method: 'post',
        path: '/confirm',
        authentication: true,
        validation: PraiseValidations.validateExistingById,
        handler: PraiseController.confirm,
      },
      {
        method: 'post',
        path: '/remove',
        authentication: true,
        validation: PraiseValidations.validateExistingById,
        handler: PraiseController.remove,
      },
    ],
  },
);

export default PraiseRoutes;
