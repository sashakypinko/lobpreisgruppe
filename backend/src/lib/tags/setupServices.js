import TagServices from './services/TagServices.js';
import TagEnums from './enums/TagEnums.js';

/**
 * @param  {object} ctx
 *
 * @return {{ translations: TagServices }}
 *
 */
const setupServices = ctx => {
  const { db } = ctx;
  const collection = db[TagEnums.COLLECTION_NAME];

  // noinspection JSValidateTypes
  return {
    [TagEnums.COLLECTION_NAME]: new TagServices(collection),
  };
};

export default setupServices;
