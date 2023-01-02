import CommonSchemaFields from '#modules/validation/CommonSchemaFields';

import UserSchemaFields from './UserSchemaFields';

const {
  encryptedPassword,
  email,
  language,
  roles,
  status,
} = UserSchemaFields;

const {
  _id,
  basicBoolean,
  date,
  requiredString,
  nonNegativeNumber,
} = CommonSchemaFields;

const UserSchema = {
  bsonType: 'object',
  required: [
    'email',
    'services',
    'settings',
    'updatedAt',
    'createdAt',
  ],
  additionalProperties: false,
  properties: {
    _id,
    email: {
      bsonType: 'object',
      required: ['address'],
      additionalProperties: false,
      properties: {
        address: email,
        verified: basicBoolean,
      },
    },
    services: {
      bsonType: 'object',
      required: ['password', 'email'],
      additionalProperties: false,
      properties: {
        password: {
          bsonType: 'object',
          required: ['bcrypt'],
          additionalProperties: false,
          properties: {
            bcrypt: encryptedPassword,
            resetPasswordToken: requiredString,
            lastResetRequest: date,
          },
        },
        email: {
          bsonType: 'object',
          additionalProperties: false,
          properties: {
            verificationTokens: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                properties: {
                  token: requiredString,
                  createdAt: date,
                },
              },
            },
            lastVerificationSent: date,
          },
        },
        security: {
          bsonType: 'object',
          additionalProperties: false,
          properties: {
            loginAttempts: nonNegativeNumber,
            lastLoginAttempt: date,
          },
        },
      },
    },
    status,
    roles,
    settings: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['language'],
      properties: {
        language,
      },
    },
    updatedAt: date,
    createdAt: date,
  },
};

export default UserSchema;
