import TagRoutes from './controller/TagRoutes.js';
import TagEnums from './enums/TagEnums.js';
import setupCollection from './setupCollection';
import TagSchema from './schema/TagSchema.js';
import setupServices from './setupServices';

const Tags = {
  collectionName: TagEnums.COLLECTION_NAME,
  setupCollection,
  schema: TagSchema,
  setupServices,
  routes: TagRoutes,
};

export default Tags;
