import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

const {
  _id,
  date,
  basicString,
  basicNumber,
} = CommonSchemaFields;

const SongSchema = {
  bsonType: 'object',
  required: [
    'name',
    'lang',
  ],
  additionalProperties: false,
  properties: {
    _id,
    name: basicString,
    lang: basicString,
    index: basicNumber,
    tags: {
      bsonType: 'array',
      items: {
        bsonType: 'string',
      },
    },
    lastUsingDate: date,
    updatedAt: date,
    createdAt: date,
  },
};

export default SongSchema;
