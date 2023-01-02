import CommonSchemaFields from '#modules/validation/CommonSchemaFields';
import SongSchema from '#lib/songs/schema/SongSchema.js';

const {
  _id,
  date,
  basicBoolean,
} = CommonSchemaFields;

const PraiseSchema = {
  bsonType: 'object',
  required: [
    'date',
    'songs',
  ],
  additionalProperties: false,
  properties: {
    _id,
    date: date,
    songs: {
      bsonType: 'array',
      items: SongSchema,
    },
    confirmed: basicBoolean,
    updatedAt: date,
    createdAt: date,
  },
};

export default PraiseSchema;
