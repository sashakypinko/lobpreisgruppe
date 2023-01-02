import TagSchema from './schema/TagSchema.js';
import TagEnums from './enums/TagEnums.js';

const setupCollection = async (mongoDb, createCollection) => {
  await createCollection(mongoDb, TagEnums.COLLECTION_NAME, TagSchema);
};

export default setupCollection;
