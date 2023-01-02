const PraiseController = {
  async getByQuery(ctx) {
    const {
      confirmed = false,
    } = ctx.state.filters || {};
    const query = {
      confirmed,
    };

    return ctx.modS.responses.createSuccessResponse(ctx, {
      praises: await ctx.libS.praises.find(query, {
        sort: { date: 1 },
      }),
    });
  },

  async getByDate(ctx) {
    const { date } = ctx.state;

    const praise = await ctx.libS.praises.findOne({ date });

    return ctx.modS.responses.createSuccessResponse(ctx, {
      praise
    });
  },

  async update(ctx) {
    const { praise } = ctx.state;

    await ctx.libS.praises.createOrUpdatePraise(ctx, praise);

    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async remove(ctx) {
    const { _id } = ctx.state;
    await ctx.libS.praises.removeById(_id);
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async confirm(ctx) {
    const { praise } = ctx.state;
    await ctx.libS.praises.update({
      ...praise,
      confirmed: true,
    });

    for (const praiseSong of praise.songs) {
      const song = await ctx.libS.songs.getById(
        ctx.libS.songs.helpers.getObjectId(praiseSong._id)
      );
      console.log(praiseSong);
      if (song) {
        await ctx.libS.songs.update({
          ...song,
          lastUsingDate: praise.date,
        });
      }
    }
    return ctx.modS.responses.createSuccessResponse(ctx);
  },
};

export default PraiseController;
