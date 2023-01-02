import SongServices from './services/SongServices.js';
import SongEnums from './enums/SongEnums.js';

/**
 * @param  {object} ctx
 *
 * @return {{ translations: SongServices }}
 *
 */
const setupServices = ctx => {
  const { db } = ctx;
  const collection = db[SongEnums.COLLECTION_NAME];

  // noinspection JSValidateTypes
  return {
    [SongEnums.COLLECTION_NAME]: new SongServices(collection),
  };
};

export default setupServices;
