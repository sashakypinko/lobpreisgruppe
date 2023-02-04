import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

import SongSchema from '../schema/SongSchema.js';

const SongValidations = {
  async validateGetByQuery(ctx) {
    const { filters } = ctx.request.body;

    ctx.state.filters = filters;

    return ctx.modS.validations.validateSchema(ctx, filters, {
      bsonType: 'object',
      properties: {
        search: CommonSchemaFields.basicString,
        tags: CommonSchemaFields.basicArray,
      },
    });
  },
  async validateUpdate(ctx) {
    const { song } = ctx.request.body;
    const {
      createdAt,
      updatedAt,
      lastUsingDate,
      _id,
      ...restOfSong
    } = song;

    ctx.state.song = restOfSong;
    ctx.state._id = _id;

    const existingSong = await ctx.libS.songs.getById(_id, { projection: { _id: 1 } });

    ctx.modS.responses.createValidateError(existingSong, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return ctx.modS.validations.validateSchema(ctx, ctx.state.song, SongSchema);
  },

  async validateRemove(ctx) {
    const { _id } = ctx.request.body;

    const valid = ctx.modS.validations.validateSchema(ctx, { _id }, {
      bsonType: 'object',
      required: ['_id'],
      additionalProperties: false,
      properties: {
        _id: CommonSchemaFields._idString,
      },
    });

    ctx.state._id = _id;
    const existingSong = await ctx.libS.songs.getById(_id, { projection: { _id: 1 } });

    ctx.modS.responses.createValidateError(existingSong, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return valid;
  },

  async validateGetById(ctx) {
    const { _id } = ctx.request.body;

    const valid = ctx.modS.validations.validateSchema(ctx, { _id }, {
      bsonType: 'object',
      required: ['_id'],
      additionalProperties: false,
      properties: {
        _id: CommonSchemaFields._idString,
      },
    });

    ctx.state.song = await ctx.libS.songs.getById(_id);

    ctx.modS.responses.createValidateError(ctx.state.song, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return valid;
  },

  async validateCreate(ctx) {
    const { songs } = ctx.request.body;

    ctx.state.songs = songs;

    return true;
  },

  async validateUpdateRating(ctx) {
    const {
      _id,
      rating
    } = ctx.request.body;

    const existingSong = await ctx.libS.songs.getById(_id);

    ctx.modS.responses.createValidateError(existingSong, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    if (!existingSong.ratings) {
      existingSong.ratings = [];
    }
    existingSong.lastUsingDate = new Date(existingSong.lastUsingDate);
    ctx.state.song = existingSong;
    ctx.state.rating = rating;
    ctx.state._id = _id;

    return true;
  },
};

export default SongValidations;
