import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

const {
  _id,
  date,
  language,
  basicString,
} = CommonSchemaFields;

const TranslationSchema = {
  bsonType: 'object',
  required: [
    'language',
    'data',
  ],
  additionalProperties: false,
  properties: {
    _id,
    language,
    data: basicString,
    updatedAt: date,
    createdAt: date,
  },
};

export default TranslationSchema;
