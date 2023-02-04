export default {
  local: {
    MONGO_URL: 'mongodb://localhost:27017',
    dbName: 'lobpreisgruppe',
    // dbName: 'lobpreisgruppe_production',
    apiPrefix: '/api',
    apiVersion: 'v1',
    frontendUrl: 'http://localhost:4000',
    debug: true,
    encrypting: {
      pepper: 's01lwHzfr3',
    },
  },
};
