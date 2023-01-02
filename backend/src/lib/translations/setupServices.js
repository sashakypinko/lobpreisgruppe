import TranslationServices from './services/TranslationServices';
import TranslationEnums from './enums/TranslationEnums';

/**
 * @param  {object} ctx
 *
 * @return {{ translations: TranslationServices }}
 *
 */
const setupServices = ctx => {
  const { db } = ctx;
  const collection = db[TranslationEnums.COLLECTION_NAME];

  // noinspection JSValidateTypes
  return {
    [TranslationEnums.COLLECTION_NAME]: new TranslationServices(collection),
  };
};

export default setupServices;
