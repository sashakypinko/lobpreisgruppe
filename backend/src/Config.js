import Users from '#lib/users/Users';
import Authentications from '#lib/authentications/Authentications';
import {
  createErrorResponse,
  createSuccessResponse,
  createValidateError,
} from '#modules/responseHandler/responses';
import Validations from '#modules/validation/Validations';
import CustomErrors from '#modules/responseHandler/CustomErrors';
import string from '#modules/helpers/StringHelper';
import date from '#modules/helpers/DateHelper';
import DatabaseHelpers from '#modules/db/DatabaseHelpers';
import AuthorizationCheck from '#modules/authorization/AuthorizationCheck';
import Translations from '#lib/translations/Translations';
import Songs from '#lib/songs/Songs';
import Tags from '#lib/tags/Tags';
import Praises from '#lib/praises/Praises';

export const Config = {
  // All collections need to be stored here
  collections: [
    Users,
    Authentications,
    Translations,
    Songs,
    Tags,
    Praises,
  ],

  // All collections services need to be setup here
  setupLibs(ctx) {
    const { users } = Users.setupServices(ctx);
    const { authentications } = Authentications.setupServices(ctx);
    const { translations } = Translations.setupServices(ctx);
    const { songs } = Songs.setupServices(ctx);
    const { tags } = Tags.setupServices(ctx);
    const { praises } = Praises.setupServices(ctx);

    return {
      users,
      authentications,
      translations,
      songs,
      tags,
      praises,
    };
  },

  // All modules services need to be setup here
  setupMods() {
    return {
      authorizationCheck: AuthorizationCheck,
      validations: Validations,
      responses: {
        createSuccessResponse,
        createErrorResponse,
        createValidateError,
        CustomErrors,
      },
      string,
      date,
      db: DatabaseHelpers,
    };
  },
};

export default { Config };
