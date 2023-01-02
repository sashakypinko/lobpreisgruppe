import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

const {
  _id,
  date,
  basicString,
} = CommonSchemaFields;

const TagSchema = {
  bsonType: 'object',
  required: [
    'name',
  ],
  additionalProperties: false,
  properties: {
    _id,
    name: basicString,
    updatedAt: date,
    createdAt: date,
  },
};

export default TagSchema;
