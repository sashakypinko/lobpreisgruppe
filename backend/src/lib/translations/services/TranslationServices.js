import ServicesBase from '#lib/base/services/ServicesBase';

import TranslationHelpers from './TranslationHelpers';

class TranslationServices extends ServicesBase {
  helpers = {
    ...super.getHelpers(),
    ...TranslationHelpers,
  };

  publicParams = {};
}

export default TranslationServices;
