const TranslationController = {
  async getAll(ctx) {
    const translations = await ctx.libS.translations.getAll();
    return ctx.modS.responses.createSuccessResponse(ctx, {
      translations,
    });
  },

  async getList(ctx) {
    const translations = await ctx.libS.translations.getAll({ projection: { data: 0 } });
    return ctx.modS.responses.createSuccessResponse(ctx, {
      translations,
    });
  },

  async getById(ctx) {
    return ctx.modS.responses.createSuccessResponse(ctx, {
      translation: ctx.state.translation,
    });
  },

  async getByLanguage(ctx) {
    return ctx.modS.responses.createSuccessResponse(ctx, {
      translation: ctx.state.translation,
    });
  },

  async create(ctx) {
    const { translation } = ctx.state;
    await ctx.libS.translations.add(translation);
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async update(ctx) {
    const { _id, translation } = ctx.state;
    await ctx.libS.translations.update({ _id, ...translation });
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async remove(ctx) {
    const { _id } = ctx.state;
    await ctx.libS.translations.removeById(_id);
    return ctx.modS.responses.createSuccessResponse(ctx);
  },
};

export default TranslationController;
