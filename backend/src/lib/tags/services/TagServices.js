import ServicesBase from '#lib/base/services/ServicesBase';

import TagHelpers from './TagHelpers.js';

class TagServices extends ServicesBase {
  helpers = {
    ...super.getHelpers(),
    ...TagHelpers,
  };

  async update(ctx, tags) {
    tags.forEach(tag => {
      (async () => {
        const existingTag = await ctx.libS.tags.findOne({ name: tag, });

        if (!existingTag) {
          await ctx.libS.tags.add({ name: tag });
        }
      })();
    });
  }

  publicParams = {};
}

export default TagServices;
