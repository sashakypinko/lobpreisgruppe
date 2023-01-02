import PraiseRoutes from './controller/PraiseRoutes.js';
import PraiseEnums from './enums/PraiseEnums.js';
import setupCollection from './setupCollection';
import PraiseSchema from './schema/PraiseSchema.js';
import setupServices from './setupServices';

const Praises = {
  collectionName: PraiseEnums.COLLECTION_NAME,
  setupCollection,
  schema: PraiseSchema,
  setupServices,
  routes: PraiseRoutes,
};

export default Praises;
