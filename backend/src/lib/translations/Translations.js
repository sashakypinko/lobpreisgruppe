import TranslationRoutes from './controller/TranslationRoutes';
import TranslationEnums from './enums/TranslationEnums';
import setupCollection from './setupCollection';
import TranslationSchema from './schema/TranslationSchema';
import setupServices from './setupServices';

const Translations = {
  collectionName: TranslationEnums.COLLECTION_NAME,
  setupCollection,
  schema: TranslationSchema,
  setupServices,
  routes: TranslationRoutes,
};

export default Translations;
