import { ConfigModuleOptions } from "@nestjs/config";
import Joi from "joi";

export const JoiConfig : ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
    PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required()
  })
}