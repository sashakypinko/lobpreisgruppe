import ServicesBase from '#lib/base/services/ServicesBase';

import PraiseHelpers from './PraiseHelpers.js';

class PraiseServices extends ServicesBase {
  helpers = {
    ...super.getHelpers(),
    ...PraiseHelpers,
  };

  async createOrUpdatePraise(ctx, praise) {
    return await ctx.libS.praises.createOrUpdate(
      { date: praise.date },
      praise
    );
  }

  publicParams = {};
}

export default PraiseServices;
