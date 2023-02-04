export default {
  local: {
    MONGO_URL: 'mongodb+srv://alixander:62596572@cluster0.ezckx.mongodb.net/?retryWrites=true&w=majority',
    dbName: 'lobpreisgruppe',
    // dbName: 'lobpreisgruppe_production',
    apiPrefix: '/api',
    apiVersion: 'v1',
    frontendUrl: 'http://http://18.219.222.33:4000',
    debug: true,
    encrypting: {
      pepper: 's01lwHzfr3',
    },
  },
};
