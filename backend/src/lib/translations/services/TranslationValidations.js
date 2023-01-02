import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

import TranslationSchema from '../schema/TranslationSchema';

const TranslationValidations = {
  async validateUpdate(ctx) {
    const { translation } = ctx.request.body;
    const {
      createdAt, updatedAt, _id, ...restOfTranslation
    } = translation;

    ctx.state.translation = restOfTranslation;
    ctx.state._id = _id;

    const existingTranslation = await ctx.libS.translations.getById(_id, { projection: { _id: 1 } });

    ctx.modS.responses.createValidateError(existingTranslation, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return ctx.modS.validations.validateSchema(ctx, ctx.state.translation, TranslationSchema);
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
    const existingTranslation = await ctx.libS.translations.getById(_id, { projection: { _id: 1 } });

    ctx.modS.responses.createValidateError(existingTranslation, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

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

    ctx.state.translation = await ctx.libS.translations.getById(_id);

    ctx.modS.responses.createValidateError(ctx.state.translation, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return valid;
  },

  async validateGetByLanguage(ctx) {
    const { language } = ctx.request.body;

    const valid = ctx.modS.validations.validateSchema(ctx, { language }, {
      bsonType: 'object',
      required: ['language'],
      additionalProperties: false,
      properties: {
        language: CommonSchemaFields.language,
      },
    });

    ctx.state.translation = await ctx.libS.translations.findOne({ language });

    ctx.modS.responses.createValidateError(ctx.state.translation, ctx, ctx.modS.responses.CustomErrors.NOT_FOUND);

    return valid;
  },

  async validateCreate(ctx) {
    const { translation: rawData } = ctx.request.body;

    const { _id, ...translation } = rawData;
    ctx.state.translation = translation;

    return ctx.modS.validations.validateSchema(ctx, translation, TranslationSchema);
  },
};

export default TranslationValidations;
