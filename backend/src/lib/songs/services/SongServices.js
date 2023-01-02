import ServicesBase from '#lib/base/services/ServicesBase';

import SongHelpers from './SongHelpers.js';

class SongServices extends ServicesBase {
  helpers = {
    ...super.getHelpers(),
    ...SongHelpers,
  };

  publicParams = {
    projection: {
      _id: 1,
      name: 1,
      lang: 1,
      tags: 1,
      lastUsingDate: 1,
    },
  };
}

export default SongServices;
