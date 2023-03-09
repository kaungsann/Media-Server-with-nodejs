const joi = require("joi");

module.exports = {
  registerSchema: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().min(6).max(12).required(),
    password: joi.string().min(6).max(24),
  }),
  loginSchema: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(24),
  }),
  idSchema: joi.object({
    id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  nameSchema: joi.object({
    name: joi.string().required(),
  }),
  addRoleSchema: joi.object({
    userId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    roleId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  addPermitSchema: joi.object({
    userId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    permitId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  PostSchema: joi.object({
    category: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    tag: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    text: joi.string().required(),
    image: joi.optional(),
    user: joi.optional(),
  }),
  pageSchema: joi.object({
    page: joi.number().required(),
  }),
};
