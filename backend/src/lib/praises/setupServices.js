import PraiseServices from './services/PraiseServices.js';
import PraiseEnums from './enums/PraiseEnums.js';

/**
 * @param  {object} ctx
 *
 * @return {{ translations: PraiseServices }}
 *
 */
const setupServices = ctx => {
  const { db } = ctx;
  const collection = db[PraiseEnums.COLLECTION_NAME];

  // noinspection JSValidateTypes
  return {
    [PraiseEnums.COLLECTION_NAME]: new PraiseServices(collection),
  };
};

export default setupServices;
