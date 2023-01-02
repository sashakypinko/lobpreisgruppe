import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

import TagSchema from '../schema/TagSchema.js';

const TagValidations = {
  async validateUpdate(ctx) {
    const { tag } = ctx.request.body;
    const {
      createdAt, updatedAt, _id, ...restOfTag
    } = tag;

    ctx.state.tag = restOfTag;
    ctx.state._id = _id;

    const existingTag = await ctx.libS.tags.getById(_id, { projection: { _id: 1 } });

    ctx.modS.responses.createValidateError(existingTag, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return ctx.modS.validations.validateSchema(ctx, ctx.state.tag, TagSchema);
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
    const existingTag = await ctx.libS.tags.getById(_id, { projection: { _id: 1 } });

    ctx.modS.responses.createValidateError(existingTag, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

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

    ctx.state.tag = await ctx.libS.tags.getById(_id);

    ctx.modS.responses.createValidateError(ctx.state.tag, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return valid;
  },

  async validateCreate(ctx) {
    const { tag: rawData } = ctx.request.body;

    const { _id, ...tag } = rawData;
    ctx.state.tag = tag;

    return ctx.modS.validations.validateSchema(ctx, tag, TagSchema);
  },
};

export default TagValidations;
