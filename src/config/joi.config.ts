import * as Joi from "joi";

export const validationSchema = Joi.object({
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
    PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
    JWT_PRV: Joi.string().required(),
    JWT_PUB: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.string().required(),
    UPLOAD_LOCATION: Joi.string().required(),
    MAX_FILE_SIZE: Joi.string().required(),
  });
