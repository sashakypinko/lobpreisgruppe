import createBasicRoutes from '#modules/routing/RouteCreator';
import AuthorizationCheck from '#modules/authorization/AuthorizationCheck';

import TranslationController from './TranslationController';
import TranslationValidations from '../services/TranslationValidations';

const TranslationRoutes = createBasicRoutes(
  {
    prefix: '/translations',
    routeData: [
      {
        method: 'post',
        path: '/all',
        authentication: true,
        authorization: AuthorizationCheck.isAdmin,
        handler: TranslationController.getAll,
      },
      {
        method: 'post',
        path: '/getLanguageList',
        handler: TranslationController.getList,
      },
      {
        method: 'post',
        path: '/getById',
        authentication: true,
        authorization: AuthorizationCheck.isAdmin,
        validation: TranslationValidations.validateGetById,
        handler: TranslationController.getById,
      },
      {
        method: 'post',
        path: '/getByLanguage',
        validation: TranslationValidations.validateGetByLanguage,
        handler: TranslationController.getByLanguage,
      },
      {
        method: 'post',
        path: '/create',
        authentication: true,
        authorization: AuthorizationCheck.isAdmin,
        validation: TranslationValidations.validateCreate,
        handler: TranslationController.create,
      },
      {
        method: 'post',
        path: '/update',
        authentication: true,
        authorization: AuthorizationCheck.isAdmin,
        validation: TranslationValidations.validateUpdate,
        handler: TranslationController.update,
      },
      {
        method: 'post',
        path: '/remove',
        authentication: true,
        authorization: AuthorizationCheck.isAdmin,
        validation: TranslationValidations.validateRemove,
        handler: TranslationController.remove,
      },
    ],
  },
);

export default TranslationRoutes;
