const SongController = {
  async getByQuery(ctx) {
    const {
      search = '',
      tags = [],
      languages = [],
      sort,
    } = ctx.state.filters;
    const params = { sort: { name: 1 } };
    const query = {
      name: new RegExp(`.*${search}.*`, 'i'),
    };
    if (tags.length) {
      query.tags = { $in: tags };
    }
    if (languages.length) {
      query.lang = { $in: languages };
    }
    if (sort) {
      params.sort = { [sort.name]: sort.value };
    }
    return ctx.modS.responses.createSuccessResponse(ctx, {
      songs: await ctx.libS.songs.find(query, params),
    });
  },

  async getById(ctx) {
    return ctx.modS.responses.createSuccessResponse(ctx, {
      song: ctx.state.song,
    });
  },

  async create(ctx) {
    const { songs } = ctx.state;
    songs.forEach(song => {
      (async () => {
        await ctx.libS.songs.add({ ...song, ratings: [] });
        await ctx.libS.tags.update(ctx, song.tags);
      })();
    });

    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async update(ctx) {
    const {
      _id,
      song
    } = ctx.state;
    await ctx.libS.songs.update({ _id, ...song });
    await ctx.libS.tags.update(ctx, song.tags);
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async remove(ctx) {
    const { _id } = ctx.state;
    await ctx.libS.songs.removeById(_id);
    return ctx.modS.responses.createSuccessResponse(ctx);
  },

  async updateRating(ctx) {
    const { _id, song, rating } = ctx.state;
    const { user } = ctx.privateState;
    const ratingIdx = song.ratings.findIndex(({userId}) => userId.toString() === user._id.toString());

    console.log(ratingIdx)

    if (ratingIdx === -1) {
      song.ratings.push({
        userId: user._id,
        rating,
      });
    } else {
      song.ratings = [
        ...song.ratings.slice(0, ratingIdx),
        {
          ...song.ratings[ratingIdx],
          rating,
        },
        ...song.ratings.slice(ratingIdx + 1),
      ];
    }

    await ctx.libS.songs.update({ _id, ...song });
    return ctx.modS.responses.createSuccessResponse(ctx);
  },
};

export default SongController;
