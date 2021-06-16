import * as Joi from '@hapi/joi';

export const configValidatorDb = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_TYPE: Joi.string().required(),
  DB_PORT: Joi.number().required(),
});
