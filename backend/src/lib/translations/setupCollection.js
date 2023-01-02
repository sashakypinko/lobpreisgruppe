import TranslationSchema from './schema/TranslationSchema';
import TranslationEnums from './enums/TranslationEnums';

const setupCollection = async (mongoDb, createCollection) => {
  await createCollection(mongoDb, TranslationEnums.COLLECTION_NAME, TranslationSchema);
  const collection = mongoDb.collection(TranslationEnums.COLLECTION_NAME);
  await collection.createIndex({
    language: 1,
  }, { unique: true });
};

export default setupCollection;
