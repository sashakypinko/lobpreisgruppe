import SongSchema from './schema/SongSchema.js';
import SongEnums from './enums/SongEnums.js';

const setupCollection = async (mongoDb, createCollection) => {
  await createCollection(mongoDb, SongEnums.COLLECTION_NAME, SongSchema);
};

export default setupCollection;
