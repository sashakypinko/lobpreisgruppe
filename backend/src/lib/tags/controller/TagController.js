const TagController = {
  async getAll(ctx) {
    const tags = await ctx.libS.tags.getAll();
    return ctx.modS.responses.createSuccessResponse(ctx, {
      tags,
    });
  },

  async getById(ctx) {
    return ctx.modS.responses.createSuccessResponse(ctx, {
      tag: ctx.state.tag,
    });
  },

  async create(ctx) {
    const { tag } = ctx.state;
    await ctx.libS.tags.add(tag);
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async update(ctx) {
    const { _id, tag } = ctx.state;
    await ctx.libS.tags.update({ _id, ...tag });
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async remove(ctx) {
    const { _id } = ctx.state;
    await ctx.libS.tags.removeById(_id);
    return ctx.modS.responses.createSuccessResponse(ctx);
  },
};

export default TagController;
