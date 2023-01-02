import PraiseSchema from './schema/PraiseSchema.js';
import PraiseEnums from './enums/PraiseEnums.js';

const setupCollection = async (mongoDb, createCollection) => {
  await createCollection(mongoDb, PraiseEnums.COLLECTION_NAME, PraiseSchema);
};

export default setupCollection;
