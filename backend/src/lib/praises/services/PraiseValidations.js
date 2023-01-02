import PraiseSchema from '#lib/praises/schema/PraiseSchema';
import CommonSchemaFields from '#modules/validation/CommonSchemaFields.js';

const PraiseValidations = {
  async validateUpdate(ctx) {
    const { praise } = ctx.request.body;

    praise.songs.forEach(song => {
      song._id = ctx.libS.praises.helpers.getObjectId(song._id);
      song.lastUsingDate = new Date(song.lastUsingDate);
      song.updatedAt = new Date(song.updatedAt);
      song.createdAt = new Date(song.createdAt);
    });
    praise.date = new Date(praise.date);
    praise.confirmed = false;

    ctx.state.praise = praise;

    return ctx.modS.validations.validateSchema(ctx, praise, PraiseSchema);
  },

  async validateGetByDate(ctx) {
    const { date } = ctx.request.body;

    ctx.state.date = new Date(date);

    const { createValidateError, CustomErrors } = ctx.modS.responses;
    createValidateError(
      ctx.state.date,
      ctx,
      CustomErrors.BAD_REQUEST,
    );

    return true;
  },
  async validateExistingById(ctx) {
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
    ctx.state.praise = await ctx.libS.praises.getById(_id);

    ctx.modS.responses.createValidateError(ctx.state.praise, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return valid;
  },
};

export default PraiseValidations;
